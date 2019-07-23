import React, { Component } from "react";
import Profile from "./Profile";
import Comments from "./comments/Comments";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TrustedList from "./TrustedList";
import TrustNotification from "./trust-components/TrustNotification";
import Header from "../components/header/Header";
import Skills from "./Skill/skills";
import CommentNotification from './comments/CommentNotification'

class View extends Component {
  constructor(props) {
    super(props);
    const pat = props.location.pathname.split("/");
    this.state = {
      loc: pat[pat.length - 1],
      trustRelation: []
    };
  }
  componentDidMount = async () => {
    if (
      (localStorage.getItem("id") !== null) &
      (this.state.loc !== localStorage.getItem("id"))
      ) {
        const viewingUser = parseInt(localStorage.getItem("id"))
        const viewedProfile = parseInt(this.state.loc)
        await fetch(`http://localhost:3000/trust/relationship/${viewedProfile}/${viewingUser}`)
          .then(response => response.json())
          .then(data => this.setState({trustRelation : data}))
      }}

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col>
              <Profile
                id={this.state.loc}
                trustRelation={this.state.trustRelation}
              />

              <Skills loc={this.state.loc} />
            </Col>
            <Col xs={7}>
            {(this.state.loc === localStorage.getItem("id")) ? <CommentNotification/> : null}

              <Comments loc={this.state.loc} />
            </Col>
            <Col>
            {(this.state.loc === localStorage.getItem("id")) ?<TrustNotification />: null}
              
              <TrustedList loc={this.state.loc} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default View;
