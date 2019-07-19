import React, { Component } from "react";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: [{}]
    };
  }
  async componentDidMount() {
    if (localStorage.getItem("id") && typeof this.props.id === "undefined") {
      console.log(typeof this.props.id === "undefined");
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

  render() {
    return this.state.name.map((x, i) => (
      <Card key={i} border="danger">
        <Card.Body>
          <Image
            src={x.picture}
            alt="prof pic"
            roundedCircle
            width="150"
            height="150"
          />
          <Card.Text>
            <br />
            {x.last_name} <br />
            {x.email} <br />
          </Card.Text>
        </Card.Body>
      </Card>
    ));
  }
}

export default Profile;
