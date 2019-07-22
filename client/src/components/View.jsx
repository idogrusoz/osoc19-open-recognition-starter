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
    constructor(){
        super()
        this.state ={
            trustRelation: [],
            viewedProfile: ''
        }
    }

  componentDidMount() {
      const profile = window.location.pathname.split('/')
      const viewedProfile = profile[profile.length -1]
      this.setState({ viewedProfile: viewedProfile })
      if((localStorage.getItem('id') !== null) & (viewedProfile !== localStorage.getItem('id'))){
      const viewingUser = parseInt(localStorage.getItem('id'))
      let trustStatus =[]
      fetch(`http://localhost:3000/trust/${viewedProfile}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                console.log("in filter")
                if((item.userrequesting === viewingUser) || (item.userreceiving === viewingUser)){
                    trustStatus.push(item)
                } 
            })
            // Delete [0]
            this.setState({ trustRelation : trustStatus[0] })
            console.log(this.state)
        })
    } 
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col>
              <Profile trustRelation={this.state.trustRelation}/>

              <Skills />
            </Col>
            <Col xs={5}>
              <Comments />
            </Col>
            <Col>
              <TrustNotification />
              <TrustedList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default View;
