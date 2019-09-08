import React, { Component } from 'react'

export default class TrustButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userrequesting: '',
      userrecieving: '',
      daterequesting: '',
      active: false,
      user1approval: false,
      user2approval: false,
      buttonText: 'I trust you'
    }
  }

  sendTrustRequest = () => {
    const reqDate = new Date()
    const user1 = parseInt(localStorage.getItem('id'))
    const user2 = this.props.id
    this.setState(
      {
        userrequesting: user1,
        userrecieving: user2,
        daterequesting: reqDate,
        user1approval: true
      },
      () =>
        fetch('http://localhost:3000/trusts/', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(() =>
            this.setState(() => {
              return { buttonText: 'Pending' }
            })
          )
          .catch(error => console.error)
    )
  }

  render() {
    return (
      <div className='trust-button'>
        <button
          className={'rect-button-no-hover'}
          style={{ width: '100px' }}
          onClick={this.sendTrustRequest}
        >
          {this.state.buttonText}
        </button>
      </div>
    )
  }
}
