import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignInOut from "./SignInOut";
import logo from "./logo.svg";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "test"
    };
  }

  ssearch = () => {
    console.log(this.state.search);
    fetch(
      `http://localhost:3000/users/search/${
        document.getElementById("search").value
      }`
    )
      .then(response => response.json())
      .then(data => {
        this.props.router.push("/");
        console.log(data);

        // this.setState({ skills: data });
      });
  };

  render() {
    return (
      <div className="header">
        <div className="left-header">
          <img
            className="header-logo"
            src={logo}
            alt="Logo"
            width="70px"
            height="70px"
            padding="50px"
            margin="50px"
          />
          <h2 className="banner">OpenTrust</h2>
        </div>
        <div className="right-header">
          <ul className="navlinks">
            <SignInOut class={{ classname: "rect-button-on-white" }} />
            
            {localStorage.getItem("id") ? null : (
              <Link className="linksss" to="/register">
                <button className="rect-button-on-white" variant="info">
                  Register
                </button>
              </Link>
            )}
          </ul>

        </div>
      </div>
    );
  }
}
