import React, { Component } from "react";
import { Form, Button, Col } from 'react-bootstrap'


export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      login: "",
      email: "",
      password: "",
      address: "",
      city: "",
      country: ""
    };
  }
  render() {
    return (
        <div className="form-outline">
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="string" placeholder="Your name here" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="string" placeholder="Your surname here" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Confirm Email</Form.Label>
            <Form.Control type="email" placeholder="Confirm your email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm your password" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Street, House Number" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Post Code</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Country</Form.Label>
            <Form.Control as="select">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        {/* <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button variant="outline-primary">Register</Button>
      </Form>
      </div>
    );
  }
}
