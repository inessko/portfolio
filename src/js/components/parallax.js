const parallax = document.querySelector('#home'),
      speedParallax = 0.08,
      menuFix = document.querySelector('.header'),
      sections = document.querySelectorAll('.scroll-by'),
      animateItems = document.querySelectorAll('.animate')

window.onload = function () {
  loader()
  heightParallax(parallax)
  window.onresize = () => heightParallax(parallax)
}
window.onscroll = () => {
  BgPosition(parallax)
  scrollBy()
  animateShow (animateItems)
}

//loader

function loader () {
  const preloader = document.querySelector('#preloader')
  if (!preloader.classList.contains('done')) {
    preloader.classList.add('done')
  }
}

// style height

function heightParallax (elem) {
  elem.style.backgroundPosition = `50% 0px`
}

// style background-position

function BgPosition (elem) {
  const windowsTop = window.pageYOffset,
    height = parseInt(getComputedStyle(parallax).height, 10)
  if (windowsTop <= height) {
    const positionY = Math.round(windowsTop * speedParallax)
    elem.style.backgroundPosition = `50% -${positionY}px`
    if (menuFix.getBoundingClientRect().top >= 0) return menuFix.classList.remove('fix')
  } else menuFix.classList.add('fix')
}

function scrollBy () {
  const windowsTop = window.pageYOffset,
        menuHeight = parseInt(getComputedStyle(menuFix).height, 10),
        height = parseInt(getComputedStyle(parallax).height, 10)
  for (item of sections) {
    if (windowsTop <= height) {
      item.setAttribute('scrolls', false)
    }
    let itemTop = item.getBoundingClientRect().top
    if (itemTop >= menuHeight && itemTop <= 120) {
      let topScroll = itemTop - menuHeight
      if (windowsTop >= height) {
        if (item.getAttribute('scrolls') === 'false') {
          window.scrollBy(0, topScroll)
          item.setAttribute('scrolls', true)
        }
      }
    }
  }
}


function animateShow (array) {
  for (item of array) {
    console.log(item.getBoundingClientRect().bottom)
    if (item.getBoundingClientRect().bottom<=100 && item.getBoundingClientRect().bottom>=70) {

      item.classList.add('slide-bottom')
    }
  }
}
