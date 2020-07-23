import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Square, SquareSmall } from "./styles.js";

export default class Box extends Component {
  render() {
    const { icon, solid, name, onPress, color, bColor } = this.props;
    return (
      <Square onPress={onPress} bColor={bColor}>
        <Icon name={icon} size={18} color={color || "#253858"} solid={solid} />
        <SquareSmall color={color}>{name}</SquareSmall>
      </Square>
    );
  }
}
