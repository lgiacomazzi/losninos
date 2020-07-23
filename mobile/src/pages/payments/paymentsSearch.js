// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

//React Native
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";

// Components
import {
  Fechar,
  SaveCancel,
  Category,
  CategorySelector,
  MonthSelector,
  YearSelector
} from "../../components/index.js";

//Pages

//Main Styled Components
import {
  Container,
  Title,
  InputTexto,
  InputLabel,
  Card,
  ButtonSuccess,
  SuccessText
} from "../../main-styles.js";

//Local Styled Components
import { Price } from "./styles.js";

//
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

export default class PaymentsSearch extends Component {
  state = {
    month: "",
    year: "",
    categ: ""
  };

  setFilter = (i, categ) => {
    if (categ === "month") {
      this.setState({ month: i });
    } else if (categ === "year") {
      this.setState({ year: i });
    } else if (categ === "categ") {
      this.setState({ categ: i });
    }
  };

  goFilter = () => {
    const { month, year, categ } = this.state;
    this.props.filter(month, year, categ);
  };

  render() {
    const { visible, close, type } = this.props;
    const { month, year, categ } = this.state;

    return (
      <Modal
        style={{ flex: 1 }}
        visible={visible || false}
        animationType="fade"
        transparent
      >
        <Fechar onPress={close} />
        <ScrollView contentContainerStyle={styles.modalView}>
          <Title style={{ paddingLeft: 20 }}>filtrar</Title>
          <MonthSelector
            active={month}
            onPress={m => this.setFilter(m, "month")}
          />
          <YearSelector
            active={year}
            onPress={y => this.setFilter(y, "year")}
          />

          <ButtonSuccess onPress={this.goFilter}>
            <SuccessText>Filtrar</SuccessText>
          </ButtonSuccess>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    paddingTop: getStatusBarHeight() + 10,
    paddingBottom: getBottomSpace(),
    // flex: 1
    // display: "flex",
    // height: 100 + "%",
    justifyContent: "space-around"
  }
});
