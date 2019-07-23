import React, { Component } from "react";
import Moment from "react-moment";
import Example from "../AddComponent/addComponent";
import Card from "react-bootstrap/Card";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [{}],
      person: "test",
      path: window.location.pathname.split("/")
    };
  }
  
  verificationConnectionIdentity = () => {
    return (
      localStorage.getItem("id") &&
      typeof this.props.loc !== "undefined" &&
      localStorage.getItem("id") !== this.props.loc
    );
  };

  async componentDidMount() {
    if (localStorage.getItem("id") && typeof this.props.loc === "undefined") {
      const comment = await fetch(
        `http://localhost:3000/comment/${localStorage.getItem("id")}`
        )
        .then(response => response.json())
        .then(data =>
          Promise.all(
            data.map(async x => {
              await fetch(`http://localhost:3000/users/${x.author}`)
              .then(res => res.json())
              .then(data2 => (x.author = data2[0].first_name));
              return x;
            })
            )
            );
            
            this.setState({ comments: comment });
          } else {
            const comment = await fetch(
              `http://localhost:3000/comment/${this.props.loc}`
              )
              .then(response => response.json())
              .then(data =>
                Promise.all(
                  data.map(async x => {
                    await fetch(`http://localhost:3000/users/${x.author}`)
                    .then(res => res.json())
                    .then(data2 => (x.author = data2[0].first_name));
                    return x;
                  })
                  )
                  );
                  
                  this.setState({ comments: comment });
                }
              }
              
              render() {
                return (
                  <div>
        <strong>Comments:</strong>
        {this.verificationConnectionIdentity() ? (
          <Example user={this.props.loc} trust={this.props.trustRelation} />
        ) : null}

        {this.state.comments.map((x, i) =>
          x.published ? (
            <Card
              style={{
                margin: "0px 0px 20px 0px",
                border: " solid 1px #d4bad8"
              }}
            >
              <Card.Body>
                <Card.Text>
                  <p>author : {x.author}</p>
                  <p>relation : {x.relationship}</p>
                  <Moment format="YYYY/MM/DD">{x.creationdate}</Moment>
                  <p> {x.message} </p>
                </Card.Text>
              </Card.Body>
            </Card>
          ) : null
        )}
      </div>
    );
  }
}

export default Comments;
