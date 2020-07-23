// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

//React Native
import { View, Text, StyleSheet } from "react-native";

// Components
import { Menu, Add, Spinner, Category } from "../../components/index.js";

//Pages

//Main Styled Components
import { Container, Title } from "../../main-styles.js";

//Local Styled Components
import { Line, Price, Body } from "./styles.js";

export default class PaymentLine extends Component {
  render() {
    const { payment, navigation } = this.props;
    return (
      <Line
        style={styles.Line}
        onPress={() =>
          navigation.navigate("PaymentsSingle", {
            id: payment._id
          })
        }
      >
        {payment.type === "Out" && (
          <Category category={payment.category || ""} active />
        )}
        <Body>
          <Text style={styles.title}>{payment.title}</Text>
          <Text style={styles.small}>
            {format(payment.createdAt, "DD MMM YYYY - HH:mm", { locale: pt })}
          </Text>
        </Body>
        <Price>
          <Text style={styles.Total}>R$ {payment.amountTotal.toFixed(2)}</Text>
        </Price>
      </Line>
    );
  }
}

const styles = StyleSheet.create({
  Line: {
    paddingLeft: 10,
    backgroundColor: "white",
    paddingRight: 20,
    borderBottomColor: "#f8f9fa",
    borderBottomWidth: 3
  },

  title: { fontWeight: "700" },

  small: { color: "#999", textTransform: "capitalize" },

  Total: {
    fontWeight: "700",
    fontSize: 12
  }
});
