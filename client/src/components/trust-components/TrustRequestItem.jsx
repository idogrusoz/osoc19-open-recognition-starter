import React from 'react'

function TrustRequestItem(props) {
  const handleReject = async () => {
    const id1 = localStorage.getItem('id')
    const id2 = props.item.id

    await fetch(`http://localhost:3000/trust/reject/${id1}/${id2}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log('Trust request is rejected', res)
      })
      .catch(err => console.log('Error:', err))
  }

  return (
    <div className='notify-item'>
      <div className='notify-text'>
        <a href={`${props.item.login}`}>
          <p>
            {props.item.first_name} {props.item.last_name} trusts you
          </p>
        </a>
      </div>
      <div className='button-group'>
        <button
          className='rect-button-no-hover-small'
          onClick={() => {
            props.handleAccept()
          }}
        >
          Accept
        </button>
        <button
          className='rect-button-no-hover-small'
          onClick={() => {
            handleReject()
            props.handleUpdate(props.item.id)
          }}
        >
          Reject
        </button>
      </div>
    </div>
  )
}

export default TrustRequestItem
