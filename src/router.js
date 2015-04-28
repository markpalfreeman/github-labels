import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import qs from 'qs'

import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetail from './pages/repo-detail'

import Layout from './layout'

export default Router.extend({
  renderPage (Page, options) {
    const Main = (
      <Layout>
        <Page {...options}/>
      </Layout>
    )

    React.render(Main, document.body)
  },

  routes: {
    '': 'public',
    'repos': 'repos',
    'repo-detail': 'repoDetail',
    'login': 'login',
    'auth/callback': 'authCallback'
  },

  public () {
    React.render(<PublicPage/>, document.body)
  },

  repos () {
    this.renderPage(ReposPage)
  },

  repoDetail () {
    this.renderPage(RepoDetail)
  },

  login () {
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      scope: 'user,repo',
      redirect_uri: location.origin + '/auth/callback',
      client_id: '8664788590e862665fdb'
    })
  },

  authCallback () {
    const code = qs.parse(window.location.search.slice(1)).code

    console.log(code)
  }

})
