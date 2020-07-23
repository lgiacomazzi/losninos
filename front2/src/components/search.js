import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <span
        className={this.props.className + " fa fa-search"}
        style={newStyle}
      />
    );
  }
}

const newStyle = {
  backgroundColor: "#607d8b",
  color: "white",
  width: 35,
  height: 35,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 100
};
