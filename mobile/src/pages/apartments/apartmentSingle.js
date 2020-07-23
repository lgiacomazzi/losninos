// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import Icon from "react-native-vector-icons/FontAwesome5";
//React Native
import { View, Text, TouchableOpacity, Switch } from "react-native";

// Components
import { Menu, Add, Spinner } from "../../components/index.js";

//Pages
import { ReservaCard } from "../index.js";

//Main Styled Components
import { Container, Title, Card, InfoText } from "../../main-styles.js";

//Local Styled Components
import { AptHistory } from "./styles.js";

export default class ApartmentSingle extends Component {
  state = {
    apartment: {},
    copyState: "",
    bookings: [],
    isLoading: true
  };

  componentWillMount() {
    this.loadApartmentDetails();
    this.loadApartmentHistory();
  }

  loadApartmentDetails = async () => {
    const id = this.props.navigation.getParam("id", "NO-ID");

    const response = await api.get(`/apartments/${id}`);

    this.setState({ apartment: response.data });
  };

  loadApartmentHistory = async () => {
    const id = this.props.navigation.getParam("id", "NO-ID");
    const response = await api.get(`/bookings`);

    const filter = response.data.filter(a => a.apartment._id === id);

    this.setState({ bookings: filter, isLoading: false });
  };

  toggleStatus = () => {
    if (this.state.copyState === "Alugado") {
      this.setState({ copyState: "Disponivel" });
    } else {
      this.setState({ copyState: "Alugado" });
    }
  };
  render() {
    const { apartment, isLoading, bookings, copyState } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Menu navigation={this.props.navigation} onPressBack onPressConfig />
        <Container>
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Title>{apartment.number}</Title>
              <Icon
                name={copyState === "Alugado" ? "lock" : "key"}
                size={18}
                color={copyState === "Alugado" ? "#253858" : "#253858"}
              />
            </View>
          </Card>

          <Switch
            onValueChange={this.toggleStatus}
            value={copyState === "Alugado" ? true : false}
          />
          {isLoading && <Spinner />}
          <AptHistory>
            <Text>Próximas Reservas</Text>
            {bookings.map(b => (
              <ReservaCard key={b._id} booking={b} />
            ))}
            {isLoading === false && bookings.length == 0 && (
              <InfoText>
                Não foram encontradas reservas para este apartamento.
              </InfoText>
            )}
          </AptHistory>
        </Container>
      </View>
    );
  }
}
