import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import qs from 'qs' // string route parsing
import xhr from 'xhr' // ajax requests from the server

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

    // ajax request for authentication
    xhr({
      url: `http://github-labels.herokuapp.com/authenticate/${code}`,
      json: true
    }, (err, req, body) => {
      if (err) {
        console.error('something went wrong!')
      } else {
        // attach 'token' to Me object
        app.me.token = body.token
        // .. and re-direct back to /repos page
        this.redirectTo('./repos')
      }
    })
  }

})
