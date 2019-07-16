
import React, { Component } from 'react'
import { FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignInOut from "./SignInOut"
 
export default class Header extends Component {
  render(){
    return (
      <div className="header">
        <div className="nav">
          <div className="ilogo">
            <span>Logo Here</span>

          </div>
          <div className="sera">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              id="search"

            />
            <Button>Search</Button>
          </div>
          <div className="menu">
            <ul className="navlinks">
              {/* <Link className="linksss" to="/login"> */}
                <SignInOut />
              {/* </Link> */}
              <Link className="linksss" to="/register">
                <li>Register</li>
              </Link>
            </ul>

          </div>
        </div>
      </div>
    );
  }
}


