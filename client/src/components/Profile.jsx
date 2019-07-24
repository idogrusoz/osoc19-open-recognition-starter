import React, { Component } from "react";
import TrustButton from "./trust-components/TrustButton";
import Image from "react-bootstrap/Image";
import { Card, Button } from "react-bootstrap";
import TrustedLogo from "./trust-components/TrustedLogo";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [{}],
      path: window.location.pathname.split("/")
    };
  }
  async componentDidMount() {
    if (localStorage.getItem("id") && typeof this.props.id === "undefined") {
      const fullName = await fetch(
        `http://localhost:3000/users/${localStorage.getItem("id")}`
      ).then(function(response) {
        return response.json();
      });
      this.setState({ name: fullName });
    } else {
      const fullName = await fetch(
        `http://localhost:3000/users/${this.props.id}`
      ).then(function(response) {
        return response.json();
      });
      this.setState({ name: fullName });
    }
  }

  renderTrustButton = id => {
    const trusted = this.props.trustRelation;
    if (localStorage.getItem("id") !== null) {
      if (localStorage.getItem("id") !== id) {
        if (trusted.length > 0) {
          if (trusted[0].active === true) {
            return <TrustedLogo id={id} />;
          } else if (
            trusted[0].active === false &&
            trusted[0].user2approval === false
            ) {
            return <Button variant="success">Pending</Button>;
          }
        } else {
          return <TrustButton id={id} />;
        }
      } else {
        return null;
      }
    }
  };

  render() {
    return this.state.name.map((x, i) => (
      <Card
        key={i}
        style={{
          WebkitBoxShadow: "-16px -14px 29px -6px rgba(164,144,219,0.92)",
          MozBoxShadow: "-16px -14px 29px -6px rgba(164,144,219,0.92)",
          boxShadow: "-16px -14px 29px -6px rgba(164,144,219,0.92)"
        }}
      >
        <Card.Body>
          <Image
            src={process.env.PUBLIC_URL + x.picture}
            alt="prof pic"
            roundedCircle
            width="150"
            height="150"
          />
          <Card.Text>
            <br />
            {x.last_name} <br />
            {x.email} <br />
            <br />
            {parseInt(localStorage.getItem("id")) === x.id
              ? null
              : this.renderTrustButton(this.props.id)}
          </Card.Text>
        </Card.Body>
      </Card>
    ));
  }
}

export default Profile;
