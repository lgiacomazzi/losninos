import React, { Component } from "react";
import "./styles.css";
import logo from "../../assets/logo.png";

import { NavLink } from "react-router-dom";

export default class Header extends Component {
  setActive(event) {
    const id = event.target.id;
    console.log(document.getElementById(id).classList.add("active"));
    //this.props.history.push("/customer");
  }

  render() {
    return (
      <nav className="navbar bg-dark">
        <div className="container justify-content-start">
          <a className="navbar-brand mr-5" href="#">
            <img src={logo} width="30" className="invert" />
          </a>
          <div className="d-flex flex-row">
            <NavLink
              to="/customers"
              className="nav-icon"
              activeClassName="active"
            >
              <span className="fa fa-user-friends" />
            </NavLink>
            <NavLink
              to="/apartments"
              className="nav-icon"
              activeClassName="active"
            >
              <span className="fa fa-door-open" />
            </NavLink>
            <NavLink
              to="/payments"
              className="nav-icon"
              activeClassName="active"
            >
              <span className="fa fa-money-bill-wave" />
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
