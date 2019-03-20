// client/src/App.js
import React, { Component } from "react";
import Main from "./components/Main";

document.body.style = 'background: #efeff0;';

class App extends Component {

  render() {
    return (
      <div className="puppy-finder">
        <Main />
      </div>
    );
  }
}

export default App;