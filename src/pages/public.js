import React from 'react'

export default React.createClass({
  displayName: 'PublicPage',

  render() {
    return (
      <header className='container'>
        <h1>Github-Labels</h1>
        <p>We label stuff for you, becuase we can &trade; </p>
        <a href='/login' className='button button-large'>Login</a>
      </header>
    )
  }
})
