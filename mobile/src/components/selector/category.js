import React, { Component } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { Circle } from "../category/styles.js";

import { Category } from "../index.js";

export default class CategorySelector extends Component {
  state = {
    active: ""
  };

  componentWillMount() {
    // this.setState({ active: this.props.active });
  }

  setActive = categ => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.setState(categ);
    this.setState({ active: categ });
  };

  render() {
    const { active } = this.state;

    return (
      <View style={styles.View}>
        <TouchableOpacity onPress={() => this.setActive("p")}>
          <Category category="p" active={active === "p"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setActive("m")}>
          <Category category="m" active={active === "m"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setActive("j")}>
          <Category category="j" active={active === "j"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setActive("a")}>
          <Category category="a" active={active === "a"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setActive("l")}>
          <Category category="l" active={active === "l"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setActive("g")}>
          <Category category="g" active={active === "g"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setActive("t")}>
          <Category category="t" active={active === "t"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setActive("tax")}>
          <Category category="tax" active={active === "tax"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setActive("h")}>
          <Category category="h" active={active === "h"} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 0
  },

  InnerContent: {}
});
