import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Circle } from "./styles.js";

export default class Bubble extends Component {
  render() {
    const { icon, solid, size, name, color, bColor } = this.props;
    return (
      <View style={styles.bubbleRectangle}>
        <Circle color={color} size={size}>
          <Icon
            name={icon}
            size={size * 20 || 20}
            color="white"
            solid={solid}
          />
        </Circle>
        <Text style={styles.bubbleSmall}>{this.props.name}</Text>
      </View>
    );
  }
}

jewelStyle = function(myColor) {
  return {
    borderRadius: 10,
    background: myColor
  };
};

const styles = StyleSheet.create({
  bubble: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#eee",
    shadowRadius: 4,
    color: "#253858",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  bubbleRectangle: {
    display: "flex",
    alignItems: "center"
  },

  bubbleSmall: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#253858"
  }
});
