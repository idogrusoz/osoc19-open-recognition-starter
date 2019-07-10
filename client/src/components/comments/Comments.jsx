import React, { Component } from "react";
const comments = require("../../dummy-data/comments.json");

const getMessage = fetch("http://localhost:3000/users")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });

class Comments extends Component {
  render() {
    return comments.map(x => (
      <div className="col-md-6">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <p className="card-text">
              <strong>
                <i className="fa fa-car" /> Comments:
              </strong>
              <h5>Hello</h5>
              <p> {x.body} </p>
            </p>
          </div>
        </div>
      </div>
    ));
  }
}

export default Comments;
