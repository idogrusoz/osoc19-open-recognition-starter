import React, { Component } from 'react'
import Moment from 'react-moment'
import API from '../../api/api'
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
    let commentsArray = []
    if (localStorage.getItem('id') && typeof this.props.loc === 'undefined') {
      await API.get(`comments/${localStorage.getItem('id')}`)
        .then(response => response.data)
        .then(data =>
          data.map(async x => {
            await API.get(`users/${x.author}`)
              .then(res => res.data)
              .then(data => (x.author = data[0].first_name))
            commentsArray.push(x)
          })
        )

      this.setState({ comments: commentsArray })
    } else {
      await API.get(`comments/${this.props.loc}`)
        .then(response => response.data)
        .then(data => {
          data.map(async x => {
            await API.get(`3000/users/${x.author}`).then(res =>
              res.data.then(
                data =>
                  (x.author = {
                    id: data[0].id,
                    name: `${data[0].first_name} ${data[0].last_name}`
                  })
              )
            )
            commentsArray.push(x)
          })
        })
    }
    this.setState({ comments: commentsArray })
  }

  render() {
    return (
      <div className='comments'>
        <div className='part-header'>
          <h3>Comments:</h3>
        </div>
        {this.verificationConnectionIdentity() &&
        this.props.user !== parseInt(localStorage.getItem('id')) ? (
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
