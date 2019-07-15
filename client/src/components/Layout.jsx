import React, { Component } from "react";
import Profile from "./Profile";
import Comments from "./comments/Comments";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TrustedList from "./TrustedList";
import Skill from "./Skill/skills";

class Layout extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Profile />
              <Skill />
            </Col>
            <Col>
              <Comments />
            </Col>
            <Col>
              <TrustedList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Layout;
