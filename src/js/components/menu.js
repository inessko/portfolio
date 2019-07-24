//MenuToggle

const menuButton = document.querySelector('.navbar-toggle'),
  menuToggle = document.querySelector('.navbar-collapse-list');

if (menuToggle && menuButton) {
  let items = menuToggle.children,
    height = 0;
  menuButton.addEventListener('click', function () {
    menuToggle.classList.toggle('active')
    if (menuToggle.classList.contains('active')) {
      menuToggle.style.height = itemHeight(items, height) + 'px'
    } else menuToggle.style.height = height + 'px'

  })
}

function itemHeight (array, count) {
  for (item of array) {
    count = count + parseInt(getComputedStyle(item).height)
  }
  return count
}


