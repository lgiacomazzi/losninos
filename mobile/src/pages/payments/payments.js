// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";
//React Native
import { View, FlatList, Text } from "react-native";

// Components
import { Menu, Add, Spinner } from "../../components/index.js";

//Pages
import {
  PaymentsModal,
  Selector,
  PaymentLine,
  PaymentsSearch
} from "../index.js";

//Main Styled Components
import { Container, Title, InfoText } from "../../main-styles.js";

//Local Styled Components

export default class Payments extends Component {
  state = {
    search: false,
    active: "Out",
    payments: [],
    sum: "",
    isLoading: true,
    activeFilter: false,
    month: "",
    year: "",
    categ: ""
  };

  componentWillMount() {
    this.getPayments("/payments");
  }

  goFilter = (month, year, categ) => {
    this.setState({ payments: [], isLoading: true });
    // alert(`/c?month=${month}&year=${year}`);
    this.getPayments(`/c?month=${month}&year=${year}`);
    this.setState({ search: false, activeFilter: true, month, year, categ });
  };

  getPayments = async route => {
    const { active } = this.state;
    const response = await api.get(`${route}`);

    const docs = response.data;

    // Acha valores In ou Out
    const itens = docs.filter(d => d.type === this.state.active);
    //Troca o Sinal In ou Out
    const total = itens.map(d => {
      if (d.type === "Out") {
        return d.amountTotal * -1;
      }
      if (d.type === "In") {
        return d.amountTotal;
      }
    });
    //Soma toda a lista
    const sum = total.reduce((acc, currValue) => {
      return acc + currValue;
    }, 0);

    this.setState({
      payments: itens,
      sum: sum,
      isLoading: false
    });
  };

  openModal = () => {
    this.setState({ search: true });
  };

  closeModal = () => {
    this.setState({ search: false });
  };

  viewReceitas = () => {
    this.setState({ active: "In", isLoading: true, payments: [] });
    const { month, year, categ } = this.state;
    if (this.state.activeFilter) {
      this.goFilter(month, year, categ);
    } else {
      this.getPayments("/payments");
    }
  };

  viewDespesas = () => {
    const { month, year, categ } = this.state;
    this.setState({ active: "Out", isLoading: true, payments: [] });
    if (this.state.activeFilter) {
      this.goFilter(month, year, categ);
    } else {
      this.getPayments("/payments");
    }
  };

  render() {
    const {
      payments,
      isLoading,
      search,
      active,
      month,
      year,
      activeFilter,
      sum
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Menu
          navigation={this.props.navigation}
          title="Financeiro"
          onPressPlus
        />
        <Selector
          onPressReceitas={this.viewReceitas}
          onPressDespesas={this.viewDespesas}
          filter={(month, year) => this.goFilter(month, year)}
          active={active}
        />
        {isLoading && <Spinner />}
        {!isLoading && (
          <Container>
            {isLoading === false && payments.length === 0 && (
              <InfoText>
                Não foram encontrados lançamentos para o período
                {format(new Date(`${year}/${month}/01`), " MMMM YYYY", {
                  locale: pt
                })}
              </InfoText>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 10
              }}
            >
              <Text style={{ fontWeight: "700", color: "#253858" }}>
                R$ {parseFloat(sum).toFixed(2)}
              </Text>
            </View>
            <FlatList
              data={payments}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <PaymentLine
                  navigation={this.props.navigation}
                  payment={item}
                />
              )}
            />
          </Container>
        )}
      </View>
    );
  }
}
