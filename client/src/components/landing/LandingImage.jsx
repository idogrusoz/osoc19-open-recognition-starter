import React, { Component } from "react";
import "../../App.css";
import image from "./img2.jpg";
import Card from "react-bootstrap/Card";

class LandingImage extends Component {
  render() {
    return (
      <Card className="text-white text-center ">
        <Card.Img src={image} alt="Card image" className="ta" />
        <Card.ImgOverlay>
          <Card.Text className="centered-text">
            <h2>
              <strong>Open Recognition</strong>
            </h2>
            <h4>Trust is the key</h4>
            Open Recognition is a web app where your profile is made not by you
            but by the other people you trust
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    );
  }
}

export default LandingImage;
