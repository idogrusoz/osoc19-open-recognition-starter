import React, { Component } from "react";
import Moment from "react-moment";
// import AddComment from "../AddComponent/addComponent";
// import { Button } from "react-bootstrap";
// import NewWindow from "react-new-window";
import Popup from "reactjs-popup";
// import { Form, Button } from "react-bootstrap";

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
        {/* <Button onClick={this.make}>Add Comment</Button> */}
        {this.verificationConnectionIdentity() ? (
          <Popup trigger={<button> Trigger</button>} position="right center">
            <div>Popup content here !!</div>
          </Popup>
        ) : null}
        {this.state.comments.map((x, i) => (
          <div className="col" key={i}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <div className="card-text">
                  <strong>Comments:</strong>
                  <p>{x.author}</p>
                  <Moment format="YYYY/MM/DD">{x.creationdate}</Moment>
                  <p> {x.message} </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Comments;
