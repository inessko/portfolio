const parallax = document.querySelector('#home'),
  menuFix = document.querySelector('.header'),
  sections = document.querySelectorAll('.scroll-by'),
  animateItems = document.querySelectorAll('.animate'),
  preloader = document.querySelector('#preloader'),
  contentWrapper = document.querySelector('.content-wrapper'),
  sliderItems = document.querySelectorAll('.content-wrapper section'),
  menuLine = document.querySelector('.menu-desktop-fix-line'),
  menuChecked = document.querySelectorAll('.menu-desktop-fix-line-form-flex-input input'),
  anchors = document.querySelectorAll('a[href*="#"]')

const step = -100,
  speedParallax = 0.08,
  activeFunctionWidth = 1200

let timerLoaderInit,
  timerLoader,
  currentSlideIndex = 0

window.onload = function () {
  loader()
  BgPosition(parallax)
  scrollMobil ()
  const nextSlide = slider(contentWrapper, sliderItems)
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
window.onscroll = function () {
  BgPosition(parallax)
  // heightParallax(parallax)
  // scrollBy ()
}

}

//loader

function loader () {
  if (preloader) {
    timerLoaderInit = setInterval(() => {
      if (!preloader.classList.contains('done')) {
        preloader.classList.add('done')
        timerLoader = setTimeout(() => {
          preloader.style.display = 'none'
        }, 1000)
      } else {
        clearInterval(timerLoaderInit)
        clearTimeout(timerLoader)
      }
    }, 1100)
  }
}


// window width

function windowWidth () {
  return window.innerWidth
}

function slider (wrap, items) {
  return function (event) {
    if (preloader.classList.contains('done') && windowWidth() >= activeFunctionWidth) {
      if (currentSlideIndex < items.length - 1 && currentSlideIndex >= 0) {
        if (event.deltaY > 0) {
          currentSlideIndex++
        } else if (currentSlideIndex > 0) {
          currentSlideIndex--
        }
      } else if (currentSlideIndex === items.length - 1 && event.deltaY < 0) {
        currentSlideIndex--
      }
      wrap.style.transform = `translateY(${currentSlideIndex * step}%)`
      checked(currentSlideIndex)
      if (currentSlideIndex > 0) {
        classAdd(menuLine, 'menu-black')
      } else classRemove(menuLine, 'menu-black')
    }
  }
}

//classAdd

export function classAdd (item, className) {
  if (!item.classList.contains(className)) {
    item.classList.add(className)
  }
}
//classRemove
export function classRemove (item, className) {
  if (item.classList.contains(className)) {
    item.classList.remove(className)
  }
}

//item checked
function checked (step) {
  menuChecked[step].checked = true
}

//translateY container
menuLine.addEventListener('click', function checkedClick (event) {
  menuChecked.forEach(function (item, i) {
    if (event.target === item) {
      currentSlideIndex = i
      if (currentSlideIndex > 0) {
        classAdd(menuLine, 'menu-black')
      } else classRemove(menuLine, 'menu-black')
      contentWrapper.style.transform = `translateY(${currentSlideIndex * step}%)`
    }
  })
})

//scroll
// function scrollBy () {
//   const windowsTop = window.pageYOffset,
//     menuHeight = parseInt(getComputedStyle(menuFix).height, 10),
//     height = parseInt(getComputedStyle(parallax).height, 10)
//   for (item of sections) {
//     if (windowsTop <= height) {
//       item.setAttribute('scrolls', false)
//     }
//     let itemTop = item.getBoundingClientRect().top
//     if (itemTop >= menuHeight && itemTop <= 120) {
//       let topScroll = itemTop - menuHeight
//       if (windowsTop >= height) {
//         if (item.getAttribute('scrolls') === 'false') {
//           window.scrollBy(0, topScroll)
//           item.setAttribute('scrolls', true)
//         }
//       }
//     }
//   }
// }

// style background-position
function BgPosition (elem) {
  if (windowWidth()<activeFunctionWidth) {
    const windowsTop = window.pageYOffset,
      height = parseInt(getComputedStyle(parallax).height, 10)
    if (windowsTop <= height) {
      const positionY = Math.round(windowsTop * speedParallax)
      elem.style.backgroundPosition = `50% -${positionY}px`
      if (menuFix.getBoundingClientRect().top >= 0) return menuFix.classList.remove('fix')
    } else menuFix.classList.add('fix')
  }
}

function scrollMobil () {
  if (windowWidth()<activeFunctionWidth&& anchors) {
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const blockID = anchor.getAttribute('href')
        document.querySelector('' + blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
  }
}
