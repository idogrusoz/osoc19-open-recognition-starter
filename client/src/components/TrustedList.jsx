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
        style={{
          WebkitBoxShadow: "37px -23px 29px -6px rgba(29,117,47,0.58)",
          MozBoxShadow: "37px -23px 29px -6px rgba(29,117,47,0.58)",
          boxShadow: "37px -23px 29px -6px rgba(29,117,47,0.58)"
        }}
      >
        <Card.Body>
          <Card.Title>Trusted By :</Card.Title>

          {this.state.trustedpeople.map((x, i) => (
            <div key={i}>
              <a href={`/profile/${x.id}`}>{x.first_name}</a>
              <br />
            </div>
          ))}
        </Card.Body>
      </Card>
    );
  }
}
