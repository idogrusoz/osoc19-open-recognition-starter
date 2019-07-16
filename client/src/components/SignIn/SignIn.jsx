import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Header from "../header/Header";
import { compose } from "@material-ui/system";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      mistake: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm = () => {
    return this.state.login.length > 0 && this.state.password.length > 5;
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    let user = {}
    fetch(
      `http://localhost:3000/users/${this.state.login}/${this.state.password}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            console.log(data)
            const user = data;
            console.log(user[0].id)
            localStorage.setItem("id", `${user[0].id}`);
            history.push("/profile");
          });
        } else {
          this.setState({ mistake: true });
        }
      })

      .catch(err => console.log("Error:", err));
  };

  render() {
    return (
      <div>
        <Header />
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Login
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="string"
                name="login"
                placeholder="User Login"
                value={this.state.login}
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>
          <fieldset />

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                variant="outline-primary"
                type="submit"
                onClick={this.handleSubmit}
                disabled={!this.validateForm()}
              >
                Sign in
              </Button>
            </Col>
            <div>
              {this.state.mistake ? (
                <p style={{ color: "red" }}>*Incorrect Login or Password</p>
              ) : (
                <p />
              )}
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
