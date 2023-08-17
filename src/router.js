const aboutBtn = document.querySelector('#aboutBtn')

export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)
    this.handle()
  }


  makeLinkActive = () => {
  document.querySelectorAll('a')
  .forEach(a => a.classList.remove('active'))

  const { pathname } = location
  
  const currentLink = document.querySelector('a[href="' + pathname + '"]')
  currentLink.classList.add('active')
  }


  changeBg = () => {
    const { pathname } = location

    if(pathname === '/') {
      document.body.classList.add('bg-home')
      document.body.classList.remove('bg-universe')
      document.body.classList.remove('bg-explore')
    }

    if(pathname === '/about') {
      document.body.classList.remove('bg-home')
      document.body.classList.add('bg-universe')
      document.body.classList.remove('bg-explore')
    }

    if(pathname === '/explore') {
      document.body.classList.remove('bg-home')
      document.body.classList.remove('bg-universe')
      document.body.classList.add('bg-explore')
    }
  }
  
  handle = async () => {
    this.makeLinkActive()
    this.changeBg()
    const { pathname } = window.location
    const route = this.routes[pathname]

    fetch(route)
    .then((data) => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
  }
}
