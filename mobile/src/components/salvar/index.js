import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { MenuSalvar, SalvarText } from "./styles.js";

export default class Salvar extends Component {
  render() {
    return (
      <MenuSalvar onPress={this.props.onPress}>
        <SalvarText>
          <Text>Salvar </Text>
          <Icon name="check" size={18} />
        </SalvarText>
      </MenuSalvar>
    );
  }
}
