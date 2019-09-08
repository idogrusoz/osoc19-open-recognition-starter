import React, { Component } from 'react'
import TrustButton from './trust-components/TrustButton'
import TrustedLogo from './trust-components/TrustedLogo'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: [{}],
      path: window.location.pathname.split('/')
    }
  }
  async componentDidMount() {
    if (localStorage.getItem('id') && typeof this.props.id === 'undefined') {
      const fullName = await fetch(
        `http://localhost:3000/users/${localStorage.getItem('id')}`
      ).then(function(response) {
        return response.json()
      })
      this.setState({ name: fullName })
    } else {
      const fullName = await fetch(
        `http://localhost:3000/users/${this.props.id}`
      ).then(function(response) {
        return response.json()
      })
      this.setState({ name: fullName })
    }
  }

  renderTrustButton = id => {
    const trusted = this.props.trustRelation
    if (localStorage.getItem('id') !== null) {
      if (localStorage.getItem('id') !== id) {
        if (trusted.length > 0) {
          if (trusted[0].active === true) {
            return (
              <TrustedLogo
                updateTrustList={this.props.updateTrustList}
                id={id}
              />
            )
          } else if (
            trusted[0].active === false &&
            trusted[0].user2approval === false
          ) {
            return (
              <div className='trust-button'>
                <button className='rect-button-no-hover trust-button'>
                  Pending
                </button>
              </div>
            )
          }
        } else {
          return <TrustButton id={id} />
        }
      } else {
        return null
      }
    }
  }

  render() {
    const user = this.props.name[0]
    return (
      <div className='profile' key={user.id}>
        <div className='image-container'>
          {user.picture === null || user.picture === undefined ? (
            <img
              src={
                process.env.PUBLIC_URL +
                '/img/blank-profile-picture-973460_640.png'
              }
              alt='prof pic'
              className={'profile-image'}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + user.picture}
              alt='prof pic'
              className={'profile-image'}
            />
          )}
        </div>
        <div className='profile-text'>
          <p>{`${user.first_name} ${user.last_name}`} </p>
          <p>{user.email} </p>
        </div>

        {parseInt(localStorage.getItem('id')) === user.id
          ? null
          : this.renderTrustButton(user.id)}
      </div>
    )
  }
}

export default Profile
