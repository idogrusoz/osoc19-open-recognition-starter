import React, { Component } from 'react'
import Moment from 'react-moment'
import AddComment from './AddComment'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [{}],
      person: 'test',
      path: window.location.pathname.split('/')
    }
  }

  verificationConnectionIdentity = () => {
    if (this.props.trustRelation.length > 0) {
      return this.props.trustRelation[0].active
    } else {
      return false
    }
  }

  async componentDidMount() {
    if (localStorage.getItem('id') && typeof this.props.loc === 'undefined') {
      const comment = await fetch(
        `http://localhost:3000/comment/${localStorage.getItem('id')}`
      )
        .then(response => response.json())
        .then(data =>
          Promise.all(
            data.map(async x => {
              await fetch(`http://localhost:3000/users/${x.author}`)
                .then(res => res.json())
                .then(data2 => (x.author = data2[0].first_name))
              return x
            })
          )
        )

      this.setState({ comments: comment })
    } else {
      const comment = await fetch(
        `http://localhost:3000/comment/${this.props.loc}`
      )
        .then(response => response.json())
        .then(data =>
          Promise.all(
            data.map(async x => {
              await fetch(`http://localhost:3000/users/${x.author}`)
                .then(res => res.json())
                .then(
                  data2 =>
                    (x.author = {
                      id: data2[0].id,
                      name: `${data2[0].first_name} ${data2[0].last_name}`
                    })
                )
              return x
            })
          )
        )
      this.setState({ comments: comment })
    }
  }

  render() {
    return (
      <div className='comments'>
        <div className='part-header'>
          <h3>Comments:</h3>
        </div>
        {this.verificationConnectionIdentity() ? (
          <AddComment user={this.props.loc} trust={this.props.trustRelation} />
        ) : null}

        {this.props.comments.length === 0 ? (
          <div>
            <p>There are no comments on this profile yet! </p>
            <p>You can add your comment if you trust the user</p>
          </div>
        ) : (
          this.props.comments.map((x, i) =>
            x.published ? (
              <div key={i} className='comment-item'>
                <div>
                  <div>
                    <div className='comment-info'>
                      <br />
                      <a href={`/profile/${x.login}`}>author : {x.author}</a>
                      <br />
                      relation : {x.relationship}
                      <br />
                      <Moment format='YYYY/MM/DD'>{x.creationdate}</Moment>
                      <br />
                    </div>
                    {x.message}
                  </div>
                </div>
              </div>
            ) : null
          )
        )}
      </div>
    )
  }
}

export default Comments
