import React, { Component } from 'react'
export default class CommentNotificationItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
      user: []
    }
  }

  componentDidMount = async () => {
    const id = this.props.item.author
    await fetch(`http://localhost:3000/users/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: data,
          render: true
        })
      })
      .catch(err => console.log('Error:', err))
  }

  handleReject = async id => {
    const user1 = this.props.item.author
    const user2 = this.props.item.reciever
    await fetch(`http://localhost:3000/comments/${id}/rejection`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log('Comment is deleted', res))
    await fetch(`http://localhost:3000/trusts/${user1}/rejection/${user2}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log('Trust relation is terminated', res)
      })
      .catch(err => console.log('Error:', err))
  }

  handleAccept = async id => {
    await fetch(`http://localhost:3000/comments/${id}/approval`, {
      method: 'PUT'
    })
      .then(res => {
        console.log('Comment will be published', res)
      })
      .catch(err => console.log('Error:', err))
    await this.props.listComments()
  }

  render() {
    return this.state.render ? (
      <div className='notify-item-comment'>
        <div className='notify-item-header'>
          {this.state.user[0].first_name} {this.state.user[0].last_name} made a
          comment about you:
        </div>
        <div className='notify-item-text'>{this.props.item.message}</div>
        <div className='button-group'>
          <button
            className='rect-button-no-hover-small'
            onClick={() => {
              this.handleAccept(this.props.item.id)
              this.props.handleUpdate(this.props.item.id)
            }}
          >
            Publish
          </button>
          <button
            className='rect-button-no-hover-small'
            onClick={() => {
              this.handleReject(this.props.item.id)
              this.props.handleUpdate(this.props.item.id)
            }}
          >
            Reject
          </button>
        </div>
        <div className='warning-text'>
          Warning! Rejection of comment will terminate your trust relationship
        </div>
      </div>
    ) : null
  }
}
