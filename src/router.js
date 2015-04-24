import app from 'ampersand-app'
import React from 'react'
import Router from 'ampersand-router'
import Layout from './layout'

// require all pages
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetail from './pages/repo-detail'


export default Router.extend({
  renderPage(Page, options) {
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
    'repo-detail': 'repoDetail'
  },

  public() {
    React.render(<PublicPage />, document.body)
  },

  repos() {
    this.renderPage(ReposPage)
  },

  repoDetail () {
    this.renderPage(RepoDetail)
  }
})
