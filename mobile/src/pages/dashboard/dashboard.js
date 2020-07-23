// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

//React Native
import {
  View,
  Modal,
  ScrollView,
  Slider,
  Text,
  Button,
  TouchableOpacity
} from "react-native";

// Components
import { Menu, Bubble, Box, Spinner } from "../../components/index.js";

//Pages
import {
  PaymentsChart,
  ApartmentsChart,
  PaymentsModal,
  BookingsModal,
  CreateApt
} from "../index.js";

//Main Styled Components
import { Container, Title } from "../../main-styles.js";

//Local Styled Components
import { BubbleShortcut, BubbleButton } from "./styles.js";

export default class Dashboard extends Component {
  state = {
    checkin: false,
    pagar: false,
    receber: false,
    // pagar: false,
    limpeza: false,
    hospede: false
  };

  showModal = e => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.setState({
      [e]: true
    });
  };

  hideModal = e => {
    this.setState({
      checkin: false,
      receber: false,
      pagar: false,
      limpeza: false,
      hospede: false
    });
  };

  navigateTo = name => {
    this.props.navigation.navigate(`${name}`);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Menu navigation={this.props.navigation} title="Dashboard" />
        <Container>
          <BubbleShortcut>
            <Box
              name="Check In"
              icon="sign-in-alt"
              color="white"
              bColor="#e91e63"
              onPress={() => this.showModal("checkin")}
            />
            <Box
              name="Receber"
              icon="money-bill-wave"
              color="white"
              bColor="#8bc34a"
              onPress={() => this.showModal("receber")}
            />
            <Box
              name="Despesas"
              icon="file"
              color="white"
              bColor="#007bff"
              onPress={() => this.showModal("pagar")}
            />
            <Box
              name="Limpeza"
              icon="recycle"
              color="white"
              bColor="#ff9800"
              onPress={() => this.showModal("limpeza")}
            />
            <Box
              name="+ Hospede"
              icon="user"
              solid
              color="white"
              bColor="#000"
              onPress={() => this.showModal("hospede")}
            />
            <Box
              name="+ Apto"
              icon="door-closed"
              solid
              color="white"
              bColor="#000"
              onPress={() => this.showModal("hospede")}
            />
            <Box />
          </BubbleShortcut>

          <PaymentsModal
            visible={this.state.receber}
            close={this.hideModal}
            type="In"
          />
          <PaymentsModal
            visible={this.state.pagar}
            close={this.hideModal}
            type="Out"
          />
          <BookingsModal visible={this.state.checkin} close={this.hideModal} />
        </Container>
      </View>
    );
  }
}
