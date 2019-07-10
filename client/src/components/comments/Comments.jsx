import React, { Component } from "react";
const comments = require("../../dummy-data/comments.json");

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: ""
    };
  }
  async componentDidMount() {
    const comment = await fetch("http://localhost:3000/users/1").then(function(
      response
    ) {
      console.log(response);
      return response.json();
    });
    this.setState({ comments: comment });
  }

  render() {
    return comments.map(x => (
      <div className="col-md-6">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <p className="card-text">
              <h1>{this.state.comments}</h1>
              <strong>
                <i className="fa fa-car" /> Comments:
              </strong>
              <h3>hello: {this.state.comments}</h3>
              <p> {x.body} </p>
            </p>
          </div>
        </div>
      </div>
    ));
  }
}

export default Comments;
