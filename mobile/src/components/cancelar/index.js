import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { MenuCancelar, CancelarText } from "./styles.js";

export default class Fechar extends Component {
  render() {
    return (
      <MenuCancelar onPress={this.props.onPress}>
        <CancelarText>
          <Text style={{ marginRight: 10 }}>Cancelar </Text>
          <Icon name="times" size={18} />
        </CancelarText>
      </MenuCancelar>
    );
  }
}
