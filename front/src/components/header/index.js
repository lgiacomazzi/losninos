import React, { Component } from "react";
import "./styles.css";
import { Nav, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../../assets/logo.png";
import user from "../../assets/40430577.jpeg";

class Header extends Component {
  state = {
    pageUrl: "/",
    menu: false
  };

  toggleShow = e => {
    this.setState({ menu: true });
  };

  toggleHide = e => {
    this.setState({ menu: false });
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <header id="main-header">
        <div className="main-logo" href="/apartments" onClick={this.toggleShow}>
          <img src={logo} height="30" alt="" />
        </div>

        <Nav id="yyy" activeKey={this.state.pageUrl}>
          <Nav.Item>
            <NavLink
              exact
              to="/dashboard"
              activeClassName="active"
              className="nav-link"
            >
              Dashboard
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              to="/calendar"
              activeClassName="active"
              className="nav-link"
            >
              Calendário
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              to="/bookings"
              activeClassName="active"
              className="nav-link"
            >
              Reservas
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              to="/payments#in"
              activeClassName="active"
              className="nav-link"
            >
              Receitas
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              to="/payments#out"
              activeClassName="active"
              className="nav-link"
            >
              Despesas
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              to="/customers"
              activeClassName="active"
              className="nav-link"
            >
              Hóspedes
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              exact
              to="/apartments"
              activeClassName="active"
              className="nav-link"
            >
              Apartamentos
            </NavLink>
          </Nav.Item>
        </Nav>
        <div className="user">
          <div className="user-logo">
            <img src={user} width="30" height="30" />
          </div>
        </div>
        <Modal size="lg" id="mobile-menu" show={this.state.menu}>
          <div onClick={this.toggleHide}>
            <span className="fa fa-times m-3 mr-auto fechar" />
          </div>
          <div className="d-flex justify-content-center flex-wrap flex-row">
            <div className="bubble-rectangle">
              <a href="/dashboard" className="circle bg-dashboard" />
              <span>Dashboard</span>
            </div>
            <div className="bubble-rectangle">
              <a href="/calendar" className="circle bg-calendario" />
              <span>Calendário</span>
            </div>
            <div className="bubble-rectangle">
              <a href="/bookings" className="circle bg-reservas" />
              <span>Reservas</span>
            </div>
            <div className="bubble-rectangle">
              <a href="/payments#in" className="circle bg-receitas" />
              <span>Receitas</span>
            </div>
            <div className="bubble-rectangle">
              <a href="/payments#out" className="circle bg-despesas" />
              <span>Despesas</span>
            </div>
            <div className="bubble-rectangle">
              <a href="/customers" className="circle bg-hospedes" />
              <span>Hospedes</span>
            </div>
            <div className="bubble-rectangle">
              <a href="/apartments" className="circle bg-apartamentos" />
              <span>Apartamentos</span>
            </div>
          </div>
        </Modal>
      </header>
    );
  }
}

export default Header;
