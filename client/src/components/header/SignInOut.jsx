import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

export default class SignInOut extends Component {
  signOut = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('token')
    return <Redirect to='/' />
  }
  signOut = () => {
    localStorage.removeItem('id')
  }

  render() {
    return localStorage.getItem('id') ? (
      <Link to='/'>
        <button className={this.props.class.classname} onClick={this.signOut}>
          Sign-out
        </button>
      </Link>
    ) : (
      <Link to='/signin'>
        <button className={this.props.class.classname} onClick={this.signIn}>
          Sign-in
        </button>
      </Link>
    )
  }
}
