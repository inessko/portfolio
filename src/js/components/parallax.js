const parallax = document.querySelector('#home'),
  menuFix = document.querySelector('.header'),
  sections = document.querySelectorAll('.scroll-by'),
  animateItems = document.querySelectorAll('.animate'),
  preloader = document.querySelector('#preloader'),
  contentWrapper = document.querySelector('.content-wrapper'),
  sliderItems = document.querySelectorAll('.content-wrapper section'),
  menuLine = document.querySelector('.menu-desktop-fix-line')
menuChecked = document.querySelectorAll('.menu-desktop-fix-line-form-flex-input input')

const step = -100,
  speedParallax = 0.08

let timerLoaderInit,
  timerLoader,
  currentSlideIndex

window.onload = function () {
  loader()
  console.log(menuChecked)
  const nextSlide = slider(contentWrapper, sliderItems)
  if (windowWidth() >= 1024) {
    if ('onwheel' in document) {
      document.body.addEventListener('wheel', function (event) {
        nextSlide(event)
      })
    } else if ('onmousewheel' in document) {
      // old event
      document.body.addEventListener('mousewheel', function (event) {
        nextSlide(event)
      })
    } else if ('MozMousePixelScroll' in document) {
      // Firefox < 17
      document.body.addEventListener('MozMousePixelScroll', function (event) {
        nextSlide(event)
      })
    } else { // IE8-
      document.body.addEventListener('onmousewheel', function (event) {
        nextSlide(event)
      })
    }

  }


  function handlerClick (event) {
    console.log(event)
  }

  heightParallax(parallax)
  // window.onscroll = () => {
  //   //   BgPosition(parallax)
  //   //   scrollBy()
  //   //   animateShow(animateItems)
  //   // }
}

//loader

function loader () {
  if (preloader) {
    timerLoaderInit = setInterval(function () {
      if (!preloader.classList.contains('done')) {
        preloader.classList.add('done')
        timerLoader = setTimeout(function () {
          preloader.style.display = 'none'
        }, 1000)
      } else {
        clearInterval(timerLoaderInit)
        clearTimeout(timerLoader)
      }
    }, 1100)
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

function slider (wrap, items) {
  return function (event) {
    if (preloader.classList.contains('done')) {
      if (currentSlideIndex < items.length - 1 && currentSlideIndex >= 0) {
        if (event.deltaY > 0) {
          currentSlideIndex++
        } else if (currentSlideIndex > 0) {
          currentSlideIndex--
        }
      } else if (currentSlideIndex === items.length - 1 && event.deltaY < 0) {
        currentSlideIndex--

      } else {
        currentSlideIndex = 0
      }

      wrap.style.transform = `translateY(${currentSlideIndex * step}%)`
      checked(currentSlideIndex)
if (currentSlideIndex>0) {
  menuLine.classList.add('menu-black')
} else menuLine.classList.remove('menu-black')
    }
  }
}

function checked (step) {
  menuChecked[step].checked = true
}

menuLine.addEventListener('click', function checkedClick (event) {

  for (let i = 0; i <= menuChecked.length; i++) {
    if (event.target === menuChecked[i]) {
      currentSlideIndex = i
      if (currentSlideIndex>0) {
        menuLine.classList.add('menu-black')
      } else menuLine.classList.remove('menu-black')
      contentWrapper.style.transform = `translateY(${currentSlideIndex * step}%)`
    }
  }
})



