import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'ReposPage',

  render() {
    const {repos} = this.props

    return (
      <header className='container'>
        <h1>Repos</h1>

        {repos.map((repo) => {
          return (
            <div key={repo.id}>
              <a href={repo.appUrl}>{repo.name}</a>
            </div>
          )
        })}
      </header>
    )
  }
})
