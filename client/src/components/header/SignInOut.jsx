import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

 export default class SignInOut extends Component {


    

     signOut =() => {
        // const { history } = this.props
         localStorage.removeItem('id')
     }
    

    render(){
        return(
            localStorage.getItem("id") ? 
            <Link to='/home'>
            <Button variant="outline-primary" onClick = {this.signOut}>Sign-out</Button> 
            </Link>:
            <Button variant="outline-primary" onClick = {this.signIn}>Sign-in</Button>            
        )
    }
}