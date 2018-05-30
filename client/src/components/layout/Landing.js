import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../style/landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="container landing-container">
        <div className="textbox">
          <h1>FitCheck</h1>
          <p>Get In. Get Fit. Get on with Life.</p>
        </div>
        <div className="buttonbox">
          <Link to="/register">
            <button className="btn  btn-lg btn-block btn btn-primary">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
