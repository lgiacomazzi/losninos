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
import { Add } from "../index.js";
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
    const {
      onPressPlus,
      onPressBack,
      onPressFilter,
      onPressSearch,
      onPressConfig,
      onPressEdit
    } = this.props;

    return (
      <View style={styles.Menu}>
        {onPressBack && <Add onPress={this.goBack} icon="chevron-left" />}
        <Title style={{ marginRight: "auto" }}>{this.props.title}</Title>
        {onPressPlus && <Add onPress={onPressPlus} icon="plus" />}
        {onPressFilter && (
          <Add
            onPress={onPressFilter}
            activeFilter={this.props.activeFilter}
            icon="filter"
          />
        )}
        {onPressSearch && <Add onPress={onPressSearch} icon="search" />}
        {onPressConfig && <Add onPress={onPressConfig} icon="cog" />}
        {onPressEdit && <Add onPress={onPressEdit} icon="pen" />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Menu: {
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",

    paddingTop: StatusBarHeight + 10,
    paddingLeft: 15,
    paddingRight: 10,
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
