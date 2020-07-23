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
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import { Circle } from "../category/styles.js";

import { Label, LabelText } from "./styles.js";

export default class YearSelector extends Component {
  state = {
    active: "",
    years: []
  };

  componentWillMount() {
    const today = format(new Date(), "YYYY", { locale: pt });
    this.setActive(today);
    this.setState({
      active: today,
      years: [today, today - 1, today - 2]
    });
  }

  setActive = categ => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPress(categ);
    this.setState({ active: categ });
  };

  render() {
    const { active, years } = this.state;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.View}
      >
        {years.map(y => (
          <TouchableOpacity key={y} onPress={() => this.setActive(y)}>
            <Label active={active === y}>
              <LabelText active={active === y}>{y}</LabelText>
            </Label>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    // marginTop: 10,
    marginBottom: 10
  },

  InnerContent: {}
});
