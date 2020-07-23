import React from "react";
import {
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

import spinner from "../../assets/logo_preto.png";

const Spinner = () => (
  <ScrollView style={styles.mainView} contentContainerStyle={styles.view}>
    <ActivityIndicator style={styles.spinner} size="large" color="#007bff" />
  </ScrollView>
);
const styles = StyleSheet.create({
  mainView: {
    position: "absolute",
    paddingTop: getStatusBarHeight(),
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flex: 1,
    zIndex: 1,
    backgroundColor: "#b0bbcc21"
  },

  view: {
    justifyContent: "center",
    // backgroundColor: "#e2e4e6",
    alignItems: "center",
    flex: 1
  },
  spinner: {
    display: "flex"
  }
});

export default Spinner;
