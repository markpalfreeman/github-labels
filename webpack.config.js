var config = require('hjs-webpack')

module.exports = config({
  in: 'src/app.js',
  out: 'public',
  isDev: process.env.NODE_ENV !== 'production',
  html: true
})
