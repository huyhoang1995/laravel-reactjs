
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default App