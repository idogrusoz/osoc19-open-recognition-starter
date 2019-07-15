import React, { Component } from "react";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: [{}]
    };
  }
  async componentDidMount() {
    const fullName = await fetch("http://localhost:3000/users/2").then(function(
      response
    ) {
      console.log(response);
      return response.json();
    });
    this.setState({ name: fullName });
  }

  render() {
    return this.state.name.map(x => (
      <div>
        <div className="card" style={{ width: "270px" }}>
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
