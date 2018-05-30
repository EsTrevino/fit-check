import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../style/nav.css";

class NavBar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <h2>FitCheck</h2>
            </Link>
          </div>
          <div className="links">
            <ul>
              <li>
                <Link to="/register">
                  <button className="btn btn-light">Sign Up</button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button className="btn btn-light">Sign In</button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
