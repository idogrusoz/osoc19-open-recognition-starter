import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'

import React from 'react'

function AddSkill(props) {
  const [lgShow, setLgShow] = useState(false)

  const addSkill = () => {
    props.addSkill()
    setLgShow(false)
  }

  return (
    <div>
      <div className='add-button'>
        <button
          className='rect-button-on-white'
          onClick={() => setLgShow(true)}
        >
          Add skill
        </button>
      </div>

      <Modal
        size='lg'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <div className='pop-up-header'>
          <h3>Please add a skill that you recognise</h3>
        </div>

        <form className='add-form'>
          <p className={'form-name'}>Skill:</p>
          <input
            type='text'
            rows='1'
            id='skill'
            placeholder='e.g. Team player. / Honest reseller etc.'
            // onChange= {handleChange}
          />
        </form>

        <button
          id='submitButton'
          className='rect-button-on-white'
          onClick={addSkill}
        >
          Submit
        </button>
      </Modal>
    </div>
  )
}

export default AddSkill
