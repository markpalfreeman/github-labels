import Router from './router'
import styles from './styles/main.styl'


window.app = {
  init() {
    this.router = new Router()
    this.router.history.start()
  }
}

window.app.init()






// import styles from './styles/main.styl'
// import React from 'react'

// const Hello = React.createClass({
//   render() {
//     return (
//       <div>
//         Hello, {this.props.name}!
//       </div>
//     )
//   }
// })

// React.render(<Hello name='Mark'/>, document.body)
