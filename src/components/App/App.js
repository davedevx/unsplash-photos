// @flow

import React from 'react'
import {
  Link,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import type { Node as ReactNode } from 'react'

import HomePage from '../Pages/HomePage'
import SearchPage from '../Pages/SearchPage'
import NotFoundPage from '../Pages/NotFoundPage'
import './App.css'
import logo from './logo.svg'

class App extends React.Component<{}> {
  static burgerMenu(): void {
    const $navbarBurgers = Array.prototype.slice.call(global.document.querySelectorAll('.navbar-burger'), 0)

    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach((el) => {
        el.addEventListener('click', (e) => {
          e.preventDefault()

          const { dataset: { target } } = el
          const $target = global.document.getElementById(target)

          el.classList.toggle('is-active')
          $target.classList.toggle('is-active')
        })
      })
    }
  }

  componentDidMount() {
    global.document.addEventListener('DOMContentLoaded', App.burgerMenu)
  }

  componentWillUnmount() {
    global.document.removeEventListener('DOMContentLoaded', App.burgerMenu)
  }

  render(): ReactNode {
    return (
      <div className="app-container container is-fluid">
        <header>
          <nav className="navbar" aria-label="main navigation">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <img src={logo} className="logo" alt="Unsplash" width="64" height="64" />
              </Link>

              <div className="navbar-burger burger" data-target="navMenu">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </div>
            </div>

            <div className="navbar-menu" id="navMenu">
              <Link to="/" className="navbar-item">Home</Link>
              <Link to="/search" className="navbar-item">Search</Link>
            </div>
          </nav>
        </header>

        <div className="app-content">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search" exact component={SearchPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
