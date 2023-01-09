'use strict'

///////////////////////////////////////////////////////////
// SET CURRENT YEAR
const yearEl = document.querySelector('.year')
const currentYear = new Date().getFullYear()
yearEl.textContent = currentYear

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap () {
  let flex = document.createElement('div')
  flex.style.display = 'flex'
  flex.style.flexDirection = 'column'
  flex.style.gap = '1px'

  flex.appendChild(document.createElement('div'))
  flex.appendChild(document.createElement('div'))

  document.body.appendChild(flex)
  let isSupported = flex.scrollHeight === 1
  flex.parentNode.removeChild(flex)
  console.log(isSupported)

  if (!isSupported) document.body.classList.add('no-flexbox-gap')
}
checkFlexGap()

///////////////////////////////////////////////////////////
// MAKE MOBILE NAVIGATION WORK
const headerEl = document.querySelector('.header')
const btnNav = document.querySelector('.btn-mobile-nav')

btnNav.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open')
})

///////////////////////////////////////////////////////////
// STICKY NAVIGATION
const sectionHero = document.querySelector('.section-hero')

const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0]

    if (entry.isIntersecting === false) {
      document.body.classList.add('sticky')
    } else if (entry.isIntersecting === true) {
      document.body.classList.remove('sticky')
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-80px'
  }
)
observer.observe(sectionHero)

///////////////////////////////////////////////////////////
// SMOOTH SCROLLING ANIMATION
const allLinks = document.querySelectorAll('a:link')

allLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()

    const href = link.getAttribute('href')

    // SCROLL BACK TO TOP
    if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' })

    if (href !== '#' && href.startsWith('#')) {
      const section = document.querySelector(href)

      section.scrollIntoView({ behavior: 'smooth' })
    }

    if (link.classList.contains('main-nav-link')) {
      headerEl.classList.toggle('nav-open')
    }
  })
})
