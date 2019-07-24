import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useState } from "react";

import React from "react";

function Example(props) {
  const [lgShow, setLgShow] = useState(false);

  const sayhello = () => {
    const relation = document.getElementById("relation").value;
    const message = document.getElementById("comment").value;
    const author = localStorage.getItem("id");
    const reciever = props.user;

    const data = {
      author: author,
      reciever: reciever,
      creationdate: new Date(),
      message: message,
      published: false,
      relationship: relation
    };

    fetch(`http://localhost:3000/comment`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("new comment added"))
      .catch(error => console.log("Error:", error));
    setLgShow(false);
  };

  return (
    <ButtonToolbar>
      <Button variant="info" onClick={() => setLgShow(true)}>
        Add comment
      </Button>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Add your comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Relationship between you 2 :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Relationship"
                id="relation"
              />
              <Form.Label>Your comment :</Form.Label>
              <Form.Control as="textarea" rows="5" id="comment" />
            </Form.Group>

            <Button variant="primary" onClick={sayhello}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </ButtonToolbar>
  );
}

export default Example;
