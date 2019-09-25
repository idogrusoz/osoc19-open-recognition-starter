import React, { Component } from 'react'

export default class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      relation: '',
      comment: '',
      textField: false
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  validateForm = () => {
    return this.state.relation.length > 3 && this.state.comment.length > 5
  }

  submitComment = event => {
    this.renderTextArea()
    const relation = this.state.relation
    const comment = this.state.comment
    const author = localStorage.getItem('id')
    const reciever = this.props.user

    const data = {
      author: author,
      reciever: reciever,
      creationdate: new Date(),
      message: comment,
      published: false,
      relationship: relation
    }

    fetch(`http://localhost:3000/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => console.log('new comment added'))
      .catch(error => console.log('Error:', error))
  }

  renderTextArea = () => {
    this.setState({ textField: !this.state.textField })
  }

  render() {
    return (
      <div>
        <div className='add-button'>
          <button
            className='rect-button-on-white'
            style={{ width: '140px' }}
            onClick={this.renderTextArea}
          >
            Add a comment
          </button>
        </div>
        {this.state.textField ? (
          <div className='text-field'>
            <div className='pop-up-header'>
              <h3>Please add a comment to recognize this user's success</h3>
            </div>
            <form className='add-form'>
              <p className={'form-name'}>How do you know this user?</p>
              <input
                type='text'
                placeholder='e.g. Colleagues. / Had a purchase. / I was her/his professor. etc.'
                name='relation'
                onChange={this.handleChange}
              />
              <p className={'form-name'}>Comment:</p>
              <textarea
                className='comment-input'
                type='text'
                rows='5'
                name='comment'
                placeholder='Your comment here...'
                onChange={this.handleChange}
              />
            </form>
            <div className='add-comment-buttons'>
              <button
                className='rect-button-on-white'
                onClick={this.renderTextArea}
              >
                Cancel
              </button>
              <button
                className='rect-button-on-white'
                onClick={this.submitComment}
                disabled={!this.validateForm()}
              >
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
