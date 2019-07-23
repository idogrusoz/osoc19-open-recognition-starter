import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export default class TrustedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trustedpeople: [{}]
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("id") && typeof this.props.loc === "undefined") {
      fetch(`http://localhost:3000/trust/people/${localStorage.id}`)
        .then(res => res.json())
        .then(data => this.setState({ trustedpeople: data }));
    } else {
      fetch(`http://localhost:3000/trust/people/${this.props.loc}`)
        .then(res => res.json())
        .then(data => this.setState({ trustedpeople: data }));
    }
  };

  render() {
    return (
      <Card
        style={{ margin: "27px 0px 0px 0px", border: " solid 1px #d4bad8" }}
      >
        <Card.Body>
          <Card.Title>Trusted List</Card.Title>
          <Card.Text>
            {this.state.trustedpeople.map((x, i) => (
              <p key={i}>{x.first_name}</p>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
