const API = 'https://gitlab.com/api/v4/projects/85036487/repository';
const PAGE_SIZE = 8;
const KIND_LABELS = { preset: 'Packages', addon: 'Addons', tool: 'Tools', config: 'Config' };
const PRESETS = ['Core', 'CoreGo', 'Basic', 'Omni', 'Stock', 'Full', 'Go'];

export function metadataUrl(path, commit) {
    if (!/^[a-f0-9]{40}$/.test(commit) || !path.startsWith('releases/') || !path.endsWith('.json') || path.split('/').includes('..') || path.includes('\\')) {
        throw new Error('Invalid release metadata reference');
    }
    return `${API}/files/${encodeURIComponent(path)}/raw?ref=${commit}`;
}

async function readJson(url, fetcher, signal) {
    const response = await fetcher(url, { cache: 'no-store', signal });
    if (!response.ok) throw new Error('Release metadata is unavailable');
    return response.json();
}

export async function loadSnapshot(fetcher = fetch, signal) {
    const branch = await readJson(`${API}/branches/main`, fetcher, signal);
    const commit = branch.commit?.id;
    const index = await readJson(metadataUrl('releases/index.json', commit), fetcher, signal);
    if (!Array.isArray(index.releases) || !index.latest) throw new Error('Invalid release index');
    return { commit, index };
}

function sourceforgeUrl(value, download = true) {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== 'sourceforge.net' || url.username || url.password || url.port || url.search || url.hash ||
        !url.pathname.startsWith('/projects/nikgapps/files/') || (download && !url.pathname.endsWith('/download'))) {
        throw new Error('Invalid published download URL');
    }
    return url.href;
}

export function publishedRelease(manifest, summary) {
    if (manifest.id !== summary.id || String(manifest.androidVersion) !== String(summary.androidVersion) ||
        manifest.channel !== 'stable' || manifest.architecture !== 'arm64-v8a') throw new Error('Release identity mismatch');
    const publication = manifest.sourceforge;
    if (!publication || publication.status !== 'published') return null;
    if (publication.registryReleaseId !== manifest.id || !Array.isArray(publication.files) || !publication.files.length ||
        !/^\d{4}-\d{2}-\d{2}$/.test(publication.releaseDate)) throw new Error('Invalid download publication');
    const seen = new Set();
    const files = publication.files.map(file => {
        const downloadUrl = sourceforgeUrl(file.downloadUrl);
        if (!KIND_LABELS[file.kind] || typeof file.fileName !== 'string' || !file.fileName ||
            !/^[a-f0-9]{64}$/.test(file.sha256) || !Number.isSafeInteger(file.size) || file.size < 0 || seen.has(downloadUrl)) {
            throw new Error('Invalid published file');
        }
        seen.add(downloadUrl);
        return { ...file, downloadUrl };
    });
    return { id: manifest.id, android: String(manifest.androidVersion), config: String(manifest.configVersion),
        date: publication.releaseDate, folder: sourceforgeUrl(publication.releaseFolderUrl, false), files };
}

