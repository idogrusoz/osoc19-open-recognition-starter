import React, { Component } from 'react'
import API from '../../api/api'
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
    const user1 = parseInt(id)
    const user2 = parseInt(`${this.props.id}`)

    await API.delete(`trusts/${user1}/rejection/${user2}`)
      .then(res => {
        console.log('Trust relation canceled')
      })
      // .then(this.props.updateTrustList())
      .catch(err => console.log('Error:', err))
    await this.props.updateTrustList()
    await this.props.getTrustRelation()
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
