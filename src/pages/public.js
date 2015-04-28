import React from 'react'

export default React.createClass({
  displayName: 'PublicPage',
  render() {
    return (
      <header className='container'>
        <h1>Github-Labels</h1>
        <p>We label stuff for you, because, we can&trade;</p>
        <a className='button button-large' href='/login'>Login</a>
      </header>
    )
  }
})
