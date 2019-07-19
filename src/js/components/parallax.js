const parallax = document.querySelector('#home'),
  speedParallax = 0.08,
  menuFix = document.querySelector('.header'),
  sections = document.querySelectorAll('.scroll-by'),
  animateItems = document.querySelectorAll('.animate'),
  preloader = document.querySelector('#preloader'),
  sliderItem = document.querySelector('.content-wrapper')
let count = 0
window.onload = function () {
  let width = windowWidth()
  console.log(width)
  loader()
  heightParallax(parallax)
  document.body.addEventListener('wheel', function () {
    slider(sliderItem)
  })
  window.onscroll = () => {
    BgPosition(parallax)
    scrollBy()
    animateShow(animateItems)
  }
}

//loader

function loader () {
  let timerLoaderInit,
    timerLoader
  if (preloader) {
    timerLoaderInit = setInterval(function () {
      if (!preloader.classList.contains('done')) {
        preloader.classList.add('done')
        timerLoader = setTimeout(function () {
          preloader.parentNode.removeChild(preloader)
        }, 1000)
      } else {
        clearInterval(timerLoaderInit)
        clearTimeout(timerLoader)
      }
    }, 2000)
  }
}

// timerID

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
    if (item.getBoundingClientRect().bottom <= 100 && item.getBoundingClientRect().bottom >= 70) {

      item.classList.add('slide-bottom')
    }
  }
}

// window width

function windowWidth () {
  return window.innerWidth
}

function slider (elem) {
  let itemsLength = elem.children.length - 2,
    step = -100
  if (count < itemsLength) {
    count=count+1
    console.log(count)
  } else {
    count = 0
  }
  elem.style.transform = `translateX(${count * step}%)`

  return console.log(elem)
}
