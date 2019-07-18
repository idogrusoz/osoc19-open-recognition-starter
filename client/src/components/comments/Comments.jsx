import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Moment from "react-moment";
import AddComment from "../AddComponent/addComponent";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: [{}],
      person: "test"
    };
  }

  getuserName = id => {
    console.log(`**************************${id}`);
  };

  async componentDidMount() {
    const comment = await fetch("http://localhost:3000/comment/1")
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
    console.log(comment);

    this.setState({ comments: comment });
  }

  render() {
    console.log(this.state.comments);
    return (
      <div>
        {localStorage.id === "1" ? <AddComment /> : null}
        {this.state.comments.map(x => (
          <Card>
            <Card.Body>
              <Card.Text>
                <p className="author">{x.author}</p>
                <p> {x.message} </p>

                <small>
                  <b>
                    <Moment format="YYYY/MM/DD">{x.creationdate}</Moment>
                  </b>
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Comments;
