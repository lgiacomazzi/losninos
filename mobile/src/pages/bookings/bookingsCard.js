// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

//React Native
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Components
import { Menu, Add, Spinner } from "../../components/index.js";

//Pages

//Main Styled Components
import { Container, Title, Card } from "../../main-styles.js";

//Local Styled Components
import Icon from "react-native-vector-icons/FontAwesome5";

export default class ReservaCard extends Component {
  render() {
    const { booking, navigation } = this.props;

    return (
      <TouchableOpacity
        style={styles.Line}
        onPress={() =>
          navigation.navigate("BookingSingle", {
            id: booking._id
          })
        }
      >
        <View style={styles.Circle}>
          <Icon name="bookmark" color="white" size={18} solid />
        </View>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {booking.customer.nome}
        </Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {booking.apartment.number}
        </Text>

        <View style={{ flex: 0, width: 80 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Icon name="sign-in-alt" size={12} />
            <Text>{format(booking.checkIn, " DDMMMYY") || " 00000 0000"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Icon name="sign-out-alt" size={12} solid />
            <Text>{format(booking.checkOut, " DDMMMYY") || " 00000 0000"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Line: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#f8f9fa",
    borderBottomWidth: 3,
    height: 60,
    flex: 1,
    paddingHorizontal: 20
  },

  Circle: {
    height: 35,
    width: 35,
    backgroundColor: "#253858",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },

  Body: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  }
});
