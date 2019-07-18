import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export default class TrustedList extends Component {
  state = {
    trustedpeople: [{}]
  };
  componentDidMount = () => {
    fetch(`http://localhost:3000/trust/people/${localStorage.id}`)
      .then(res => res.json())
      .then(data => this.setState({ trustedpeople: data }));
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Text>
            <Card.Title>Trusted list:</Card.Title>
            {this.state.trustedpeople.map(x => (
              <p>{x.first_name}</p>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
