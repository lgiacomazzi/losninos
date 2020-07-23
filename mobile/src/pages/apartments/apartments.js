// React
import React, { Component } from "react";

//Icons
import Icon from "react-native-vector-icons/MaterialIcons";

//Api
import api from "../../services/api";

//React Native
import {
  View,
  ScrollView,
  Slider,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";

// Components
import { Menu, Bubble, Add, Spinner } from "../../components/index.js";

//Pages
import {
  PaymentsChart,
  ApartmentsChart,
  CreateApt,
  ApartmentCard
} from "../index.js";

//Main Styled Components
import { Container, Title } from "../../main-styles.js";

//Local Styled Components
import {
  AptCard,
  AptCardTitle,
  AptCardCard,
  AptCardCardText
} from "./styles.js";

export default class Apartments extends Component {
  state = {
    apartments: [],
    apartmentsInfo: {},
    page: 1,
    isLoading: true,
    createApt: false
  };

  componentDidMount() {
    this.loadApartments();
  }

  loadApartments = async (page = 1) => {
    const response = await api.get("/apartments");

    const { docs, ...apartmentsInfo } = response.data;

    this.setState({ apartments: docs, apartmentsInfo, page, isLoading: false });
  };

  openModal = () => {
    this.setState({ createApt: true });
  };

  closeModal = () => {
    this.setState({ createApt: false });
    this.loadApartments();
  };

  render() {
    const { apartments } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Menu
          navigation={this.props.navigation}
          title="Apartamentos"
          onPressPlus={this.openModal}
        />
        <CreateApt visible={this.state.createApt} close={this.closeModal} />
        {this.state.isLoading && <Spinner />}
        <Container style={{ backgroundColor: "white" }}>
          <FlatList
            data={apartments}
            numColumns={2}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ApartmentCard
                navigation={this.props.navigation}
                apartment={item}
              />
            )}
          />
        </Container>
      </View>
    );
  }
}
