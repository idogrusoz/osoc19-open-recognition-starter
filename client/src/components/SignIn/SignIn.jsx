import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Header from "../header/Header";
import Card from "react-bootstrap/Card";
import image from "./baner.jpg";

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
            const user = data;
            localStorage.setItem("id", `${user[0].id}`);
            history.push(`/profile/${user[0].id}`);
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
        <Card>
          <Header />
          <Card.Body>
            <Card.Img variant="bottom" src={image} />

            <Card.ImgOverlay>
              <Row>
                <Form style={{ margin: "50px 50px" }}>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column>Login</Form.Label>
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
                    <Form.Label column>Password</Form.Label>
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
                      <div>
                        {this.state.mistake ? (
                          <p style={{ color: "red" }}>
                            *Incorrect Login or Password
                          </p>
                        ) : (
                          <p />
                        )}
                      </div>
                      <Button
                        variant="info"
                        type="submit"
                        onClick={this.handleSubmit}
                        disabled={!this.validateForm()}
                      >
                        Sign in
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Row>
            </Card.ImgOverlay>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
