import React, { Component } from "react";
import Moment from "react-moment";
import Example from "../AddComponent/addComponent";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    console.log(this.props.comments);
    return (
      <div className="comments">
        <div className="part-header">
          <h3>Comments:</h3>
        </div>
        {this.verificationConnectionIdentity() ? (
          <Example user={this.props.loc} trust={this.props.trustRelation} />
        ) : null}

        {this.props.comments.length === 0 ? (
          <div>
            <p>There are no comments on this profile yet! </p>
            <p>You can add your comment if you trust the user</p>
          </div>
        ) : (
          this.props.comments.map((x, i) =>
            x.published ? (
              <div key={i} className="comment-item">
                <div>
                  <div>
                    <div className="comment-info">
                      <br />
                      <a href={`/profile/${x.login}`}>author : {x.author}</a>
                      <br />
                      relation : {x.relationship}
                      <br />
                      <Moment format="YYYY/MM/DD">{x.creationdate}</Moment>
                      <br />
                    </div>
                    {x.message}
                  </div>
                </div>
              </div>
            ) : null
          )
        )}
      </div>
    );
  }
}

export default Comments;
