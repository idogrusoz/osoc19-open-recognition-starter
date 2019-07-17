import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

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
      <div>
        <Modal.Dialog bg="primary">
          <Modal.Header closeButton>
            <Modal.Title>Trusted List</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.state.trustedpeople.map(x => (
              <p>{x.first_name}</p>
            ))}
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}
