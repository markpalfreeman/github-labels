import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import qs from 'qs'
import uuid from 'node-uuid'
import xhr from 'xhr'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetailPage from  './pages/repo-detail'
import Layout from './layout'
import MessagePage from './pages/message'
import config from './config'

export default Router.extend({

  routes: {
    '': 'public',
    'repos': 'repos',
    'login': 'login',
    'logout': 'logout',
    'repo/:user/:name': 'repoDetail',
    'auth/callback?:query': 'authCallBack',
    '*fourOhFour': 'fourOhFour'
  },

  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      )
    }

    React.render(page, document.body)
  },

  public () {
    this.renderPage(<PublicPage/>, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage repos={app.me.repos}/>)
  },

  repoDetail (user, name) {
    const repo = app.me.repos.getByFullName(user + '/' + name)
    this.renderPage(<RepoDetailPage repo={repo} labels={repo.labels}/>)
  },

  login () {
    const state = uuid()
    window.localStorage.state = state

    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: config.clientId,
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user,repo',
      state: state
    })
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  },

  fourOhFour () {
    this.renderPage(<MessagePage title='Page not found.'/>)
  },

  authCallBack (query) {
    query = qs.parse(query)

    if (query.state === window.localStorage.state) {
      delete localStorage.state

      xhr({
        url: config.gatekeeperUrl + '/' + query.code,
        json: true
      }, (err, resp, body) => {

        if (err) {
          console.log('cannot authenticate')
        } else {
          app.me.token = body.token
          this.redirectTo('/repos')
        }

      })

      this.renderPage(<MessagePage title='Fetching your GitHub repos ...'/>)
    }
  }

})