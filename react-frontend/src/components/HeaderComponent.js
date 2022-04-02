import React, { Component } from "react";
import Retro8 from "../../src/components/Retro8.png";
import RetroLogo from "../assets/Retro logo.png";
class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const mystyle = {
      backgroundColor: "white",
      // CSS CODE
    };
    return (
      <div className="app-header">
        <img className="logo" src={RetroLogo}></img>

        {/* <div><a class="navbar-brand" href="#"> <img src= {Retro2} marginRight= "100" width="150" height="100" alt=""></img></a></div> */}

        <header className="navbar-header">
          <nav className="custom-navbar">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/employees" className="navbar-item">
              Employee Data
            </a>
            <a href="/analysis" className="navbar-item">
              Analytics
            </a>
          </nav>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
