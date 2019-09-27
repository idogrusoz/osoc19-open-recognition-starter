import React, { Component } from 'react'
import Profile from './Profile'
import Comments from './comments/Comments'
import TrustedList from './TrustedList'
import Header from './header/Header'
import Skills from './skill/Skills'
import CommentNotification from './comments/CommentNotification'
import TrustRequestItem from './trust-components/TrustRequestItem'
import Search from './search/Search'
import API from '../api/api'

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loc: localStorage.getItem('id'),
      trustRelation: [{}],
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
    await API.get(`users/searchresults/${username}`)
      .then(res => res.data)
      .then(data => this.setState({ name: data }))

    this.listSkills()
    this.listComments()

    await API.get(`trusts/${this.state.name[0].id}/people`)
      .then(res => res.data)
      .then(data => this.setState({ trustedpeople: data }))

    if (
      localStorage.getItem('id') !== null &&
      this.state.name[0].id !== localStorage.getItem('id') &&
      this.state.name[0].id !== 'profile'
    ) {
      const viewingUser = parseInt(localStorage.getItem('id'))
      const viewedProfile = parseInt(this.state.name[0].id)
      await API.get(`trusts/${viewingUser}/relationship/${viewedProfile}`)
        .then(res => res.data)
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

  listComments = async () => {
    let commentsArray = []
    await API.get(`comments/${this.state.name[0].id}`)
      .then(res => res.data)
      .then(data => {
        // Promise.all(
        data.map(async commentItem => {
          await API.get(`users/${commentItem.author}`)
            .then(res => res.data)
            .then(
              data => (
                // eslint-disable-next-line no-sequences
                (commentItem.author = data[0].first_name),
                (commentItem.login = data[0].login)
              )
            )
          commentsArray.push(commentItem)
        })
        // )
      })
      .then(this.setState({ comments: commentsArray }))
  }

  getTrustPending = async () => {
    let newUsers = []
    await API.get(`trusts/${this.state.name[0].id}/pending`)
      .then(res => res.data)
      .then(data =>
        data.map(
          async item =>
            await API.get(`users/${item.userrequesting}`)
              .then(res => res.data)
              .then(data => {
                newUsers.push(data[0])
              })
        )
      )
      .then(this.setState({ users: newUsers }))

    await API.get(`trusts/${this.state.name[0].id}/people`)
      .then(res => res.data)
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
    await API.put(`trusts/${id}/approval`, { data })
      .then(res => console.log('Trust request is approved', res))
      .catch(err => console.log('Error:', err))
    this.getTrustPending()
    this.setState({ users: [{}] })
  }

  handleReject = async () => {
    const id1 = localStorage.getItem('id')
    const id2 = this.state.users[0].id
    await API.delete(`trusts/${id1}/rejection/${id2}`)
      .then(res => console.log('Trust request rejected:', res))
      .catch(err => console.log('Error:', err))

    this.getTrustPending()
    this.setState({ users: [{}] })
  }

  searchFn = async username => {
    this.props.history.push(`/profile/${username}`)
    await API.get(`users/searchresults/${username}`)
      .then(function(response) {
        return response.data
      })
      .then(data => this.setState({ name: data }))
      .then(data => console.log(data))

    this.listSkills()
    this.listComments()
    await API.get(`trusts/${this.state.name[0].id}/people`).then(res =>
      this.setState({ trustedpeople: res.data })
    )

    if (
      localStorage.getItem('id') !== null &&
      this.state.name[0].id !== localStorage.getItem('id') &&
      this.state.name[0].id !== 'profile'
    ) {
      const viewingUser = parseInt(localStorage.getItem('id'))
      const viewedProfile = parseInt(this.state.name[0].id)
      await API.get(`trusts/${viewingUser}/relationship/${viewedProfile}`)
        .then(res => res.data)
        .then(data => this.setState({ trustRelation: data }))
    }

    if (this.state.name[0].id === parseInt(localStorage.getItem('id'))) {
      this.setState({
        connected: this.state.name[0].id
      })
    }
  }

  listSkills = async () => {
    let pro = []
    if (this.state.name[0].id === undefined) {
      console.log(1111)
      this.listSkills()
    } else {
      await API.get(`skills/${this.state.name[0].id}`)
        .then(res => res.data)
        .then(data => {
          this.setState({ skills: data })
          data.map(item =>
            API.get(`skills/${this.state.name[0].id}/pros/${item.name}`).then(
              response => {
                pro.push(response.data[0].count)
                this.setState({
                  pros: pro
                })
              }
            )
          )
        })
    }
  }

  listComments = async () => {
    const comment = await API.get(`comments/${this.state.name[0].id}`).then(
      response =>
        Promise.all(
          response.data.map(async x => {
            await API.get(`users/${x.author}`).then(
              res => (
                // eslint-disable-next-line no-sequences
                (x.author = res.data[0].first_name),
                (x.login = res.data[0].login)
              )
            )
            return x
          })
        )
    )

    this.setState({ comments: comment })
  }

  addSkill = async skill => {
    const author = parseInt(localStorage.getItem('id'))
    const reciever = this.state.name[0].id

    const data = {
      name: skill,
      author: author,
      reciever: reciever
    }

    await API.post(`skills`, { data })
      .then(res => console.log(res))
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

    await API.post(`skills/`, { data })
      .then(res => res)
      .catch(error => console.log('Error:', error))
    this.listSkills()
  }

  updateTrustList = async () => {
    await API.get(`trusts/${this.state.name[0].id}/people`).then(res =>
      this.setState({ trustedpeople: res.data })
    )
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
            (this.state.users[0] !== undefined &&
              this.state.users[0].hasOwnProperty('id'))
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
