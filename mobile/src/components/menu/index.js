import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
const StatusBarHeight = getStatusBarHeight();

import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import logo from "../../assets/logo.png";
import Icon from "react-native-vector-icons/FontAwesome5";

import Bubble from "../../components/bubble/bubble.js";
import { BubblePack, BubbleButton, MenuLogo } from "./styles.js";

import { Title } from "../../main-styles.js";

export default class Menu extends Component {
  state = {
    menu: false
  };

  toggleShow = e => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.setState({ menu: true });
  };

  toggleHide = e => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.setState({ menu: false });
  };

  navigateTo = name => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.navigation.navigate(`${name}`);
  };

  goBack = () => {
    ReactNativeHapticFeedback.trigger("impactLight");
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.Menu}>
        {this.props.back ? (
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.goBack}
          >
            <Icon name="chevron-left" color="black" size={18} />
          </TouchableOpacity>
        ) : (
          <MenuLogo style={styles.mainMenu} onPress={this.toggleShow}>
            <Image source={logo} style={styles.logo} />
          </MenuLogo>
        )}
        <Title>{this.props.title}</Title>
        <Modal
          style={styles.menuOpen}
          visible={this.state.menu}
          animationType="fade"
        >
          <View style={styles.menuOpen}>
            <TouchableOpacity style={styles.fechar} onPress={this.toggleHide}>
              <Icon name="times" size={16} color="white" />
            </TouchableOpacity>

            <BubblePack>
              <BubbleButton onPress={() => this.navigateTo("Dashboard")}>
                <Bubble
                  name="Dashboard"
                  icon="home"
                  size={1.5}
                  color="#007bff"
                />
              </BubbleButton>
              <BubbleButton onPress={() => this.navigateTo("Calendar")}>
                <Bubble
                  name="Calendário"
                  icon="calendar-alt"
                  size={1.5}
                  color="#ff9800"
                  solid
                />
              </BubbleButton>
              <BubbleButton onPress={() => this.navigateTo("Bookings")}>
                <Bubble
                  name="Reservas"
                  icon="bookmark"
                  color="#e91e63"
                  size={1.5}
                  solid
                />
              </BubbleButton>
              <BubbleButton onPress={() => this.navigateTo("Payments")}>
                <Bubble
                  name="Financeiro"
                  icon="money-bill"
                  color="#8bc34a"
                  size={1.5}
                />
              </BubbleButton>

              <BubbleButton onPress={() => this.navigateTo("Customers")}>
                <Bubble name="Hospedes" icon="users" size={1.5} />
              </BubbleButton>
              <BubbleButton onPress={() => this.navigateTo("Apartments")}>
                <Bubble name="Apartamentos" icon="door-closed" size={1.5} />
              </BubbleButton>
            </BubblePack>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Menu: {
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",

    paddingTop: StatusBarHeight + 10,
    paddingHorizontal: 20,
    paddingBottom: 10
    // borderBottomWidth: 1,
    // borderBottomColor: "#eee"
  },

  logo: {
    height: 20,
    width: 20
  },

  mainMenu: {
    // height: 40,
    // width: 40,
    backgroundColor: "black",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "none"
  },

  menuOpen: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "white"
  },

  fechar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: 40,
    height: 40,
    zIndex: 1,
    borderRadius: 50,

    position: "absolute",
    top: StatusBarHeight + 20,
    left: 20
  }
});
