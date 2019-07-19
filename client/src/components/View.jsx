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

class View extends Component {
  constructor(props) {
    super(props);
    const pat = props.location.pathname.split("/");
    this.state = {
      loc: pat[pat.length - 1]
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col>
              <Profile id={this.state.loc} />

              <Skills loc={this.state.loc} />
            </Col>
            <Col xs={5}>
              <Comments loc={this.state.loc} />
            </Col>
            <Col>
              <TrustNotification />
              <TrustedList loc={this.state.loc} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default View;
