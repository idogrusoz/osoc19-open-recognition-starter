import React, { Component } from 'react'
import API from '../../api/api'
import image from '../header/logo.svg'
import SignInOut from '../header/SignInOut'

export default class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      login: '',
      password: '',
      picture: '/img/blank-profile-picture-973460_640.png'
    }
  }

  validateForm = () => {
    return (
      this.state.first_name.length > 2 &&
      this.state.last_name.length > 2 &&
      this.state.login.length > 0 &&
      this.state.password.length > 5
    )
  }

  handleSubmit = () => {
    const data = this.state
    const { history } = this.props
    API.post('users/register', { data })
      .then(res => {
        history.push('/signin')
      })
      .catch(error => console.log('Error:', error))
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className='form-body'>
        <div className='register-form'>
          <img src={image} alt='logo' className={'signin-logo'} />
          <form action=''>
            <p>First Name</p>
            <input
              type='text'
              placeholder='Enter first name'
              name='first_name'
              onChange={this.handleChange}
            />
            <p className={'form-name'}>Last Name</p>
            <input
              type='text'
              placeholder='Enter family name'
              name='last_name'
              onChange={this.handleChange}
            />
          </form>
          <form action=''>
            <p className={'form-name'}>Username</p>
            <input
              type='text'
              placeholder='Choose a username'
              name='login'
              onChange={this.handleChange}
            />
            <p className={'form-name'}>Password</p>
            <input
              type='password'
              placeholder='Minimum 5 charachters'
              name='password'
              onChange={this.handleChange}
            />
          </form>

          <button
            className='rect-button-on-white'
            variant='outline-primary'
            onClick={this.handleSubmit}
            disabled={!this.validateForm()}
          >
            Register
          </button>
        </div>
        <div>
          <p className='question-white'>Already a member?</p>
        </div>
        <SignInOut class={{ classname: 'rect-button' }} />
      </div>
    )
  }
}
