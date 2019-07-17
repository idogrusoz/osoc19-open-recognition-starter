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
    const fullName = await fetch(
      `http://localhost:3000/users/${localStorage.getItem("id")}`
    ).then(function(response) {

      console.log(response);
      return response.json();
    });
    this.setState({ name: fullName });
  }

  render() {
    return this.state.name.map(x => (
      <Card border="danger">
        <Card.Body>
          <Image
            src={x.picture}
            alt="prof pic"
            roundedCircle
            width="150"
            height="150"
          />
          <Card.Text>
            <p>{x.last_name} </p>
            <p>{x.email} </p>
          </Card.Text>
        </Card.Body>
      </Card>

    ));
  }
}

export default Profile;
