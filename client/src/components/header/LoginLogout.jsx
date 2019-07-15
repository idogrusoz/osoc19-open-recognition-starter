import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

 export default class LoginLogout extends Component {
    constructor(props) {
        super()
    }

     signIn = () => {
         console.log(localStorage.getItem('id'))
         localStorage.setItem("id",2);
         console.log(`signed in :${localStorage.getItem('id')}`)

     }
    

    render(){
        return(
            localStorage.getItem("id") ? 
            <Button variant="outline-primary" onClick = {this.signIn}>Sign-out</Button> :
            <Button variant="outline-primary" onClick = {this.signIn}>Sign-in</Button>
        )
    }
}