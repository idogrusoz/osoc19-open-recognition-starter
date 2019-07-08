import React from "react";
import logo from "./logo.svg";
import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          {require("./demo-dummy-api/get.json")} <br />
          {require("./demo-dummy-api/books/id/get.json")[0].title}
        </p>
      </header>
      <Footer />
    </div>
  );
}

export default App;
