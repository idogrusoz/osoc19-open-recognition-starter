import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class TrustButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userrequesting: "",
            userrecieving: "",
            daterequesting: "",
            active: false,
            user1approval: false,
            user2approval: false,
            buttonText: "I trust you"

        }
        
    }


    sendTrustRequest = () => {
        const reqDate = new Date();
        const user1 = parseInt(localStorage.getItem('id'))
        console.log(this.props)
        const user2 = this.props.id
        console.log(user2)
        this.setState( 
            {
                userrequesting: user1,
                userrecieving: user2,
                daterequesting: reqDate,
                user1approval: true
            },
            () => fetch('http://localhost:3000/trust/', {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: { "Content-Type": "application/json" }
            })
              .then(() => this.setState(() => { return {buttonText: "Pending"}}))
              .catch(error => console.error )          
        )
    
    }

    
    render() {
        return(
            <Button 
            variant="success"
            onClick={this.sendTrustRequest}

            >{this.state.buttonText}</Button>
        )
    }
}
