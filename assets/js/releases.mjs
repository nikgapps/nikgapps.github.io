const GITLAB = 'https://gitlab.com/api/v4/projects/85036487/repository';
const GITHUB_REPOSITORY = 'nikgapps/nikgapps-packages';
const PAGE_SIZE = 8;
const KIND_LABELS = { preset: 'Packages', addon: 'Addons', tool: 'Tools', config: 'Config' };
const PRESETS = ['Core', 'CoreGo', 'Basic', 'Omni', 'Stock', 'Full', 'Go'];

export function metadataUrl(path, commit, source = 'gitlab') {
    if (!/^[a-f0-9]{40}$/.test(commit) || !path.startsWith('releases/') || !path.endsWith('.json') || path.split('/').includes('..') || path.includes('\\')) {
        throw new Error('Invalid release metadata reference');
    }
    if (source === 'github') {
        const encodedPath = path.split('/').map(encodeURIComponent).join('/');
        return `https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${commit}/${encodedPath}`;
    }
    return `${GITLAB}/files/${encodeURIComponent(path)}/raw?ref=${commit}`;
}

async function readJson(url, fetcher, signal) {
    const response = await fetcher(url, { cache: 'no-store', signal });
    if (!response.ok) throw new Error('Release metadata is unavailable');
    return response.json();
}

async function loadSourceSnapshot(source, fetcher, signal) {
    const branchUrl = source === 'github'
        ? `https://api.github.com/repos/${GITHUB_REPOSITORY}/git/ref/heads/main`
        : `${GITLAB}/branches/main`;
    const branch = await readJson(branchUrl, fetcher, signal);
    const commit = source === 'github' ? branch.object?.sha : branch.commit?.id;
    const index = await readJson(metadataUrl('releases/index.json', commit, source), fetcher, signal);
    if (!Array.isArray(index.releases) || !index.latest) throw new Error('Invalid release index');
    return { commit, index, source };
}

