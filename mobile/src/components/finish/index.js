import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import Icon from "react-native-vector-icons/FontAwesome5";

import { Salvar, Cancelar } from "../index.js";

export default class SaveCancel extends Component {
  clickSalvar = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPressSave();
  };

  clickFechar = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPressCancel();
  };

  render() {
    return (
      <View style={{ marginTop: 40 }}>
        <Salvar onPress={this.clickSalvar} />
        <Cancelar onPress={this.clickFechar} />
      </View>
    );
  }
}
