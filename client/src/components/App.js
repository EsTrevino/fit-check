import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

import "../style/App.css";
import history from "../history";
import NavBar from "./layout/Nav";
import Landing from "./layout/Landing";
import Footer from "./layout/Footer";
import Register from "./auth/Register";
import Login from "./auth/login";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
