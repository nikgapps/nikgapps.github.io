const nav = document.querySelector('header nav')
const navWrapper = document.querySelector('.header__nav')
const hamburger = document.querySelector('.hamburger')
const closeButton = document.querySelector('.nav__close')
const navOverlay = document.querySelector('.nav__overlay')

function setMenu(open) {
    nav.classList.toggle('nav__expanded', open)
    hamburger.setAttribute('aria-expanded', String(open))
}

if (nav && hamburger && navWrapper && navOverlay && closeButton) {
    hamburger.addEventListener('click', () => {
        const open = !nav.classList.contains('nav__expanded')
        setMenu(open)
        if (open) closeButton.focus()
    })
    const closeMenu = () => {
        setMenu(false)
        hamburger.focus()
    }
    closeButton.addEventListener('click', closeMenu)
    navOverlay.addEventListener('click', event => { if (event.target === navOverlay) closeMenu() })
    nav.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('nav__expanded')) closeMenu()
    })
}

if (typeof $ === 'function') $(document).ready(function () {
    // Accordion Init
    $('.ui.accordion').accordion()

    // Tabs

    let tabWrapper = $('.downloads__inner'),
        tabMnu = $('.tab__item .tab__btn'),
        tabContent = $('.tab__content .tab__pane')

    tabContent.not(':first-child').hide()

    tabMnu.each(function (i) {
        $(this).attr('data-tab', 'tab' + i)
    })
    tabContent.each(function (i) {
        $(this).attr('data-tab', 'tab' + i)
    })

    tabMnu.click(function () {
        var tabData = $(this).data('tab')
        tabWrapper.find(tabContent).hide()
        tabWrapper
            .find(tabContent)
            .filter('[data-tab=' + tabData + ']')
            .show()
    })

    $('.tab__btn').click(function () {
        var before = $('.tab__item .tab__btn')
        before.removeClass('active')
        $(this).addClass('active')
    })

    // Accordion Events

    let hash = window.location.hash
    if (hash) {
        var targetPanel = $(hash)
        if (targetPanel.length) {
            targetPanel.trigger('click')
        }
    }
})

// var headers = $('#accordion .accordion-header');
// var contentAreas = $('#accordion .ui-accordion-content ').hide();

// // add the accordion functionality
// headers.click(function() {
//     var panel = $(this).next();
//     var isOpen = panel.is(':visible');
//     contentAreas.slideUp();
//     if (!isOpen) {
//         panel.slideDown();
//     }

//     return false;
// });
