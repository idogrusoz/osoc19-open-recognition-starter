import React, { Component } from 'react'
import Profile from './Profile'
import Comments from './comments/Comments'
import TrustedList from './TrustedList'
import Header from './header/Header'
import Skills from './skill/Skills'
import CommentNotification from './comments/CommentNotification'
import TrustRequestItem from './trust-components/TrustRequestItem'
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
      `http://localhost:3000/users/searchresults/${username}`
    ).then(function(response) {
      return response.json()
    })
    this.setState({ name: fullName })

    this.listSkills()
    const comment = await fetch(
      `http://localhost:3000/comments/${this.state.name[0].id}`
    )
      .then(response => response.json())
      .then(data =>
        Promise.all(
          data.map(async user => {
            await fetch(`http://localhost:3000/users/${user.author}`)
              .then(res => res.json())
              .then(
                data2 => (
                  // eslint-disable-next-line no-sequences
                  (user.author = data2[0].first_name),
                  (user.login = data2[0].login)
                )
              )
            return user
          })
        )
      )

    this.setState({ comments: comment })
    await fetch(`http://localhost:3000/trusts/${this.state.name[0].id}/people`)
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
        `http://localhost:3000/trusts/${viewingUser}/relationship/${viewedProfile}`
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
    await fetch(`http://localhost:3000/trusts/${this.state.name[0].id}/pending`)
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
    await fetch(`http://localhost:3000/trusts/${this.state.name[0].id}/people`)
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
    await fetch(`http://localhost:3000/trusts/${id}/approval`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => console.log('Trust request is approved', res))
      .catch(err => console.log('Error:', err))
    this.getTrustPending()
    this.setState({ users: [{}] })
  }

  handleReject = async () => {
    const id1 = localStorage.getItem('id')
    const id2 = this.state.users[0].id
    await fetch(`http://localhost:3000/trusts/${id1}/rejection/${id2}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => console.log('Trust request rejected:', res))
      .catch(err => console.log('Error:', err))

    this.getTrustPending()
    this.setState({ users: [{}] })
  }

  searchFn = async username => {
    this.props.history.push(`/profile/${username}`)
    const fullName = await fetch(
      `http://localhost:3000/users/searchresults/${username}`
    ).then(function(response) {
      return response.json()
    })
    this.setState({ name: fullName })

    this.listSkills()
    this.listComments()
    await fetch(`http://localhost:3000/trusts/${this.state.name[0].id}/people`)
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
        `http://localhost:3000/trusts/${viewingUser}/relationship/${viewedProfile}`
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
    await fetch(`http://localhost:3000/skills/${this.state.name[0].id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ skills: data })
        let pro = []
        data.map(item =>
          fetch(
            `http://localhost:3000/skills/${this.state.name[0].id}/pros/${item.name}`
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

  listComments = async () => {
    const comment = await fetch(
      `http://localhost:3000/comments/${this.state.name[0].id}`
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
  }

  addSkill = async skill => {
    const author = localStorage.getItem('id')
    const reciever = this.state.name[0].id

    const data = {
      author: author,
      reciever: reciever,
      name: skill
    }

    await fetch(`http://localhost:3000/skills`, {
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

  giveTrust = async skillName => {
    document.getElementById(skillName).disabled = 'disabled'
    const data = {
      name: skillName,
      author: localStorage.getItem('id'),
      reciever: this.state.name[0].id
    }

    await fetch(`http://localhost:3000/skills/`, {
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

  updateTrustList = async () => {
    await fetch(`http://localhost:3000/trusts/${this.state.name[0].id}/people`)
      .then(res => res.json())
      .then(data => this.setState({ trustedpeople: data }))
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
      <div className='top'>
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
              trustRelation={this.state.trustRelation}
              updateTrustList={this.updateTrustList}
            />
            <Skills
              skills={this.state.skills}
              loc={this.state.name[0].id}
              pros={this.state.pros}
              trustRelation={this.state.trustRelation}
              addSkill={this.addSkill}
              giveTrust={this.giveTrust}
            />
          </div>
          <div className='center-column'>
            {this.state.name[0].id === parseInt(localStorage.getItem('id')) ? (
              <CommentNotification listComments={this.listComments} />
            ) : null}
            <Comments
              comments={this.state.comments}
              loc={this.state.name[0].id}
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
                    handleAccept={this.handleAccept}
                    handleReject={this.handleReject}
                  />
                ))
              : null}
            <TrustedList trustedpeople={this.state.trustedpeople} />
          </div>
        </div>
      </div>
    )
  }
}

export default View
