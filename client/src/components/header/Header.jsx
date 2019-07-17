import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import SignInOut from "./SignInOut";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="nav">
          <div className="ilogo">
            <span>Logo Here</span>
          </div>

          <div className="menu">
            <ul className="navlinks">
              <Link className="linksss" to="/signin">
                <SignInOut />
              </Link>

              {localStorage.getItem("id") ? (
                <div />
              ) : (
                <Link className="linksss" to="/register">
                  <Button variant="outline-primary">Register</Button>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
