import test from 'node:test';
import assert from 'node:assert/strict';
import { publishedAppRelease, loadAppRelease } from '../assets/js/home.mjs';

function release(tag = 'v0.81') {
    return { draft: false, prerelease: false, tag_name: tag, assets: [
        { name: 'CHANGELOG.md', size: 5374, browser_download_url: 'https://example.com/changelog' },
        { name: `NikGapps-${tag}.apk`, size: 17655367,
            browser_download_url: `https://github.com/nikhilmenghani/NikGappsReleases/releases/download/${tag}/NikGapps-${tag}.apk` }
    ] };
}

test('the published stable APK supplies its actual version and direct URL', () => {
    for (const tag of ['v0.81', 'v1.2.3']) {
        const result = publishedAppRelease(release(tag));
        assert.equal(result.version, tag);
        assert.equal(result.url, release(tag).assets[1].browser_download_url);
    }
});

test('drafts, prereleases and missing or foreign APK assets cannot become downloads', () => {
    for (const invalid of [
        { ...release(), draft: true }, { ...release(), prerelease: true },
        release('dev-v0.82'), { ...release(), assets: [] },
        { ...release(), assets: [{ ...release().assets[1], browser_download_url: 'https://example.com/NikGapps-v0.81.apk' }] },
        { ...release(), assets: [{ ...release().assets[1], size: 0 }] }
    ]) assert.throws(() => publishedAppRelease(invalid));
});

test('the latest release is fetched without cached metadata; API failures stay failures', async () => {
    const result = await loadAppRelease(async (url, options) => {
        assert.equal(url, 'https://api.github.com/repos/nikhilmenghani/NikGappsReleases/releases/latest');
        assert.equal(options.cache, 'no-store');
        return { ok: true, json: async () => release('v0.82') };
    });
    assert.equal(result.version, 'v0.82');
    await assert.rejects(loadAppRelease(async () => ({ ok: false })), /unavailable/);
    await assert.rejects(loadAppRelease(async () => { throw new Error('Offline'); }), /Offline/);
});
