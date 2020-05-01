const nav = document.querySelector('nav')
const navWrapper = document.querySelector('.header__nav')
const hamburger = document.querySelector('.hamburger')
const closeButton = document.querySelector('.nav__close')
const navOverlay = document.querySelector('.nav__overlay')

function menuHandler() {
    nav.classList.toggle('nav__expanded')
}

hamburger.addEventListener('click', menuHandler)

nav.addEventListener('click', function (e) {
    if (e.target == closeButton) {
        nav.classList.remove('nav__expanded')
    }
})

navOverlay.addEventListener('click', function (e) {
    if (e.target != navWrapper && nav.classList.contains('nav__expanded')) {
        nav.classList.remove('nav__expanded')
    }
})

$(document).ready(function () {
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
