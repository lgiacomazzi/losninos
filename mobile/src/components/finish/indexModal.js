import React, { Component } from "react";

import { View, TouchableOpacity, StyleSheet } from "react-native";

import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import Icon from "react-native-vector-icons/FontAwesome5";

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
      <View style={styles.ButtonPack}>
        <TouchableOpacity style={styles.Cancel} onPress={this.clickFechar}>
          <Icon name="times" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Save} onPress={this.clickSalvar}>
          <Icon name="check" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ButtonPack: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    margin: 10
  },

  Cancel: {
    height: 60,
    width: 60,
    backgroundColor: "#eee",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },

  Save: {
    height: 60,
    width: 60,
    backgroundColor: "#007bff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  }
});
