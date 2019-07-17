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
        {localStorage.id === "2" ? <AddComment /> : null}
        {this.state.comments.map(x => (
          <div className="col">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <p className="card-text">
                  <strong>Comments:</strong>
                  <p>{x.author}</p>
                  <Moment format="YYYY/MM/DD">{x.creationdate}</Moment>
                  <p> {x.message} </p>
                </p>
              </div>
            </div>
          </div>
        ))}
        }
      </div>
    );
  }
}

export default Comments;
