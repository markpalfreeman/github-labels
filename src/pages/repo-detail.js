import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'RepoDetailPage',

  render() {
    const {repo} = this.props

    return (
      <header className='container'>
        <h1>{repo.full_name} Labels</h1>
        <ul>

        </ul>
      </header>
    )
  }
})
