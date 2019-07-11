import React from "react";
import Comments from "../src/components/comments/Comments";
import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";
import ImageAvatars from "../src/components/img/ImageAvatars";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Header />
        <ImageAvatars />
        <Comments />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
