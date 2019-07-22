import React, { Component } from "react";
import TrustButton from './trust-components/TrustButton'
import Image from "react-bootstrap/Image";
import { Card, Button } from "react-bootstrap";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: [{}],
      path: window.location.pathname.split('/')
    };
  }
  async componentDidMount() {
    const exactPath = this.state.path[this.state.path.length -1]
    const fullName = await fetch(
      `http://localhost:3000/users/${exactPath}`
    ).then(function(response) {
      return response.json();
    });
    this.setState({ name: fullName });

    
  }

  renderTrustButton = (id) => {
    const trusted = this.props.trustRelation
    if(trusted === undefined){
      return <TrustButton/>
    }else {
    if (localStorage.getItem('id') !== null) {
      if (trusted.active) {
        return <h3>trusted</h3>
      } else if (trusted.user1approval) {
          return <Button>Pending<span class="spinner-border spinner-border-sm"></span></Button>
      } else {
        return <TrustButton/>
      }
    } else {
      return null
    }
  }
  }
  // trustCheck = () => {
  //   if (localStorage.getItem("id")  == x.id) {
  //     return false
  //    } if (localStorage.getItem("id") !== x.id) {
  //     return true
  //    } ? null : render()<TrustButton id={x.id}/> 

  // }

  render() {
    return this.state.name.map(x => (
      <Card border="danger">
        <Card.Body>
          <Image
            src={x.picture}
            alt="prof pic"
            roundedCircle
            width="150"
            height="150"
          />
          <Card.Text>
            <p>{x.last_name} </p>
            <p>{x.email} </p>
          </Card.Text>
          {parseInt(localStorage.getItem("id")) === x.id  ? null : this.renderTrustButton()} 
        </Card.Body>
      </Card>

    ));
  }
}

export default Profile;
