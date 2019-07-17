import React, { Component } from "react";
import "../../App.css";
import image from './img2.jpg'

export default class LandingImage extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-container">
          <img
            src={image}
            className="background-image"
            alt=""
          />
          <div className="centered-text">
            <h1>
              <strong>Open Recognition</strong>
            </h1>
            <h2>Trust is the key</h2>

            <p>
              Open Recognition is a web app where your profile is made not by
              you but by the other people you trust
            </p>
          </div>
        </div>
      </div>
    );
  }
}
