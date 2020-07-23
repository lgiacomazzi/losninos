import React, { Component } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Table from "./table.js";

export default class List extends Component {
  constructor(props) {
    super();
    this.state = {
      page: "",
      pages: ""
    };
    console.log(props.data);
  }

  handleShow = () => {
    this.props.showCreate();
  };

  handleSearch = () => {
    this.props.showSearch();
  };

  render() {
    console.log(this.props);

    return (
      <div>
        <div className="title-bar">
          <Button size="sm" variant="dark" onClick={this.handleShow}>
            <span className="fa fa-plus mr-2" />
            Criar
          </Button>

          <ButtonGroup>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={this.handleShow}
            >
              <span className="fa fa-th-large" />
            </Button>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={this.handleShow}
            >
              <span className="fa fa-bars" />
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={this.handleShow}
            >
              <span className="fa fa-caret-left" />
            </Button>

            <Button size="sm" variant="outline-dark">
              {this.props.data.data && this.props.data.data.pages}
            </Button>
            <Button size="sm" variant="outline-dark">
              2
            </Button>
            <Button size="sm" variant="outline-dark">
              3
            </Button>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={this.handleShow}
            >
              <span className="fa fa-caret-right" />
            </Button>
          </ButtonGroup>
          <Button size="sm" variant="outline-dark" onClick={this.handleShow}>
            <span className="fa fa-search" />
          </Button>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Buscar"
            className="search"
            onChange={this.handleSearch}
          />
        </div>
      </div>
    );
  }
}
