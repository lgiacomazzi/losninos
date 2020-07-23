// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

//React Native
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl
} from "react-native";

// Components
import { Menu, Add, Spinner, Category } from "../../components/index.js";

//Pages

//Main Styled Components
import {
  Container,
  Title,
  Card,
  InfoText,
  ButtonDelete,
  SuccessText
} from "../../main-styles.js";

//Local Styled Components
import { Price } from "./styles.js";

export default class PaymentsSingle extends Component {
  state = {
    payment: {},
    isLoading: true,
    editState: false
  };

  componentWillMount() {
    this.loadPaymentDetails();
  }

  loadPaymentDetails = async () => {
    const id = this.props.navigation.getParam("id", "NO-ID");

    const response = await api.get(`/payments/${id}`);

    this.setState({
      payment: response.data,
      isLoading: false
    });
  };

  setEditState = () => {
    this.setState({ editState: true });
  };

  handleDelete = async () => {
    const id = this.props.navigation.getParam("id", "NO-ID");
    await api.delete(`/payments/${id}`);
    this.props.navigation.goBack();
  };

  render() {
    const { payment, isLoading, editState } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Menu
          navigation={this.props.navigation}
          onPressBack
          onPressEdit={this.setEditState}
        />
        <Container>
          <View style={styles.View}>
            <Category category={payment.category} active={true} size={1.5} />
            <Title>{payment.title}</Title>
            <Text style={styles.date}>
              {format(payment.createdAt, "DD MMMM YYYY", { locale: pt })}
            </Text>
            <Price>
              <Text style={styles.Total}>R$ {payment.amountTotal}</Text>
            </Price>
            {this.state.editState === true && (
              <ButtonDelete onPress={this.handleDelete}>
                <SuccessText>Deletar</SuccessText>
              </ButtonDelete>
            )}
          </View>
          {isLoading && <Spinner />}
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  date: {
    margin: 10
  },
  Total: {
    fontWeight: "700",
    fontSize: 12
  }
});
