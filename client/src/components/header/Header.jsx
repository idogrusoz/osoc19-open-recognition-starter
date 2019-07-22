import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignInOut from "./SignInOut";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "test"
    };
  }

  ssearch = () => {
    console.log(this.state.search);
    fetch(`http://localhost:3000/users/search/${this.state.search}`)
      .then(response => response.json())
      .then(data => {
        this.props.history.push("/search");
        console.log(data);

        // this.setState({ skills: data });
      });
  };

  render() {
    return (
      <div className="header">
        <div className="nav">
          <div className="ilogo">
            <span>Logo Here</span>
          </div>
          {/* <div className="sera">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                id="search"
              />
              <Button onClick={this.ssearch}>Search</Button>
            </div> */}

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
