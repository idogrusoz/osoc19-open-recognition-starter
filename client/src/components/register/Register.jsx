import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Header from "../header/Header";
// import { writer } from "repl";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      login: "",
      password:""
      // picture: ""
    };

  }

  validateForm = () => {
    return (
      this.state.first_name.length > 2 &&
      this.state.last_name.length > 2 &&
      this.state.login.length > 0 &&
      this.state.password.length > 5
    );
  };

  handleSubmit = () => {
    const data = this.state;
    const { history } = this.props;
    console.log(data);
    fetch("http://localhost:3000/users/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log("A new user added")
        history.push("/signin");
      })
      .catch(error => console.log("Error:", error));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // handlePicture = () => {
  //   console.log(1)
  //   const newFile = document.getElementById("formGridPicture").files
  //   console.log(newFile[0])
  //   const fileWriter = new write
  //   // const formData = new FormData()
  //   // formData.append('picture', pic, ``)
  // }

  render() {
    return (
      <div>
        <Header />
        <div className="form-outline">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="first_name"
                  type="string"
                  placeholder=""
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="last_name"
                  type="string"
                  placeholder=""
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
{/* 
            <Form.Row>
            <Form.Group as={Col} controlId="formGridPicture">
                <Form.Label>Choose a profile photo</Form.Label>
                <Form.Control
                  name="picture"
                  type="file"
                  placeholder=""
                  onChange={this.handlePicture}
                />
              </Form.Group>

            </Form.Row> */}

            <Form.Row>
              <Form.Group as={Col} controlId="formGridLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control
                  name="login"
                  type="string"
                  placeholder="Choose a username"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Minimum 5 characters"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            {/* <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Confirm Email</Form.Label>
              <Form.Control type="email" placeholder="Confirm your email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
              />
            </Form.Group>
          </Form.Row> */}

            <Button
              variant="outline-primary"
              onClick={this.handleSubmit}
              disabled={!this.validateForm()}
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
