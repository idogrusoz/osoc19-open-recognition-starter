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
      `http://localhost:3000/users/${localStorage.id}`
    ).then(function(response) {
      console.log(response);
      return response.json();
    });
    this.setState({ name: fullName });
  }

  render() {
    return this.state.name.map(x => (
      <div>
        <div className="card">
          <img src={x.picture} alt="prof pic" />
          <div className="card-body">
            <h5 className="card-title">{x.first_name}</h5>
            <p className="card-text">
              <p>{x.last_name} </p>
              <p>{x.email} </p>
              <p>{x.city}</p>
            </p>
          </div>
        </div>
      </div>
    ));
  }
}

export default Profile;
