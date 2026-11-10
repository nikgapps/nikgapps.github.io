import test from 'node:test';
import assert from 'node:assert/strict';
import { metadataUrl, loadSnapshot, publishedRelease, candidates, loadPublished, filteredFiles, fileLabel, formatSize } from '../assets/js/releases.mjs';

const commit = 'a'.repeat(40);
const summary = { id: 'published', androidVersion: '17', channel: 'stable', architecture: 'arm64-v8a', createdAt: '2026-11-10T01:00:00Z', manifest: 'releases/android-17/published.json' };
const file = { fileName: 'NikGapps-core-arm64-17-20261110-signed.zip', kind: 'preset', size: 140078881, sha256: 'b'.repeat(64), downloadUrl: 'https://sourceforge.net/projects/nikgapps/files/Releases/Android-17/10-Nov-2026/NikGapps-core-arm64-17-20261110-signed.zip/download' };
function manifest() {
    return { id: summary.id, androidVersion: '17', channel: 'stable', architecture: 'arm64-v8a', configVersion: '42',
        sourceforge: { status: 'published', registryReleaseId: summary.id, releaseDate: '2026-11-10', files: [{ ...file }],
            releaseFolderUrl: 'https://sourceforge.net/projects/nikgapps/files/Releases/Android-17/10-Nov-2026/' } };
}

test('the index and manifests are read from one pinned metadata commit without cache', async () => {
    const calls = [];
    const fetcher = async (url, options) => { calls.push({ url, options }); return { ok: true, json: async () => calls.length === 1 ? { commit: { id: commit } } : { latest: {}, releases: [] } }; };
    const snapshot = await loadSnapshot(fetcher);
    assert.equal(snapshot.commit, commit);
    assert.match(calls[1].url, /releases%2Findex.json\/raw\?ref=a{40}$/);
    assert.equal(calls[0].options.cache, 'no-store');
    assert.equal(calls[1].options.cache, 'no-store');
    assert.throws(() => metadataUrl('releases/../catalog.json', commit));
    assert.throws(() => metadataUrl('releases/index.json', 'main'));
});

test('only confirmed matching publications expose download links', () => {
    assert.equal(publishedRelease(manifest(), summary).files.length, 1);
    const withdrawn = manifest(); withdrawn.sourceforge.status = 'withdrawn';
    assert.equal(publishedRelease(withdrawn, summary), null);
    const pending = manifest(); delete pending.sourceforge;
    assert.equal(publishedRelease(pending, summary), null);
    const wrong = manifest(); wrong.sourceforge.registryReleaseId = 'other';
    assert.throws(() => publishedRelease(wrong, summary), /Invalid download publication/);
});

test('foreign, executable and mismatched URLs and invalid file integrity metadata are rejected', () => {
    for (const url of ['javascript:alert(1)', 'https://sourceforge.net.attacker.test/projects/nikgapps/files/a/download', 'https://sourceforge.net/projects/another/files/a/download']) {
        const data = manifest(); data.sourceforge.files[0].downloadUrl = url;
        assert.throws(() => publishedRelease(data, summary));
    }
    for (const bad of [{ sha256: 'missing' }, { size: -1 }, { kind: 'script' }]) {
        const data = manifest(); Object.assign(data.sourceforge.files[0], bad);
        assert.throws(() => publishedRelease(data, summary));
    }
});

test('a new registry publication awaiting SourceForge does not displace existing downloads', async () => {
    const old = { ...summary, id: 'older', manifest: 'releases/older.json', createdAt: '2026-11-09T01:00:00Z' };
    const snapshot = { commit, index: { releases: [old, summary] } };
    const fetcher = async url => ({ ok: true, json: async () => {
        const data = manifest();
        if (url.includes('older.json')) { data.id = 'older'; data.sourceforge.registryReleaseId = 'older'; }
        else delete data.sourceforge;
        return data;
    } });
    const rows = await loadPublished(snapshot, candidates(snapshot.index, '17'), fetcher);
    assert.equal(rows.length, 1); assert.equal(rows[0].id, 'older');
});

test('same-day overwritten folders expose only the newest download hashes', async () => {
    const older = { ...summary, id: 'older', manifest: 'releases/older.json', createdAt: '2026-11-10T00:00:00Z' };
    const snapshot = { commit, index: { releases: [older, summary] } };
    const fetcher = async url => ({ ok: true, json: async () => {
        const data = manifest(); if (url.includes('older.json')) { data.id = 'older'; data.sourceforge.registryReleaseId = 'older'; } return data;
    } });
    const rows = await loadPublished(snapshot, candidates(snapshot.index, '17'), fetcher);
    assert.deepEqual(rows.map(row => row.id), ['published']);
});

test('release selection excludes different channels, architectures and Android versions', () => {
    const index = { releases: [summary, { ...summary, id: 'beta', channel: 'beta' }, { ...summary, id: '16', androidVersion: '16' }, { ...summary, id: 'arm', architecture: 'armeabi-v7a' }] };
    assert.deepEqual(candidates(index, '17').map(row => row.id), ['published']);
});

test('CoreGo, addons, tools and config have independent filters and searchable labels', () => {
    const corego = { ...file, fileName: file.fileName.replace('-core-', '-corego-') };
    const addon = { ...file, kind: 'addon', fileName: 'NikGapps-Addon-17-GooglePhotos-20261110-signed.zip' };
    const tool = { ...file, kind: 'tool', fileName: 'Debloater-20261110.zip' };
    const config = { ...file, kind: 'config', fileName: 'nikgapps.config' };
    assert.equal(fileLabel(corego), 'CoreGo');
    assert.deepEqual(filteredFiles([file, corego, addon, tool, config], 'preset').map(fileLabel), ['Core', 'CoreGo']);
    assert.equal(filteredFiles([file, addon], 'addon', 'photos')[0], addon);
    assert.equal(filteredFiles([tool, config], 'other').length, 2);
    assert.equal(formatSize(140000000), '140 MB');
});

test('metadata errors do not fall back to stale download links', async () => {
    await assert.rejects(loadSnapshot(async () => ({ ok: false })), /unavailable/);
    await assert.rejects(loadPublished({ commit }, [summary], async () => ({ ok: false })), /unavailable/);
});
