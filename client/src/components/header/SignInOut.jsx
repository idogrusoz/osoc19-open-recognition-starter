import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

export default class SignInOut extends Component {
  signOut = () => {
    localStorage.removeItem("id");
    return <Redirect to="/" />;
  };
  signOut = () => {
    localStorage.removeItem("id");
  };

  render() {
    return localStorage.getItem("id") ? (
      <Link to="/">
        <Button variant="info" onClick={this.signOut}>

          Sign-out
        </Button>
      </Link>
    ) : (
      <Link to="/signin">
        <Button variant="info" onClick={this.signIn}>
          Sign-in
        </Button>
      </Link>
    );
  }
}
