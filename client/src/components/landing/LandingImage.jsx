import React, { Component } from "react";
import "../../App.css";
import SignInOut from "../header/SignInOut";
import { Link} from "react-router-dom";

class LandingImage extends Component {
  render() {
    return (
      <div className={"landing"}>
        <div className="text">
          <h1>
            <strong>Open Trust</strong>
          </h1>
          <h3>Trust is the key</h3>
          <p>
            Open Trust is a web app where your profile is made not by you
            but by the other people you trust.
          </p>
        </div>
        <div className={"buttons"}>
          <SignInOut class={{classname: "rect-button"}}/>
          {localStorage.getItem("id") ? null : (
            <Link className="linksss" to="/register">
              <button className={"rect-button"}>Register</button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default LandingImage;
