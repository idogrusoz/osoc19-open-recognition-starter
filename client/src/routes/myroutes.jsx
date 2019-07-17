import React from "react";
import "../index.css";
import Header from "../components/header/Header";
import Search from "../components/search/searchresult";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from '../components/register/Register'
import SignIn from '../components/SignIn/SignIn'
import Landing from "../components/landing/Landing";
import Layout from '../components/Layout'

export default class Myroutes extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [
        {
          first_name: "steve"
        }
      ]
    };
  }

  render() {
    console.log(this.props.test);
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Header}  />

            <Route exact path="/register" component={Register} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/home" component={Landing} />
            <Route exact path="/profile" component={Layout} />


            <Route
              exact
              path="/search"
              render={props => <Search users={this.users} />}
            />

          </Switch>
        </Router>
      </div>
    );
  }
}
