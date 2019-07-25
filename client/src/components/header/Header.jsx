import React, { Component } from "react";
import { Button, FormControl } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
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
        <div className="nav">
          <img
            src={logo}
            alt="Logo"
            width="70px"
            height="70px"
            padding="50px"
            margin="50px"
          />

          <div className="searchdiv">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              id="search"
            />
            {/* <Button onClick={this.ssearch}>Search</Button> */}

            <Route
              render={({ history }) => (
                <Button
                  variant="info"
                  type="button"
                  onClick={() => {
                    fetch(
                      `http://localhost:3000/users/search/${
                        document.getElementById("search").value
                      }`
                    )
                      .then(response => response.json())
                      .then(data => {
                        history.push(`/profile/${data[0].id}`);
                      });
                  }}
                >
                  Search
                </Button>
              )}
            />
          </div>

          <div className="menu">
            <ul className="navlinks">
              <SignInOut />

              {localStorage.getItem("id") ? null : (
                <Link className="linksss" to="/register">
                  <Button variant="info">Register</Button>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
