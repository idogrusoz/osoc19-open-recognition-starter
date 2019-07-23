import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

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
      <div>
        <Modal.Dialog bg="primary">
          <Modal.Header closeButton>
            <Modal.Title>Trusted List</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.state.trustedpeople.map((x, i) => (
              <p key={i}>
                <a href={`/profile/${x.id}`}>{x.first_name}</a>
              </p>
            ))}
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}
