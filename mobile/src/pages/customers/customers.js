// React
import React, { Component } from "react";

//Api
import api from "../../services/api";

//React Native
import { View, Text, FlatList } from "react-native";

// Components
import { Menu, Spinner } from "../../components/index.js";

//Pages
import { CustomerCard } from "../index.js";

//Main Styled Components
import { Container, Title } from "../../main-styles.js";

//Local Styled Components

export default class Customers extends Component {
  state = {
    customers: [],
    isLoading: true
  };

  componentWillMount() {
    this.loadCustomers();
  }

  loadCustomers = async () => {
    const response = await api.get("/customers");
    this.setState({ customers: response.data.docs, isLoading: false });
  };

  render() {
    const { customers, isLoading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Menu
          navigation={this.props.navigation}
          title="Hóspedes"
          onPressPlus
          onPressSearch
        />
        {isLoading && <Spinner />}
        <Container>
          <FlatList
            data={customers}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <CustomerCard
                key={item._id}
                customer={item}
                navigation={this.props.navigation}
              />
            )}
          />
        </Container>
      </View>
    );
  }
}
