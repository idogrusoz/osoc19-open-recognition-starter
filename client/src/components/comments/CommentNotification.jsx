import React, { Component } from 'react'
import CommentNotificationItem from './CommentNotificationItem'

export default class CommentNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }

  componentDidMount = async () => {
    const id = localStorage.getItem('id')
    await fetch(`http://localhost:3000/comments/${id}/pending`)
      .then(response => response.json())
      .then(data => {
        this.setState({ comments: data })
      })
      .catch(err => console.log('Error:', err))
  }

  handleUpdate = id => {
    const comments = this.state.comments
    console.log(comments, id)
    const newComments = comments.filter(comment => comment.id !== id)
    this.setState({ comments: newComments })
  }

  render() {
    return this.state.comments.map(comment => (
      <CommentNotificationItem
        key={comment.id}
        item={comment}
        handleUpdate={this.handleUpdate}
        listComments={this.props.listComments}
      />
    ))
  }
}
