import React, { Component } from 'react'
import or from './or.svg'
import TrustButton from './TrustButton'

export default class TrustedLogo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trust: true
    }
  }

  handleCancel = async () => {
    this.setState({ trust: false })
    const id = localStorage.getItem('id')
    const user1 = parseInt(`${this.props.id}`)
    const user2 = parseInt(id)

    await fetch(`http://localhost:3000/trust/reject/${user1}/${user2}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log('Trust relation canceled')
      })
      .catch(err => console.log('Error:', err))
  }
  render() {
    return this.state.trust ? (
      <div className='trusted-group'>
        <img src={or} alt='open-recognition' width='95px' height='95px' />
        <br />
        <button
          width='20px'
          style={{
            backgroundColor: 'white',
            color: 'red',
            border: 'none',
            borderBottom: 'red 3px solid',
            marginBottom: '20'
          }}
          onClick={this.handleCancel}
        >
          Cancel
        </button>
      </div>
    ) : (
      <TrustButton />
    )
  }
}
