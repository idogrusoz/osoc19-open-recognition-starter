import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Skill from "../Skill/skills";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      search: "test"
    };
  }

  ssearch = () => {
    fetch(`http://localhost:3000/users/search/${this.state.search}`)
      .then(response => response.json())
      .then(data => {
        this.props.history.push("/search");
        console.log(data);
        // this.setState({ skills: data });
      });
  };

  loginhandle = e => {
    this.setState({
      search: e.target.value
    });
  };

  render() {
    return (
      <div className="header">
        <div className="nav">
          <div className="menu">
            <ul className="navlinks">
              <Link className="linksss" to="/login">
                <li>Login</li>
              </Link>
              <Link className="linksss" to="/register">
                <li>Register</li>
              </Link>
            </ul>
          </div>
          <div className="sera">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              id="search"
              onChange={this.loginhandle}
            />
            <Button onClick={this.ssearch}>Search</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
