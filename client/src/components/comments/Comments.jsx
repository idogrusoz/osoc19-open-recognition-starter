import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: [{}]
    };
  }
  async componentDidMount() {
    const comment = await fetch(
      `http://localhost:3000/comment/${localStorage.getItem("id")}`
    ).then(function(response) {
      console.log(response);
      return response.json();
    });
    this.setState({ comments: comment });
  }

  render() {
    return this.state.comments.map(x => (
      <Card border="warning">
        <Card.Body>
          <Card.Title>Comments:</Card.Title>
          <Card.Text>
            <p> {x.author} </p>
            <Moment format="DD-MM-YYYY">{x.creationdate}</Moment>
            <br /> <br />
            <p> {x.message} </p>
          </Card.Text>
        </Card.Body>
      </Card>
    ));
  }
}

export default Comments;
