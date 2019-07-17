import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class TrustNotification extends Component {
  constructor() {
    super();
    this.state = {
      id: localStorage.getItem("id"),
      requests: [{}]
    };
  }

  componentDidMount() {
      fetch(`http://localhost:3000/trust/pending/${this.state.id}`,{
        method:"GET",
        headers: { "Content-Type": "application/json" }
  }).then(res => res.json())
    .then(data => {
      this.setState({ requests:data })
    })
  }

  render() {
    return this.state.requests.map(request => (  
    <Card >Hello trust</Card> 
    ))
  }
}
