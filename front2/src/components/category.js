import React, { Component } from "react";
import "./styles.css";

export default class Category extends Component {
  getStyle = () => {
    const { category } = this.props;

    if (category === "l") {
      return {
        backgroundColor: "#ff9800"
      };
    } else if (category === "m") {
      return {
        backgroundColor: "#e91e63"
      };
    } else if (category === "a") {
      return {
        backgroundColor: "#007bff"
      };
    } else if (category === "j") {
      return {
        backgroundColor: "#8bc34a"
      };
    } else if (category === "h") {
      return {
        backgroundColor: "#00bcd4"
      };
    } else if (category === "t") {
      return {
        backgroundColor: "#673ab7"
      };
    } else if (category === "p") {
      return {
        backgroundColor: "black"
      };
    } else if (category === "g") {
      return {
        backgroundColor: "#f44336"
      };
    } else if (category === "tax") {
      return {
        backgroundColor: "#253858"
      };
    }
  };

  getClassName = () => {
    const { category } = this.props;

    if (category === "l") {
      return "fa fa-bolt";
    } else if (category === "m") {
      return "fa fa-hammer";
    } else if (category === "a") {
      return "fa fa-tint";
    } else if (category === "j") {
      return "fa fa-seedling";
    } else if (category === "h") {
      return "fa fa-home";
    } else if (category === "t") {
      return "fa fa-wifi";
    } else if (category === "p") {
      return "fa fa-child";
    } else if (category === "g") {
      return "fa fa-fire";
    } else if (category === "tax") {
      return "fa fa-dollar-sign";
    }
  };

  render() {
    return (
      <div
        className="category"
        style={this.getStyle()}
        onClick={this.props.onClick}
      >
        <span className={this.getClassName()} />
      </div>
    );
  }
}
