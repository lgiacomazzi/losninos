// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { format, subMonths } from "date-fns";
import pt from "date-fns/locale/pt";

//React Native
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

// Components
import { MonthSelector } from "../../components/index.js";

//Pages

//Main Styled Components
import { Container, Title } from "../../main-styles.js";
import Icon from "react-native-vector-icons/FontAwesome5";

//Local Styled Components
import { Label, LabelText, ScrollButtons } from "./styles.js";

export default class Selector extends Component {
  state = {
    activeMonth: "",
    months: []
  };

  dateToMonth = n => {
    const today = subMonths(new Date(), n);
    return {
      date: format(today, "MMM YY", { locale: pt }),
      month: format(today, "MM"),
      year: format(today, "YYYY")
    };
  };

  componentWillMount() {
    const today = new Date();
    this.setState({
      months: [
        this.dateToMonth(0),
        this.dateToMonth(1),
        this.dateToMonth(2),
        this.dateToMonth(3),
        this.dateToMonth(4),
        this.dateToMonth(5),
        this.dateToMonth(6)
      ]
    });
    this.onClickFilter(format(today, "MM"), format(today, "YYYY"));
  }

  onClickReceitas = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPressReceitas();
  };

  onClickDespesas = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.onPressDespesas();
  };

  onClickFilter = (m, y) => {
    // const month = format(m, "MMM");
    // const year = format(m, "YY");
    this.setState({ activeMonth: [m + y] });
    this.props.filter(m, y);
  };

  render() {
    const { active } = this.props;
    const { months, activeMonth } = this.state;

    return (
      <ScrollButtons
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ zIndex: 2, backgroundColor: "white" }}
        contentContainerStyle={styles.innerTabs}
      >
        <TouchableOpacity onPress={this.onClickReceitas}>
          <Label active={active === "In"}>
            <LabelText active={active === "In"}>Receitas</LabelText>
          </Label>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onClickDespesas}>
          <Label active={active === "Out"}>
            <LabelText active={active === "Out"}> Despesas</LabelText>
          </Label>
        </TouchableOpacity>
        {months.map(m => (
          <TouchableOpacity
            key={m.date}
            onPress={(a, b) => this.onClickFilter(m.month, m.year)}
          >
            <Label active={activeMonth == m.month + m.year}>
              <LabelText active={activeMonth == m.month + m.year}>
                {m.date}
              </LabelText>
            </Label>
          </TouchableOpacity>
        ))}
      </ScrollButtons>
    );
  }
}

const styles = StyleSheet.create({
  innerTabs: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    // alignItems: "center",
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 20
  },

  Button: {}
});
