import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

import Icon from "react-native-vector-icons/FontAwesome5";

import { Circle } from "./styles.js";

export default class Category extends Component {
  state = {
    category: "",
    color: "white",
    bColor: "#eee",
    name: "times"
  };

  componentDidMount() {
    this.getCategory();
  }

  getCategory = () => {
    const { category } = this.props;

    if (category === "l") {
      this.setState({
        bColor: "#ff9800",
        name: "bolt"
      });
    } else if (category === "m") {
      this.setState({
        bColor: "#e91e63",
        name: "hammer"
      });
    } else if (category === "a") {
      this.setState({
        bColor: "#007bff",
        name: "tint"
      });
    } else if (category === "j") {
      this.setState({
        bColor: "#8bc34a",
        name: "seedling"
      });
    } else if (category === "h") {
      this.setState({
        bColor: "#00bcd4",
        name: "home"
      });
    } else if (category === "t") {
      this.setState({
        bColor: "#673ab7",
        name: "wifi"
      });
    } else if (category === "p") {
      this.setState({
        bColor: "black",
        name: "child"
      });
    } else if (category === "g") {
      this.setState({
        bColor: "#f44336",
        name: "fire"
      });
    } else if (category === "tax") {
      this.setState({
        bColor: "#253858",
        name: "dollar-sign"
      });
    }
  };

  render() {
    const { color, bColor, name } = this.state;
    const { active, size } = this.props;

    return (
      <Circle active={active} bColor={bColor} size={size}>
        <Icon
          name={name}
          size={size * 20 || 20}
          color={active ? color : "#253858"}
        />
      </Circle>
    );
  }
}
