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
import { Container, Title, Card } from "../../main-styles.js";

//Local Styled Components
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  AptCard,
  AptCardTitle,
  AptCardCard,
  AptCardCardText
} from "./styles.js";

export default class ApartmentCard extends Component {
  render() {
    const { apartment, navigation } = this.props;
    const status = apartment.status;

    return (
      <AptCard
        onPress={() =>
          navigation.navigate("ApartmentSingle", {
            id: apartment._id
          })
        }
        alugado={status === "Alugado" && true}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <AptCardTitle>{apartment.number}</AptCardTitle>
          <Icon
            name={status === "Alugado" ? "lock" : "key"}
            size={18}
            color={status === "Alugado" ? "#253858" : "#253858"}
          />
        </View>
        <AptCardCard>
          <AptCardCardText>
            {status === "Alugado" ? "Nome do Hóspede" : "---"}
          </AptCardCardText>
        </AptCardCard>
      </AptCard>
    );
  }
}
