import React, { Component } from "react";
import MyRoutes from "./routes/myroutes";
import Layout from "./components/Layout";
import Skills from "./components/Skill/skills";
import Search from "./components/search/searchresult";
import "./App.css";
import Profile from "./components/Profile";
import ImageAvatars from "./components/img/ImageAvatars";


class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="mainPage">
          <MyRoutes />
          {/* <Skills /> */}
          {/* <Search /> */}
          {/* <Layout /> */}
        </div>
      </React.Fragment>
    );
  }

}

export default App;
