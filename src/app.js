import app from 'ampersand-app'
import Router from './router'
import styles from './styles/main.styl'
import Me from './models/me'

app.extend({
  init () {
    this.me = new Me()
    this.router = new Router()
    this.router.history.start()
  }
})

window.app = app

app.init()
