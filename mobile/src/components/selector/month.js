import React, { Component } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import { Circle } from "../category/styles.js";

import { Label, LabelText } from "./styles.js";

export default class MonthSelector extends Component {
  state = {
    active: "",
    months: {
      jan: "01",
      fev: "02",
      mar: "03",
      abr: "04",
      mai: "05",
      jun: "06",
      jul: "07",
      ago: "08",
      set: "09",
      out: "10",
      nov: "11",
      dez: "12"
    }
  };

  componentWillMount() {
    this.setState({ active: this.props.active });
  }

  setActive = categ => {
    ReactNativeHapticFeedback.trigger("impactLight");
    // this.props.setState(categ);
    this.setState({ active: categ });
    this.props.onPress(categ);
  };

  render() {
    const { active, months } = this.state;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.View}
      >
        {Object.entries(months).map(m => (
          <TouchableOpacity key={m[0]} onPress={() => this.setActive(m[1])}>
            <Label active={active === m[1]}>
              <LabelText active={active === m[1]}>{m[0]}</LabelText>
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
    // alignItems: "flex-start",
    paddingHorizontal: 15
    // marginTop: 10,
    // marginBottom: 5
  }
});
