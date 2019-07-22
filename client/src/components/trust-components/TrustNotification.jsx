import React, { Component } from "react"
import TrustRequestItem from "./TrustRequestItem"

export default class TrustNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: localStorage.getItem("id"),
      users: []
    };
  }

  async componentDidMount() {
    const profile = window.location.pathname.split('/')
    const viewedProfile = profile[profile.length -1]
    if((this.state.id !== null) & (this.state.id === viewedProfile)){
    let newUsers = []
    await fetch(`http://localhost:3000/trust/pending/${this.state.id}`)
      .then(res => res.json())
      .then(data => {
        data.map(async item =>
          await fetch(`http://localhost:3000/users/${item.userrequesting}`)
            .then(res => res.json())
            .then(data => {
              newUsers.push(data[0])
              this.setState({users:newUsers})
            })
        );
      })
  }
}

  handleUpdate = (id) => {
    const users = this.state.users
    const newUsers = users.filter(user => user.id !== id)
    this.setState({ users: newUsers })
  }

  render() {
    return this.state.users.map(user => <TrustRequestItem key={user.id} item={user} handleUpdate={this.handleUpdate} />)
  }
}
