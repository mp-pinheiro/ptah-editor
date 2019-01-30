import smoothscroll from 'smoothscroll-polyfill'

try {
  smoothscroll.polyfill()
}
catch (error) {
  throw new Error(error)
}

export function initScrollIntoSection () {
  let links = document.querySelectorAll('a[href^="#section_"]')
  links.forEach(link => {
    link.addEventListener('click', scrollIntoSection, false)
  })
}

export function scrollIntoSection (e) {
  e.preventDefault()

  let target = e.target.closest('a')
  let section = document.querySelector(target && target.getAttribute('href'))

  if (section) {
    let behavior = target.dataset.behavior
    section.scrollIntoView({ block: 'start', behavior })
  }
}

void initScrollIntoSection()
