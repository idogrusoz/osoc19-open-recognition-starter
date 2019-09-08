import React, { Component } from 'react'
import AddSkill from './AddSkill'

class Skills extends Component {
  constructor(props) {
    super(props)

    this.renderButton = this.renderButton.bind(this)
  }
  getnames = list => {
    let names = []
    list.map(item => names.push(item.name))
    return names
  }

  verifications = () =>
    localStorage.getItem('id') &&
    localStorage.getItem('id') !== this.props.loc &&
    this.props.trustRelation.length > 0 &&
    this.props.trustRelation[0].active === true
      ? true
      : false

  renderButton = item => {
    let skillsList = []
    fetch(`http://localhost:3000/skills/${this.props.loc}/nomultiple`)
      .then(response => response.json())
      .then(data => (skillsList = data))
      .then(() => {
        skillsList.forEach(skill => {
          if (
            trusted.length > 0 &&
            skill.name === item.name &&
            skill.author === parseInt(localStorage.getItem('id'))
          ) {
            document.getElementById(item.name).disabled = 'disabled'
          }
        })
      })
    const trusted = this.props.trustRelation
    if (trusted.length < 1) {
      return null
    } else {
      if (trusted[0].active) {
        return (
          <button
            id={item.name}
            title='Click to recognise this skill'
            className='upvote'
            onClick={() => this.props.giveTrust(item.name)}
          >
            {' '}
            +
          </button>
        )
      } else {
        return null
      }
    }
  }

  render() {
    return (
      <div className='skills'>
        <div className='skills-body'>
          <div className='part-header'>
            <h3>Skills</h3>
          </div>
          <div className='skill-list'>
            {this.props.skills.map((item, i) => (
              <div className='skill-item' key={i}>
                <p className='skill-item-name'>{item.name}</p>
                <div className='skill-info'>
                  <div className='ïtem-count'>Upvote:</div>{' '}
                  <div className='number'>{item.count}</div>
                  <br />
                  <div className='ïtem-count'>Recognized by pro:</div>
                  <div className='number'>{this.props.pros[i]}</div>
                  {this.verifications() ? this.renderButton(item) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        {this.verifications() ? (
          <AddSkill
            trust={this.props.trustRelation}
            user={this.props.loc}
            addSkill={this.props.addSkill}
          />
        ) : null}
      </div>
    )
  }
}
export default Skills
