import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import React from 'react'

function AddComment(props) {
  const [lgShow, setLgShow] = useState(false)

  const sayhello = () => {
    const relation = document.getElementById('relation').value
    const message = document.getElementById('comment').value
    const author = localStorage.getItem('id')
    const reciever = props.user

    const data = {
      author: author,
      reciever: reciever,
      creationdate: new Date(),
      message: message,
      published: false,
      relationship: relation
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/comment`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => console.log('new comment added'))
      .catch(error => console.log('Error:', error))
    setLgShow(false)
  }

  const renderButton = () => {
    const trusted = props.trust
    if (trusted.length < 1) {
      return null
    } else {
      if (trusted[0].active) {
        return (
          <div className='add-button'>
            <button
              className='rect-button-on-white'
              style={{ width: '140px' }}
              onClick={() => setLgShow(true)}
            >
              Add a comment
            </button>
          </div>
        )
      } else {
        return null
      }
    }
  }

  return (
    <div>
      {props.user !== parseInt(localStorage.getItem('id'))
        ? renderButton()
        : null}

      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <div className='pop-up-header' closeButton>
          <h3>Please add a comment to recognize this user's success</h3>
        </div>
        <form className='add-form'>
          <p className={'form-name'}>How do you know this user?</p>
          <input
            type='text'
            placeholder='e.g. Colleagues. / Had a purchase. / I was her/his professor. etc.'
            id='relation'
          />
          <p className={'form-name'}>Comment:</p>
          <textarea
            className='comment-input'
            type='text'
            rows='5'
            id='comment'
            placeholder='Your comment here...'
          />
        </form>
        <button className='rect-button-on-white' onClick={sayhello}>
          Submit
        </button>
      </Modal>
    </div>
  )
}

export default AddComment
