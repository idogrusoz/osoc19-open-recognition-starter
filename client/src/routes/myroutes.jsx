import React from "react";
import "../index.css";
import Header from "../components/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
          </Switch>
        </Router>
      </div>
    );
  }
}
