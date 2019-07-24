import React, { Component } from 'react'
import image from '../header/logo.svg'
import { Link } from 'react-router-dom'

export default class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      password: '',
      mistake: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  validateForm = () => {
    return this.state.login.length > 0 && this.state.password.length > 5
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { history } = this.props
    fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/users/${this.state.login}/${this.state.password}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            const user = data
            localStorage.setItem('id', `${user[0].id}`)
            history.push(`/profile/${user[0].login}`)
          })
        } else {
          this.setState({ mistake: true })
        }
      })

      .catch(err => console.log('Error:', err))
  }

  render() {
    return (
      <div className='form-body'>
        <div className='signin-form'>
          <img src={image} alt='logo' className={'signin-logo'} />
          <form action=''>
            <p className={'form-name'}>Username</p>
            <input
              type='text'
              placeholder='Enter Username'
              name='login'
              value={this.state.login}
              onChange={this.handleChange}
            />
            <p className={'form-name'}>Password</p>
            <input
              type='password'
              placeholder='Enter password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </form>
          <div className='warning'>
            {this.state.mistake ? (
              <p style={{ color: 'red' }}>*Incorrect Login or Password</p>
            ) : null}
            <button
              className='rect-button-on-white'
              type='submit'
              onClick={this.handleSubmit}
              disabled={!this.validateForm()}
            >
              Sign in
            </button>
          </div>
        </div>
        <div className='question-white'>Not a member yet?</div>
        {localStorage.getItem('id') ? null : (
          <Link className='linksss' to='/register'>
            <button className={'rect-button'}>Register</button>
          </Link>
        )}
      </div>
    )
  }
}
