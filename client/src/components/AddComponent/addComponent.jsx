import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class AddComment extends Component {
  state = {};
  render() {
    return (
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Add comment</Form.Label>
        <Form.Control as="textarea" rows="3" />
        <Button type="submit">Add comment</Button>
      </Form.Group>
    );
  }
}

export default AddComment;
