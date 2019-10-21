import React from 'react'

function TrustRequestItem(props) {
  console.log(props.requestExists)
  return props.requestExists ? (
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
            props.handleAccept(props.item.id)
          }}
        >
          Accept
        </button>
        <button
          className='rect-button-no-hover-small'
          onClick={() => {
            props.handleReject(props.item.id)
          }}
        >
          Reject
        </button>
      </div>
    </div>
  ) : null
}

export default TrustRequestItem
