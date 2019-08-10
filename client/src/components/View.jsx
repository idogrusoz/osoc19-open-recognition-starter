import React, { Component } from 'react'
import Profile from './Profile'
import Comments from './comments/Comments'
import TrustedList from './TrustedList'
// import TrustNotification from "./trust-components/TrustNotification";
// import { useState } from "react";
import Header from '../components/header/Header'
import Skills from './Skill/skills'
import CommentNotification from './comments/CommentNotification'
import TrustRequestItem from '../components/trust-components/TrustRequestItem'
import Search from './search/Search'

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loc: localStorage.getItem('id'),
      trustRelation: [],
      name: [{}],
      skills: [{}],
      pros: [],
      comments: [{}],
      trustedpeople: [{}],
      users: [{}],
      test: [1, 2, 3],
      width: ''
    }
  }
  componentWillMount = () => {
    this.getTrustPending()
  }

  componentDidMount = async () => {
    this.checkSize()
    window.addEventListener('resize', this.checkSize)
    const path = this.props.location.pathname.split('/')
    const username = path[path.length - 1]
    const fullName = await fetch(
      `http://localhost:3000/users/search/${username}`
    ).then(function(response) {
      return response.json()
    })
    this.setState({ name: fullName })

    this.listSkills()
    const comment = await fetch(
      `http://localhost:3000/comment/${this.state.name[0].id}`
    )
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map(async x => {
            await fetch(`http://localhost:3000/users/${x.author}`)
              .then(res => res.json())
              .then(
                data2 => (
                  (x.author = data2[0].first_name), (x.login = data2[0].login)
                )
              )
            return x
          })
        )
      )

    this.setState({ comments: comment })
    await fetch(`http://localhost:3000/trust/people/${this.state.name[0].id}`)
      .then(res => res.json())
      .then(data => this.setState({ trustedpeople: data }))

    if (
      localStorage.getItem('id') !== null &&
      this.state.name[0].id !== localStorage.getItem('id') &&
      this.state.name[0].id !== 'profile'
    ) {
      const viewingUser = parseInt(localStorage.getItem('id'))
      const viewedProfile = parseInt(this.state.name[0].id)
      await fetch(
        `http://localhost:3000/trust/relationship/${viewedProfile}/${viewingUser}`
      )
        .then(response => response.json())
        .then(data => {
          this.setState({ trustRelation: data })
        })
    }
    if (this.state.name[0].id === parseInt(localStorage.getItem('id'))) {
      this.setState({
        connected: this.state.name[0].id
      })
    }

    this.getTrustPending()
  }

  getTrustPending = async () => {
    let newUsers = []
    await fetch(`http://localhost:3000/trust/pending/${this.state.name[0].id}`)
      .then(res => res.json())
      .then(data =>
        Promise.all(
          data.map(
            async item =>
              await fetch(`http://localhost:3000/users/${item.userrequesting}`)
                .then(res => res.json())
                .then(data => {
                  newUsers.push(data[0])
                  this.setState({ users: newUsers })
                })
          )
        )
      )
    await fetch(`http://localhost:3000/trust/people/${this.state.name[0].id}`)
      .then(res => res.json())
      .then(data => this.setState({ trustedpeople: data }))
  }

  handleAccept = async () => {
    const dateApproving = new Date()
    const id = localStorage.getItem('id')
    const data = {
      userrequesting: `${this.state.users[0].id}`,
      userrecieving: parseInt(id),
      dateapproving: dateApproving
    }
    await fetch(`http://localhost:3000/trust/approve/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => console.log('Trust request is approved', res))
      .catch(err => console.log('Error:', err))

    this.getTrustPending()
    this.setState({ users: [{}] })
  }

  searchFn = async username => {
    this.props.history.push(`/profile/${username}`)
    const fullName = await fetch(
      `http://localhost:3000/users/search/${username}`
    ).then(function(response) {
      return response.json()
    })
    this.setState({ name: fullName })

    this.listSkills()
    const comment = await fetch(
      `http://localhost:3000/comment/${this.state.name[0].id}`
    )
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map(async x => {
            await fetch(`http://localhost:3000/users/${x.author}`)
              .then(res => res.json())
              .then(
                data2 => (
                  // eslint-disable-next-line no-sequences
                  (x.author = data2[0].first_name), (x.login = data2[0].login)
                )
              )
            return x
          })
        )
      )

    this.setState({ comments: comment })
    await fetch(`http://localhost:3000/trust/people/${this.state.name[0].id}`)
      .then(res => res.json())
      .then(data => this.setState({ trustedpeople: data }))

    if (
      localStorage.getItem('id') !== null &&
      this.state.name[0].id !== localStorage.getItem('id') &&
      this.state.name[0].id !== 'profile'
    ) {
      const viewingUser = parseInt(localStorage.getItem('id'))
      const viewedProfile = parseInt(this.state.name[0].id)
      await fetch(
        `http://localhost:3000/trust/relationship/${viewedProfile}/${viewingUser}`
      )
        .then(response => response.json())
        .then(data => this.setState({ trustRelation: data }))
    }

    if (this.state.name[0].id === parseInt(localStorage.getItem('id'))) {
      this.setState({
        connected: this.state.name[0].id
      })
    }
  }

  listSkills = async () => {
    await fetch(`http://localhost:3000/skill/${this.state.name[0].id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ skills: data })
        let pro = []
        data.map(item =>
          fetch(
            `http://localhost:3000/skill/pros/${this.state.name[0].id}/${
              item.name
            }`
          )
            .then(response => response.json())
            .then(data => {
              pro.push(data[0].count)
              this.setState({
                pros: pro
              })
            })
        )
      })
  }

  addSkill = async () => {
    const skill = document.getElementById('skill').value
    const author = localStorage.getItem('id')
    const reciever = this.state.name[0].id

    const data = {
      author: author,
      reciever: reciever,
      name: skill
    }

    await fetch(`http://localhost:3000/skill`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res)
      .catch(error => console.log('Error:', error))
    await this.listSkills()
  }

  givetrust = async trust => {
    console.log(`hello ${trust}`)
    document.getElementById(trust).disabled = 'disabled'
    const data = {
      name: trust,
      author: localStorage.getItem('id'),
      reciever: this.state.name[0].id
    }

    await fetch(`http://localhost:3000/skill/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res)
      .catch(error => console.log('Error:', error))
    this.listSkills()
  }

  checkSize = () => {
    if (window.innerWidth < 769) {
      this.setState({ width: 'mobile' })
    } else {
      this.setState({ width: 'no mobile' })
    }
  }

  render() {
    return (
      <div className='tout'>
        <Header searchFn={this.searchFn} width={this.state.width} />
        <div className='view-body'>
          <div className='left-column'>
            {this.state.width === 'mobile' ? (
              <div className='mobile-search'>
                <Search searchFn={this.searchFn} className='search-bar' />
              </div>
            ) : null}
            <Profile
              name={this.state.name}
              // id={this.state.loc}
              trustRelation={this.state.trustRelation}
            />
            <Skills
              skills={this.state.skills}
              loc={this.state.name[0].id}
              pros={this.state.pros}
              trustRelation={this.state.trustRelation}
              addSkill={this.addSkill}
              givetrust={this.givetrust}
            />
          </div>
          <div className='center-column'>
            {this.state.name[0].id === localStorage.getItem('íd') ? (
              <CommentNotification />
            ) : null}
            <Comments
              comments={this.state.comments}
              loc={this.state.loc}
              trustRelation={this.state.trustRelation}
            />
          </div>
          <div className='right-column'>
            {this.state.name[0].id === parseInt(localStorage.getItem('id')) &&
            Object.getOwnPropertyNames(this.state.users[0]).length > 0
              ? this.state.users.map((user, i) => (
                  <TrustRequestItem
                    key={i}
                    item={user}
                    // handleUpdate={this.handleUpdate}
                    handleAccept={this.handleAccept}
                  />
                ))
              : null}
            <TrustedList
              trustedpeople={this.state.trustedpeople}
              // loc={this.state.loc}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default View
