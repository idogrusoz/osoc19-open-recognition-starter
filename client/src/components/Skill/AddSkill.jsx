import React, { Component } from 'react'

export default class AddSkill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      givenSkill: '',
      textField: false
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  validateForm = () => {
    return this.state.givenSkill.length > 3
  }

  addSkill = () => {
    this.renderTextArea()
    const givenSkill = this.state.givenSkill
    this.props.addSkill(givenSkill)
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
            onClick={this.renderTextArea}
          >
            Add skill
          </button>
        </div>
        {this.state.textField ? (
          <div className='text-field'>
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
                onChange={this.handleChange}
              />
            </form>
            <button
              id='submitButton'
              className='rect-button-on-white'
              onClick={this.renderTextArea}
            >
              Cancel
            </button>
            <button
              id='submitButton'
              className='rect-button-on-white'
              onClick={this.addSkill}
            >
              Submit
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}
