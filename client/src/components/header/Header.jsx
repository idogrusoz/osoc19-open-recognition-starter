import React from "react";
import { FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
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
          />
          <Button>Search</Button>
        </div>
      </div>
    </div>
  );
};
export default Header;
