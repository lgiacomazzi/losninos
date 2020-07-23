import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import api from "../../services/api";

import { Card } from "../../main-styles.js";

export default class ApartmentsChart extends Component {
  state = {
    data: [],
    occRate: 0
  };

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    const response = await api.get("/apartments");
    const docs = response.data.docs;

    // Alugados
    const rented = docs.filter(d => d.status === "Alugado");
    // Disponíveis
    const available = docs.filter(d => d.status === "Disponivel");

    const occRate = (rented.length / (rented.length + available.length)) * 100;

    this.setState({
      data: [
        {
          name: "Alugados",
          value: rented.length
        },
        {
          name: "Disponíveis",
          value: available.length
        }
      ],
      alugados: rented.length,
      disponiveis: available.length,
      occRate: occRate
    });
  };

  render() {
    return (
      <Card style={{ minHeight: 200 }}>
        <View style={styles.chartTitle}>
          <Text style={styles.chartHeader}>
            {parseFloat(this.state.occRate.toFixed(2)) + " %"}
          </Text>
          <Text style={styles.chartSmall}>Ocupação</Text>
        </View>
        <View style={styles.chartTitleBottom}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.chartSmallBold}>
              {this.state.alugados || "-"}
            </Text>
            <Text style={styles.chartSmall}> Alugados</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.chartSmallBold}>
              {this.state.disponiveis || "-"}
            </Text>
            <Text style={styles.chartSmall}> Disponíveis</Text>
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  chartTitle: {
    margin: 16,
    position: "absolute"
  },

  chartTitleBottom: {
    margin: 16,
    position: "absolute",
    bottom: 0
  },

  chartHeader: {
    fontSize: 20,
    fontWeight: "700"
  },

  chartSmall: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    lineHeight: 20
  },

  chartSmallBold: {
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    lineHeight: 20
  }
});