export function candidates(index, android) {
    const seen = new Set();
    return index.releases.filter(row => {
        if (String(row.androidVersion) !== String(android) || row.channel !== 'stable' || row.architecture !== 'arm64-v8a' || seen.has(row.id)) return false;
        seen.add(row.id);
        return true;
    }).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function loadPublished(snapshot, summaries, fetcher = fetch, signal) {
    const settled = await Promise.allSettled(summaries.map(async summary => {
        const manifest = await readJson(metadataUrl(summary.manifest, snapshot.commit), fetcher, signal);
        return publishedRelease(manifest, summary);
    }));
    if (settled.length && settled.every(value => value.status === 'rejected')) throw new Error('Release metadata is unavailable');
    const values = settled.filter(value => value.status === 'fulfilled').map(value => value.value);
    // Same-day publications reuse filenames; only show the newest record per folder.
    const folders = new Set();
    return values.filter(value => {
        if (!value || folders.has(value.folder)) return false;
        folders.add(value.folder);
        return true;
    });
}

export function fileLabel(file) {
    if (file.kind === 'config') return 'nikgapps.config';
    if (file.kind === 'preset') {
        const key = /^NikGapps-([^-]+)-/.exec(file.fileName)?.[1]?.toLowerCase();
        return PRESETS.find(value => value.toLowerCase() === key) || file.fileName;
    }
    if (file.kind === 'tool') return /^debloater/i.test(file.fileName) ? 'Debloater' : 'Remove OTA scripts';
    const title = file.fileName.replace(/^NikGapps-Addon-[^-]+-/, '').replace(/-\d{8}(?:-signed)?\.zip$/, '');
    return ({ YouTube: 'YouTube', YouTubeMusic: 'YouTube Music', GBoard: 'Gboard', GmsCore: 'Google Play services' })[title] || title.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

export function filteredFiles(files, kind, search = '') {
    const term = search.trim().toLowerCase();
    return files.filter(file => (kind === 'other' ? ['tool', 'config'].includes(file.kind) : file.kind === kind) &&
        `${fileLabel(file)} ${file.fileName}`.toLowerCase().includes(term))
        .sort((a, b) => kind === 'preset' ? PRESETS.indexOf(fileLabel(a)) - PRESETS.indexOf(fileLabel(b)) : fileLabel(a).localeCompare(fileLabel(b)));
}

export function formatSize(bytes) {
    if (bytes < 1000) return `${bytes} B`;
    const unit = bytes >= 1e9 ? 'GB' : bytes >= 1e6 ? 'MB' : 'KB';
    const divisor = { GB: 1e9, MB: 1e6, KB: 1e3 }[unit];
    return `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(bytes / divisor)} ${unit}`;
}

function displayDate(value) {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
}

export function mountDownloads(root) {
    const android = root.querySelector('[data-android]');
    const release = root.querySelector('[data-release]');
    const status = root.querySelector('[data-status]');
    const grid = root.querySelector('[data-files]');
    const search = root.querySelector('[data-search]');
    const more = root.querySelector('[data-older]');
    const meta = root.querySelector('[data-release-meta]');
    let snapshot, remaining = [], releases = [], kind = 'preset', controller, generation = 0, refreshedAt = 0;
    const element = (tag, text, cls) => {
        const node = document.createElement(tag);
        if (text !== undefined) node.textContent = text;
        if (cls) node.className = cls;
        return node;
    };
    const announce = text => { status.textContent = text; };
    function renderFiles() {
        const selected = releases.find(row => row.id === release.value);
        grid.replaceChildren();
        if (!selected) return;
        meta.textContent = `${displayDate(selected.date)} · Android ${selected.android} · arm64 · Config v${selected.config}`;
        const files = filteredFiles(selected.files, kind, search.value);
        files.forEach(file => {
            const card = element('article', undefined, 'release-downloads__card');
            card.append(element('h3', fileLabel(file)), element('p', `${formatSize(file.size)}${file.packageCount ? ` · ${file.packageCount} packages` : ''}`, 'release-downloads__size'));
            const link = element('a', 'Download', 'release-downloads__download');
            link.href = file.downloadUrl;
            link.setAttribute('aria-label', `Download ${fileLabel(file)}`);
            card.append(link);
            const checksum = element('details');
            checksum.append(element('summary', 'SHA-256'), element('code', file.sha256));
            card.append(checksum);
            if (Array.isArray(file.packages) && file.packages.length) {
                const contents = element('details');
                contents.append(element('summary', 'Included apps'));
                const list = element('ul');
                file.packages.forEach(name => list.append(element('li', name.split('/').pop().replace(/([a-z0-9])([A-Z])/g, '$1 $2'))));
                contents.append(list);
                card.append(contents);
            }
            grid.append(card);
        });
        announce(files.length ? `${files.length} ${kind === 'preset' ? 'packages' : kind === 'addon' ? 'addons' : 'tools and config files'} available.` : 'No downloads match your search.');
    }
    async function loadPage(sequence) {
        const page = remaining.splice(0, PAGE_SIZE);
        const values = await loadPublished(snapshot, page, fetch, controller.signal);
        if (sequence !== generation) return;
        const existing = new Set(releases.map(row => row.folder));
        releases.push(...values.filter(row => !existing.has(row.folder)));
        if (!releases.length && remaining.length) return loadPage(sequence);
        const selected = release.value;
        release.replaceChildren(...releases.map(row => {
            const option = element('option', displayDate(row.date)); option.value = row.id; return option;
        }));
        if (releases.some(row => row.id === selected)) release.value = selected;
        release.disabled = !releases.length;
        more.hidden = !remaining.length;
        if (releases.length) renderFiles();
        else announce('Direct downloads are not available for this Android version yet. You can browse all builds on SourceForge below.');
    }
    async function loadAndroid() {
        const sequence = ++generation;
        controller?.abort(); const activeController = controller = new AbortController();
        const timer = setTimeout(() => activeController.abort(), 30000);
        root.setAttribute('aria-busy', 'true'); grid.replaceChildren(); meta.textContent = '';
        release.replaceChildren(); release.disabled = true; more.hidden = true; releases = [];
        announce('Loading release downloads…');
        try { remaining = candidates(snapshot.index, android.value); await loadPage(sequence); }
        catch (error) { if (sequence === generation) announce('Download information is temporarily unavailable. Refresh to try again, or browse SourceForge below.'); }
        finally { clearTimeout(timer); if (sequence === generation) root.setAttribute('aria-busy', 'false'); }
    }
    async function refresh() {
        const sequence = ++generation;
        controller?.abort(); const activeController = controller = new AbortController();
        const timer = setTimeout(() => activeController.abort(), 30000);
        const selectedAndroid = android.value;
        android.disabled = true;
        root.setAttribute('aria-busy', 'true'); grid.replaceChildren(); meta.textContent = '';
        release.replaceChildren(); release.disabled = true; more.hidden = true; more.disabled = false; releases = []; announce('Loading releases…');
        try {
            snapshot = await loadSnapshot(fetch, controller.signal);
            if (sequence !== generation) return;
            const versions = Object.keys(snapshot.index.latest).filter(value => snapshot.index.latest[value]?.stable?.['arm64-v8a']).sort((a, b) => Number(b) - Number(a));
            android.replaceChildren(...versions.map(value => { const option = element('option', `Android ${value}`); option.value = value; return option; }));
            android.disabled = !versions.length;
            if (versions.includes(selectedAndroid)) android.value = selectedAndroid;
            refreshedAt = Date.now();
            await loadAndroid();
        } catch (error) { if (sequence === generation) { android.disabled = true; announce('Download information is temporarily unavailable. Refresh to try again, or browse SourceForge below.'); } }
        finally { clearTimeout(timer); if (sequence === generation) root.setAttribute('aria-busy', 'false'); }
    }
    android.addEventListener('change', loadAndroid);
    release.addEventListener('change', renderFiles);
    search.addEventListener('input', renderFiles);
    root.querySelector('[data-refresh]').addEventListener('click', refresh);
    root.querySelectorAll('[data-kind]').forEach(button => button.addEventListener('click', () => {
        kind = button.dataset.kind;
        root.querySelectorAll('[data-kind]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        renderFiles();
    }));
    more.addEventListener('click', async () => {
        const sequence = generation;
        more.disabled = true;
        try { await loadPage(sequence); } catch { if (sequence === generation) announce('Older downloads could not be loaded. Try refreshing.'); }
        finally { if (sequence === generation) more.disabled = false; }
    });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - refreshedAt > 60000) refresh(); });
    window.addEventListener('pageshow', event => { if (event.persisted) refresh(); });
    refresh();
}

if (typeof document !== 'undefined') {
    const root = document.querySelector('[data-release-downloads]');
    if (root) mountDownloads(root);
}
