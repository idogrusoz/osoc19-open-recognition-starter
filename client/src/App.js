import React, { Component } from 'react'
import MyRoutes from './routes/MyRoutes'
import './App.css'

class App extends Component {
  state = {}
  render() {
    return (
      <React.Fragment>
        <div className='mainPage'>
          <MyRoutes />
        </div>
      </React.Fragment>
    )
  }
}

export default App
