
import React, { Component } from 'react'
import { FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignInOut from "./SignInOut"
 
export default class Header extends Component {

hello=()=>{
console.log('hello');
}



  render(){
    return (
      <div className="header">
        <div className="nav">
          <div className="ilogo">
            <span>Logo Here</span>

          </div>
          <div className="sera">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              id="search"

            />
            <Button onClick={()=>this.hello()}>Search</Button>
          </div>
          <div className="menu">
            <ul className="navlinks">
              <Link className="linksss" to="/signin">
                <SignInOut />
              </Link>
              <Link className="linksss" to="/register">
               <Button
               variant="outline-primary">
               Register
               </Button>
              </Link>
            </ul>

          </div>
        </div>
      </div>
    );
  }
}


