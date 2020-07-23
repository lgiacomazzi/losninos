import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import Icon from "react-native-vector-icons/FontAwesome5";

import { MenuAdd } from "./styles.js";

export default class Add extends Component {
  onPressButton = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPress();
  };

  render() {
    return (
      <MenuAdd
        activeFilter={this.props.activeFilter}
        onPress={this.onPressButton}
      >
        <Icon
          name={this.props.icon || "plus"}
          size={18}
          color={this.props.activeFilter ? "white" : "#253858"}
        />
      </MenuAdd>
    );
  }
}
