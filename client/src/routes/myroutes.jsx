import React from "react";
import "../index.css";
import Header from "../components/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from '../components/register/Register'
import SignIn from '../components/SignIn/SignIn'

export default class Myroutes extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: "off",
      user: "",
      menus: [1]
    };
  }

  render() {
    console.log(this.props.test);
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Header} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </Router>
      </div>
    );
  }
}
