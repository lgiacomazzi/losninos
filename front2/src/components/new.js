import React, { Component } from "react";

export default class New extends Component {
  render() {
    return (
      <a className={this.props.className} onClick={this.props.onClick}>
        <span className="fa fa-plus btn-new" />
      </a>
    );
  }
}
