// React
import React, { Component } from "react";

//Api
import api from "../../services/api";

//React Native
import { View, Text } from "react-native";

// Components
import { Menu, Add, Spinner } from "../../components/index.js";

//Pages

//Main Styled Components
import { Container, Title } from "../../main-styles.js";

//Local Styled Components

export default class Blank extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Menu navigation={this.props.navigation} title="Blank" />
        <Add />
        <Container>
          <Title>hey</Title>
        </Container>
      </View>
    );
  }
}
