// 'Me' is a model created to persist secret Tokens for authentication

import Model from 'ampersand-model'
import cacheMixin from 'ampersand-local-cache-mixin' // use LocalStorage
import ms from 'milliseconds'
import githubMixin from '../helpers/github-mixin'

export default Model.extend(githubMixin, cacheMixin, {
  url: 'https://api.github.com/user',

  // Cache auth tokens
  initialize () {
    this.initStorage({
      storageKey: 'me',
      ttl: ms.days(30),
      tts: ms.minutes(1)
    })
    // Write to localStorage if token changes / fetch if stale
    this.on('stale', this.fetch, this)
    this.on('change', this.writeToStorage, this)
    this.on('change:loggedIn', this.onLoggedInChange, this)
  },

  props: {
    login: 'string',
    token: 'string'
  },

  // derived property to return boolean
  derived: {
    loggedIn: {
      deps: ['token'],
      fn () {
        return !!this.token
      }
    }
  },

  onLoggedInChange () {
    if (this.loggedIn) {
      this.fetch()
    } else {
      window.localStorage.clear()
    }
  }
})