export async function loadSnapshot(fetcher = fetch, signal) {
    try {
        return await loadSourceSnapshot('gitlab', fetcher, signal);
    } catch (error) {
        if (signal?.aborted) throw error;
        return loadSourceSnapshot('github', fetcher, signal);
    }
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
        const manifest = await readJson(metadataUrl(summary.manifest, snapshot.commit, snapshot.source), fetcher, signal);
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

export function changelogMatches(entry, release) {
    if (entry.date !== release.date) return false;
    const [first, last = first] = entry.androidVersion.split('-');
    return /^\d+(?:\.\d+)?$/.test(first) && /^\d+(?:\.\d+)?$/.test(last)
        && Number(release.android) >= Number(first) && Number(release.android) <= Number(last);
}

export function mountDownloads(root) {
    const android = root.querySelector('[data-android]');
    const release = root.querySelector('[data-release]');
    const status = root.querySelector('[data-status]');
    const grid = root.querySelector('[data-files]');
    const search = root.querySelector('[data-search]');
    const more = root.querySelector('[data-older]');
    const meta = root.querySelector('[data-release-meta]');
    const moreFiles = root.querySelector('[data-more-files]');
    const changelog = root.querySelector('[data-changelog]');
    const notes = [...changelog.querySelectorAll('[data-changelog-entry]')];
    const currentNote = changelog.querySelector('[data-current-changelog]');
    const defaultNote = currentNote.cloneNode(true);
    const featuredOpen = root.querySelector('[data-featured-open]');
    const featuredChoices = [...root.querySelectorAll('[data-featured-preset]')];
    const filters = [...root.querySelectorAll('[data-kind]')];
    const summaries = { Core: 'Play Store essentials', Stock: 'A broader set of Google apps', Full: 'The largest standard preset' };
    let snapshot, featured, newestAndroid, remaining = [], releases = [], kind = 'preset', controller, generation = 0, refreshedAt = 0;
    let shown = PAGE_SIZE, openedFile, featuredPreset = 'Core';
    const element = (tag, text, cls) => {
        const node = document.createElement(tag);
        if (text !== undefined) node.textContent = text;
        if (cls) node.className = cls;
        return node;
    };
    const announce = text => { status.textContent = text; };
    function renderChangelog(selected) {
        const match = selected && notes.find(note => changelogMatches(note.dataset, selected));
        if (match) currentNote.replaceChildren(...[...match.children].map(node => node.cloneNode(true)));
        else if (selected) currentNote.replaceChildren(element('p', 'No changelog has been published for this release.'));
        else currentNote.replaceChildren(...[...defaultNote.children].map(node => node.cloneNode(true)));
        notes.forEach((note, index) => {
            note.hidden = selected
                ? note === match || (/^\d{4}-\d{2}-\d{2}$/.test(note.dataset.date) && note.dataset.date > selected.date)
                : index === 0;
        });
    }
    function renderFeatured() {
        if (!featured) return;
        root.querySelector('[data-featured-android]').textContent = `Android ${featured.android}`;
        root.querySelector('[data-featured-meta]').textContent = `${displayDate(featured.date)} · arm64 · Config v${featured.config}`;
        const presets = new Map(filteredFiles(featured.files, 'preset').map(file => [fileLabel(file), file]));
        const available = featuredChoices.filter(button => presets.has(button.dataset.featuredPreset));
        if (!presets.has(featuredPreset)) featuredPreset = available[0]?.dataset.featuredPreset;
        featuredChoices.forEach(button => {
            button.hidden = !presets.has(button.dataset.featuredPreset);
            button.setAttribute('aria-pressed', String(button.dataset.featuredPreset === featuredPreset));
        });
        const selected = presets.get(featuredPreset);
        root.querySelector('[data-featured-choices]').hidden = !selected;
        root.querySelector('[data-featured-detail]').hidden = !selected;
        featuredOpen.hidden = !selected;
        if (selected) {
            root.querySelector('[data-featured-size]').textContent = formatSize(selected.size);
            root.querySelector('[data-featured-copy]').textContent = summaries[featuredPreset];
            featuredOpen.querySelector('span').textContent = `View ${featuredPreset} details`;
        }
    }
    function renderFiles() {
        const selected = releases.find(row => row.id === release.value);
        const showingChanges = kind === 'changes';
        changelog.hidden = !showingChanges;
        root.querySelector('[data-file-view]').hidden = showingChanges;
        root.querySelector('[data-search-control]').hidden = showingChanges;
        status.hidden = showingChanges;
        grid.replaceChildren();
        if (showingChanges) renderChangelog(selected);
        if (!selected) return;
        meta.textContent = `${displayDate(selected.date)} · Android ${selected.android} · arm64 · Config v${selected.config}`;
        if (showingChanges) return;
        const files = filteredFiles(selected.files, kind, search.value);
        files.slice(0, shown).forEach(file => {
            const card = element('article', undefined, 'release-downloads__file');
            const row = element('div', undefined, 'release-downloads__row');
            const name = element('div');
            const size = file.packageCount ? `${formatSize(file.size)} · ${file.packageCount} ${file.packageCount === 1 ? 'package' : 'packages'}` : formatSize(file.size);
            name.append(element('h3', fileLabel(file)), element('p', size, 'release-downloads__size'));
            const link = element('a', 'Download', 'release-downloads__download');
            link.href = file.downloadUrl;
            link.setAttribute('aria-label', `Download ${fileLabel(file)}`);
            row.append(name, link);
            const details = element('details');
            details.open = file.fileName === openedFile;
            card.dataset.filename = file.fileName;
            const hasApps = Array.isArray(file.packages) && file.packages.length;
            const summary = element('summary', hasApps ? 'Included apps and checksum' : 'Checksum');
            summary.setAttribute('aria-label', `Details for ${fileLabel(file)}`);
            const body = element('div');
            if (hasApps) {
                const list = element('ul', undefined, 'release-downloads__apps');
                file.packages.forEach(name => list.append(element('li', name.split('/').pop().replace(/([a-z0-9])([A-Z])/g, '$1 $2'))));
                body.append(element('strong', 'Included apps'), list);
            }
            body.append(element('strong', 'SHA-256'), element('code', file.sha256));
            details.append(summary, body);
            card.append(row, details);
            grid.append(card);
        });
        moreFiles.hidden = files.length <= shown;
        announce(files.length ? `${files.length} ${kind === 'preset' ? 'packages' : kind === 'addon' ? 'addons' : 'tools and config files'} available.` : 'No downloads match your search.');
    }
    function resetFiles() {
        shown = PAGE_SIZE;
        openedFile = undefined;
        renderFiles();
    }
    function selectKind(next) {
        kind = next;
        filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.kind === kind)));
        resetFiles();
    }
    async function loadPage(sequence) {
        const page = remaining.slice(0, PAGE_SIZE);
        const values = await loadPublished(snapshot, page, fetch, controller.signal);
        if (sequence !== generation) return;
        remaining.splice(0, page.length);
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
        if (android.value === newestAndroid && releases.length) {
            featured = releases[0];
            renderFeatured();
        }
        if (releases.length) renderFiles();
        else announce('Direct downloads are not available for this Android version yet. You can browse all builds on SourceForge below.');
    }
    async function loadAndroid() {
        const sequence = ++generation;
        controller?.abort(); const activeController = controller = new AbortController();
        const timer = setTimeout(() => activeController.abort(), 30000);
        root.setAttribute('aria-busy', 'true'); grid.replaceChildren(); meta.textContent = ''; moreFiles.hidden = true;
        release.replaceChildren(); release.disabled = true; more.hidden = true; releases = [];
        announce('Loading release downloads…');
        try { remaining = candidates(snapshot.index, android.value); resetFiles(); await loadPage(sequence); }
        catch (error) {
            if (sequence !== generation) return;
            if (snapshot.source === 'gitlab') await refresh('github');
            else announce('Download information is temporarily unavailable. Refresh to try again, or browse SourceForge below.');
        }
        finally { clearTimeout(timer); if (sequence === generation) root.setAttribute('aria-busy', 'false'); }
    }
    async function refresh(source) {
        const sequence = ++generation;
        controller?.abort(); const activeController = controller = new AbortController();
        const timer = setTimeout(() => activeController.abort(), 30000);
        const selectedAndroid = android.value;
        android.disabled = true;
        root.setAttribute('aria-busy', 'true'); grid.replaceChildren(); meta.textContent = '';
        release.replaceChildren(); release.disabled = true; more.hidden = true; more.disabled = false; releases = []; announce('Loading releases…');
        try {
            snapshot = source
                ? await loadSourceSnapshot(source, fetch, activeController.signal)
                : await loadSnapshot(fetch, activeController.signal);
            if (sequence !== generation) return;
            const versions = Object.keys(snapshot.index.latest).filter(value => snapshot.index.latest[value]?.stable?.['arm64-v8a']).sort((a, b) => Number(b) - Number(a));
            newestAndroid = versions[0];
            android.replaceChildren(...versions.map(value => { const option = element('option', `Android ${value}`); option.value = value; return option; }));
            android.disabled = !versions.length;
            if (versions.includes(selectedAndroid)) android.value = selectedAndroid;
            refreshedAt = Date.now();
            if (android.value) await loadAndroid();
            else announce('No release downloads are available. Browse SourceForge below.');
        } catch (error) { if (sequence === generation) { android.disabled = true; announce('Download information is temporarily unavailable. Refresh to try again, or browse SourceForge below.'); } }
        finally { clearTimeout(timer); if (sequence === generation) root.setAttribute('aria-busy', 'false'); }
    }
    android.addEventListener('change', loadAndroid);
    release.addEventListener('change', resetFiles);
    search.addEventListener('input', resetFiles);
    moreFiles.addEventListener('click', () => { shown += PAGE_SIZE; renderFiles(); });
    root.querySelector('[data-refresh]').addEventListener('click', () => refresh());
    filters.forEach(button => button.addEventListener('click', () => selectKind(button.dataset.kind)));
    root.querySelector('[data-open-packages]').addEventListener('click', () => {
        search.value = '';
        selectKind('preset');
    });
    root.querySelector('[data-open-changelog]').addEventListener('click', event => {
        event.preventDefault();
        selectKind('changes');
        changelog.scrollIntoView({ block: 'start' });
    });
    featuredChoices.forEach(button => button.addEventListener('click', () => { featuredPreset = button.dataset.featuredPreset; renderFeatured(); }));
    featuredOpen.addEventListener('click', async () => {
        const selected = featured;
        const file = filteredFiles(selected.files, 'preset').find(row => fileLabel(row) === featuredPreset);
        if (!file) return;
        search.value = '';
        selectKind('preset');
        if (android.value !== selected.android) {
            android.value = selected.android;
            await loadAndroid();
        }
        if (releases.some(row => row.id === selected.id)) release.value = selected.id;
        openedFile = file.fileName;
        renderFiles();
        const card = [...grid.children].find(row => row.dataset.filename === file.fileName);
        card?.querySelector('summary').focus({ preventScroll: true });
        card?.scrollIntoView({ block: 'center' });
    });
    more.addEventListener('click', async () => {
        const sequence = generation;
        more.disabled = true;
        try { await loadPage(sequence); } catch { if (sequence === generation) announce('Older downloads could not be loaded. Try refreshing.'); }
        finally { if (sequence === generation) more.disabled = false; }
    });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - refreshedAt > 60000) refresh(); });
    window.addEventListener('pageshow', event => { if (event.persisted) refresh(); });
    function selectFromHash() {
        if (window.location.hash === '#download-packages') selectKind('preset');
        else if (window.location.hash === '#download-addons') selectKind('addon');
        else if (window.location.hash === '#download-changelog') selectKind('changes');
    }
    window.addEventListener('hashchange', selectFromHash);
    selectKind('preset');
    selectFromHash();
    refresh();
}

if (typeof document !== 'undefined') {
    const root = document.querySelector('[data-release-downloads]');
    if (root) mountDownloads(root);
}
