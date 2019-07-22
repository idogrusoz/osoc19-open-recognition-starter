import React, { Component } from "react";
import TrustButton from './trust-components/TrustButton'
import Image from "react-bootstrap/Image";
import { Card, Button } from "react-bootstrap";
import TrustedLogo from './trust-components/TrustedLogo'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [{}]
    };
  }
  async componentDidMount() {
    
    if (localStorage.getItem("id") && typeof this.props.id === "undefined") {
      console.log(typeof this.props.id === "undefined");



      const fullName = await fetch(
        `http://localhost:3000/users/${localStorage.getItem("id")}`
      ).then(function(response) {
        return response.json();
      });
      this.setState({ name: fullName });
    } else {
      const fullName = await fetch(
        `http://localhost:3000/users/${this.props.id}`
      ).then(function(response) {
        return response.json();
      });
      this.setState({ name: fullName });
    }

  }

  renderTrustButton = (id) => {
    const trusted = this.props.trustRelation

    if(localStorage.getItem('id') !== null){
      console.log('id not null');
      if (localStorage.getItem('id') !== this.props.id){
        if(trusted !== null){
          console.log(trusted)
          if(trusted.active === true){
            return <TrustedLogo />
          } else if (trusted.active === false && trusted.user2approval === false){
            return <Button variant='success'>Pending</Button>
          }
        }else{
          return <TrustButton id={id}/>
        }
    }else{
      return null
    }
  }
}
    //   if(trusted === undefined){
  //     console.log('takilip kaldi')
  //     return /*<TrustButton id={id}/>*/null
  //   }else {
  //   if (localStorage.getItem('id') !== null) {
  //     console.log('takilmadi')
  //     if (trusted.active) {
  //       return <h3>trusted</h3>
  //     } else if (trusted.user1approval) {
  //         return <Button>Pending<span class="spinner-border spinner-border-sm"></span></Button>
  //     } else {
  //       console.log('id:', id)
  //       return <TrustButton id={id}/>
  //     }
  //   } else {
  //     return null
  //   }
  // }
  // }
  // trustCheck = () => {
  //   if (localStorage.getItem("id")  == x.id) {
  //     return false
  //    } if (localStorage.getItem("id") !== x.id) {
  //     return true
  //    } ? null : render()<TrustButton id={x.id}/> 

  // }

  render() {
    return this.state.name.map((x, i) => (
      <Card key={i} border="danger">
        <Card.Body>
          <Image
            src={x.picture}
            alt="prof pic"
            roundedCircle
            width="150"
            height="150"
          />
          <Card.Text>
            <br />
            {x.last_name} <br />
            {x.email} <br />
          </Card.Text>
          {parseInt(localStorage.getItem("id")) === x.id  ? null : this.renderTrustButton(this.props.id)} 
        </Card.Body>
      </Card>
    ));
  }
}

export default Profile;
