import app from 'ampersand-app'
import React from 'react'
import localLinks from 'local-links'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({

  mixins: [ampersandMixin],

  // take over in-app links w/ library
  onClick (event) {
    const pathname = localLinks.getLocalPathname(event)

    if (pathname) {
      event.preventDefault()
      app.router.history.navigate(pathname, {trigger: true})
    }
  },

  render () {
    const {me} = this.props

    return (
      <div onClick={this.onClick}>
        <nav className='top-nav top-nav-light cf' role='navigation'>
          <input id='menu-toggle' className='menu-toggle' type='checkbox'/>
          <label htmlFor='menu-toggle'>Menu</label>
          <ul className='list-unstyled list-inline cf'>
            <li>Github-Labels</li>
            <li><a href='/repos'>Repos</a></li>
            <li><a href='/repo-detail'>RepoDetail</a></li>
            <li className='pull-right'>{me.login}<a href='/logout'>Logout</a></li>
          </ul>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
})
