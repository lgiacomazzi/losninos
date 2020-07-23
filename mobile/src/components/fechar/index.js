import React, { Component } from "react";

import { View, Text, StyleSheet, Vibration } from "react-native";

import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import Icon from "react-native-vector-icons/FontAwesome5";

import { MenuFechar } from "./styles.js";

export default class Fechar extends Component {
  clickFechar = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPress();
  };

  render() {
    return (
      <MenuFechar
        onPress={this.clickFechar}
        StatusBarHeight={getStatusBarHeight()}
      >
        <Icon name="times" size={18} color="#253858" />
      </MenuFechar>
    );
  }
}
