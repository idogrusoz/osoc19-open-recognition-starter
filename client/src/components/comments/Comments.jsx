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

  // make = () => (
  //   <NewWindow>
  //     <Form.Group controlId="exampleForm.ControlTextarea1">
  //       <Form.Label>Add comment</Form.Label>
  //       <Form.Control as="textarea" rows="3" />
  //       <Button type="submit">Add comment</Button>
  //     </Form.Group>
  //   </NewWindow>
  // );

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
        {/* <Button onClick={this.make}>Add Comment</Button> */}
        {this.verificationConnectionIdentity() ? (
          <Example user={this.props.loc} />
        ) : null}

        {this.state.comments.length === 0 ? (
          <Card
            style={{
              margin: "0px 0px 20px 0px",
              border: " solid 1px #d4bad8"
            }}
          >
            <Card.Body>
              <Card.Text
                style={{
                  webkitBoxShadow: "10px -4px 17px -7px rgba(61,53,166,0.69)",
                  mozBoxShadow: "10px -4px 17px -7px rgba(61,53,166,0.69)",
                  boxShadow: "10px -4px 17px -7px rgba(61,53,166,0.69)",
                  color: "#17a2b8",
                  fontFamily: ""
                }}
              >
                <p>There is no comment on this profile yet! </p>
                <p>Be the first one adding some good word on it.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          this.state.comments.map((x, i) =>
            x.published ? (
              <Card
                key={i}
                style={{
                  margin: "0px 0px 20px 0px",
                  border: " solid 1px #d4bad8"
                }}
              >
                <Card.Body>
                  <Card.Text
                    style={{
                      WebkitBoxShadow:
                        "10px -4px 17px -7px rgba(61,53,166,0.69)",
                      MozBoxShadow: "10px -4px 17px -7px rgba(61,53,166,0.69)",
                      boxShadow: "10px -4px 17px -7px rgba(61,53,166,0.69)"
                    }}
                  >
                    <br />
                    author : {x.author}
                    <br />
                    relation : {x.relationship}
                    <br />
                    <Moment format="YYYY/MM/DD">{x.creationdate}</Moment>
                    <br />
                    {x.message}
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : null
          )
        )}
      </div>
    );
  }
}

export default Comments;
