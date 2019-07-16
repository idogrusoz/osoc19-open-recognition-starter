import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

export default class TrustedList extends Component {
  render() {
    return (
      <div>
        <Modal.Dialog bg="primary">
          <Modal.Header closeButton>
            <Modal.Title>Trusted List</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>1 Modal body text goes here.</p>
            <p>2 Modal body text goes here.</p>
            <p> 3 Modal body text goes here.</p>
            <p> 4Modal body text goes here.</p>
            <p>Modal body text goes here.</p>
            <p>Modal body text goes here.</p>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}
