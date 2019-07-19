import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class SignInOut extends Component {
  signOut = () => {
    localStorage.removeItem("id");
    return <Redirect to="/" />;
  };

  render() {
    return localStorage.getItem("id") ? (
      <Button variant="outline-primary" onClick={this.signOut}>
        Sign-out
      </Button>
    ) : (
      <Button variant="outline-primary" onClick={this.signIn}>
        Sign-in
      </Button>
    );
  }
}
