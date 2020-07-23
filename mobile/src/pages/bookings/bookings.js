// React
import React, { Component } from "react";

//Api
import api from "../../services/api";

//React Native
import { View, Text, FlatList } from "react-native";

// Components
import { Menu, Add, Spinner } from "../../components/index.js";

//Pages
import { ReservaCard } from "../index.js";

//Main Styled Components
import { Container, Title, Card } from "../../main-styles.js";

//Local Styled Components

export default class Bookings extends Component {
  state = {
    bookings: [],
    isLoading: true
  };

  componentWillMount() {
    this.loadBookings();
  }

  loadBookings = async () => {
    const response = await api.get("/bookings");
    this.setState({ bookings: response.data, isLoading: false });
  };

  render() {
    const { bookings } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Menu
          navigation={this.props.navigation}
          title="Reservas"
          onPressPlus
          onPressSearch
        />

        {this.state.isLoading && <Spinner />}
        <Container>
          <FlatList
            data={bookings}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ReservaCard navigation={this.props.navigation} booking={item} />
            )}
          />
        </Container>
      </View>
    );
  }
}
