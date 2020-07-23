// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import Icon from "react-native-vector-icons/FontAwesome5";

//React Native
import { View, Text, StyleSheet } from "react-native";

// Components
import { Menu, Add, Spinner } from "../../components/index.js";

//Pages

//Main Styled Components
import { Container, Title } from "../../main-styles.js";

//Local Styled Components

export default class CustomerSingle extends Component {
  state = {
    customer: {},
    isLoading: true
  };

  componentWillMount() {
    this.loadCustomerDetails();
  }

  loadCustomerDetails = async () => {
    const id = this.props.navigation.getParam("id", "NO-ID");

    const response = await api.get(`/customers/${id}`);

    this.setState({ customer: response.data, isLoading: false });
  };

  render() {
    const { customer } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Menu navigation={this.props.navigation} onPressBack onPressEdit />
        <Container style={{ paddingHorizontal: 20 }}>
          <View style={styles.Circle}>
            <Icon name="user-circle" color="white" size={18} solid />
          </View>
          <Title style={{ textTransform: "none" }}>{customer.nome}</Title>
          <Text>{customer.email}</Text>
          <Text>{customer.phone}</Text>
          <Text>{customer.cpf}</Text>
          <Text>{customer.rg}</Text>
          <Text>{customer.profissao}</Text>
          <Text>{customer.civil}</Text>
          <Text>{customer.birthDate}</Text>
          <Text>{customer.cep}</Text>
          <Text>{customer.street}</Text>
          <Text>{customer.streetNumber}</Text>
          <Text>{customer.bairro}</Text>
          <Text>{customer.city}</Text>
          <Text>{customer.uf}</Text>
        </Container>
      </View>
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
    alignItems: "center",
    marginVertical: 10
  },

  Body: {
    paddingLeft: 20,
    flex: 1
  }
});
