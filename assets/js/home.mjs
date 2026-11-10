// Progressive enhancement: screenshots and the YouTube link work without JS.
export function mountShowcase(root) {
    const controls = root.querySelector('[data-screen-controls]');
    const buttons = [...root.querySelectorAll('[data-screen]')];
    const screens = [...root.querySelectorAll('[data-app-screen]')];
    if (!controls || !buttons.length || !screens.length) return;
    function select(id) {
        buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.screen === id)));
        screens.forEach(screen => { screen.hidden = screen.dataset.appScreen !== id; });
    }
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => select(button.dataset.screen));
        button.addEventListener('focus', () => select(button.dataset.screen));
        button.addEventListener('click', () => select(button.dataset.screen));
    });
    select('2');
    controls.hidden = false;
    root.dataset.enhanced = 'true';
}

const APP_REPOSITORY = 'https://github.com/nikhilmenghani/NikGappsReleases';
const APP_RELEASE_API = 'https://api.github.com/repos/nikhilmenghani/NikGappsReleases/releases/latest';

export function publishedAppRelease(release) {
    if (!release || release.draft !== false || release.prerelease !== false ||
        !/^v\d+\.\d+(?:\.\d+)?$/.test(release.tag_name)) throw new Error('Invalid stable app release');
    const tag = release.tag_name;
    const fileName = `NikGapps-${tag}.apk`;
    const expectedUrl = `${APP_REPOSITORY}/releases/download/${tag}/${fileName}`;
    const asset = release.assets?.find(asset => asset.name === fileName && asset.browser_download_url === expectedUrl && asset.size > 0);
    if (!asset) throw new Error('Published app APK is unavailable');
    return { version: tag, url: expectedUrl };
}

export async function loadAppRelease(fetcher = fetch) {
    const response = await fetcher(APP_RELEASE_API, {
        cache: 'no-store', headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) throw new Error('Latest app release is unavailable');
    return publishedAppRelease(await response.json());
}

export async function mountAppDownload(link) {
    const status = link.closest('[data-app-showcase]').querySelector('[data-app-release-status]');
    try {
        const release = await loadAppRelease();
        link.href = release.url;
        link.textContent = `Download NikGapps ${release.version}`;
        link.setAttribute('aria-label', `Download NikGapps ${release.version} APK for Android`);
    } catch {
        link.href = `${APP_REPOSITORY}/releases`;
        link.textContent = 'Browse NikGapps app releases';
        if (status) {
            status.textContent = 'The latest app version could not be checked. Choose a release on GitHub.';
            status.hidden = false;
        }
    }
}

export function mountTutorial(root) {
    const link = root.querySelector('[data-video-link]');
    const button = root.querySelector('[data-video-play]');
    if (!link || !button) return;
    button.hidden = false;
    button.addEventListener('click', () => {
        const frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/jZWR9Wz7hMk?rel=0&autoplay=1';
        frame.title = 'How to create a custom GApps package with NikGapps — community tutorial';
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        link.hidden = true;
        button.hidden = true;
        root.append(frame);
        frame.focus();
    }, { once: true });
}

if (typeof document !== 'undefined') {
    document.querySelectorAll('[data-app-showcase]').forEach(mountShowcase);
    document.querySelectorAll('[data-app-download]').forEach(mountAppDownload);
    document.querySelectorAll('[data-tutorial]').forEach(mountTutorial);
}
