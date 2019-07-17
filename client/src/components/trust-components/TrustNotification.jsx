import React, { Component } from "react";
import TrustRequestItem from "./TrustRequestItem";
// import { Card } from "react-bootstrap";

export default class TrustNotification extends Component {
  constructor() {
    super();
    this.state = {
      id: localStorage.getItem("id"),
      users: []
    };
  }

  async componentDidMount() {
    let newUsers = [];
    await fetch(`http://localhost:3000/trust/pending/${this.state.id}`)
      .then(res => res.json())
      .then(data => {
        data.map(async item =>
          await fetch(`http://localhost:3000/users/${item.userrequesting}`)
            .then(res => res.json())
            .then(data => {
              newUsers.push(data[0]);
              this.setState({users:newUsers})
            })
        );
      })
  }

  render() {
    return this.state.users.map(user => <TrustRequestItem item={user} />);
  }
}
