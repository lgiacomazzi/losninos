// React
import React, { Component } from "react";

//Api
import api from "../../services/api";

//React Native
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Components
import { Menu, Add, Spinner } from "../../components/index.js";

//Pages

//Main Styled Components
import { Container, Title, Card } from "../../main-styles.js";

//Local Styled Components
import Icon from "react-native-vector-icons/FontAwesome5";

export default class CustomerCard extends Component {
  handleOnPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.customer);
    } else {
      this.props.navigation.navigate("CustomerSingle", {
        id: this.props.customer._id
      });
    }
  };

  render() {
    const { customer, navigation } = this.props;

    return (
      <TouchableOpacity style={styles.Line} onPress={this.handleOnPress}>
        <View style={styles.Circle}>
          <Icon name="user-circle" color="white" size={18} solid />
        </View>
        <View style={styles.Body}>
          <Text style={{ fontWeight: "700", fontSize: 16 }}>
            {customer.nome}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Icon name="phone" size={12} />
            <Text>{customer.phone || " 00000 0000"}</Text>
          </View>
        </View>
        <Icon name="chevron-right" size={12} color="#007bff" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Line: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: "#e2e4e6",
    borderBottomWidth: 1,
    height: 60,
    flex: 1,
    paddingHorizontal: 20
  },

  Circle: {
    height: 35,
    width: 35,
    backgroundColor: "#007bff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },

  Body: {
    paddingLeft: 20,
    flex: 1
  }
});
