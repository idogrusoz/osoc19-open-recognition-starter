import React, { Component } from 'react'

export default class TrustedList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trustedpeople: [{}]
    }
  }
  componentDidMount = () => {
    if (localStorage.getItem("id") && typeof this.props.loc === "undefined") {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/trust/people/${localStorage.id}`)
        .then(res => res.json())
        .then(data => this.setState({ trustedpeople: data }))
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/trust/people/${this.props.loc}`)
        .then(res => res.json())
        .then(data => {
          this.setState({ trustedpeople: data })
        })
    }
  }

  render() {
    return (
      <div className='trusted-list'>
        <div className='part-header'>
          <h3>Trusted By :</h3>
        </div>
        {this.props.trustedpeople.map((x, i) => (
          <div key={i}>
            <a href={`/profile/${x.login}`}>
              <img
                alt=''
                src={process.env.PUBLIC_URL + `${x.picture}`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '100%',
                  margin: '10px',
                  objectFit: 'cover'
                }}
              />
              {x.first_name} {x.last_name}
            </a>
          </div>
        ))}
      </div>
    )
  }
}
