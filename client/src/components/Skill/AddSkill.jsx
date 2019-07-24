import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useState } from "react";

import React from "react";

function AddSkill(props) {
  const [lgShow, setLgShow] = useState(false);

  const addSkill = () => {
    const skill = document.getElementById("skill").value;
    const author = localStorage.getItem("id");
    const reciever = props.user;

    const data = {
      author: author,
      reciever: reciever,
      name: skill
    };

    fetch(`http://localhost:3000/skill`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log("new skill added"))
      .catch(error => console.log("Error:", error));
    setLgShow(false);
  };

  const renderButton = () => {
    const trusted = props.trust;
    if (trusted.length < 1) {
      return null;
    } else {
      if (trusted[0].active) {
        return <Button onClick={() => setLgShow(true)}>Add skill</Button>;
      } else {
        return null;
      }
    }
  };

  return (
    <ButtonToolbar>
      {props.user !==
      parseInt(
        localStorage.getItem("id") && localStorage.getItem("id") !== undefined
      )
        ? renderButton()
        : null}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Please add a skill that you recognize
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Skill</Form.Label>
              <Form.Control as="text" rows="5" id="skill" />
            </Form.Group>

            <Button variant="primary" onClick={addSkill}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </ButtonToolbar>
  );
}

export default AddSkill;
