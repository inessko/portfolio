const parallax = document.querySelector('#home'),
      speedParallax = 0.08,
      menuFix = document.querySelector('.header'),
      sections = document.querySelectorAll('section');

window.onload = function () {
    loader();
    heightParallax(parallax);
    window.onresize = () => heightParallax(parallax);
};
window.onscroll = ()=> {
    BgPosition(parallax)
    scrollBy()
};

//loader

function loader() {
    const preloader = document.querySelector('#preloader');
    if (!preloader.classList.contains('done')) {
        preloader.classList.add('done')
    }
}

// style height

function heightParallax(elem) {
    elem.style.backgroundPosition = `50% 0px`;
}

// style background-position

function BgPosition(elem) {
    const windowsTop = window.pageYOffset,
          height = parseInt(getComputedStyle(parallax).height, 10);
        if (windowsTop <= height) {
            const positionY = Math.round(windowsTop * speedParallax);
            elem.style.backgroundPosition = `50% -${positionY}px`;
            if (menuFix.getBoundingClientRect().top >= 0) return menuFix.classList.remove('fix')
        } else if (menuFix.getBoundingClientRect().top <= 0) return menuFix.classList.add('fix')
}


function scrollBy () {
    for (item of sections) {
        let windowTop = item.getBoundingClientRect().top
        if (windowTop>=50 && windowTop<=100) {
           let topScroll = windowTop -  parseInt(getComputedStyle(menuFix).height)
            console.log(item.getAttribute("scrolls")===false)
            // if (!item.hasAttribute("scrolls")) {
            //     window.scrollBy(0, topScroll)
            //     item.setAttribute("scrolls", true);
            // } else item.removeAttribute("scrolls")
        }
    }
}


