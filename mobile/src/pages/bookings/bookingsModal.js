// React
import React, { Component } from "react";

//Api
import api from "../../services/api";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import ViaCep from "react-via-cep";
import Icon from "react-native-vector-icons/FontAwesome5";

//React Native
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  DatePickerIOS,
  Button,
  TouchableOpacity
} from "react-native";

// Components
import {
  Spinner,
  Fechar,
  SaveCancel,
  SaveCancelModal,
  Box
} from "../../components/index.js";

//Pages
import { CustomerCard, ApartmentCard } from "../index.js";

//Main Styled Components
import {
  Container,
  Title,
  InputTexto,
  InputLabel,
  Card,
  ModalCard
} from "../../main-styles.js";

//Local Styled Components
import { Label, LabelText } from "./styles.js";
//
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

export default class BookingsModal extends Component {
  state = {
    newBooking: {
      customer: "",
      apartment: "",
      checkIn: "",
      checkOut: "",
      contract: "",
      time: "",
      amountTotal: 0
    },
    newCustomer: {
      nome: "",
      cpf: "",
      rg: "",
      phone: "",
      email: "",
      birthDate: "",
      streetNumber: ""
    },
    street: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    customer: "create",
    apartment: "hide",
    isLoading: false,
    customers: [],
    apartments: [],
    activeApartment: ""
  };

  _close = () => {
    this.props.close();
  };

  componentWillMount() {
    // this.state = this.defaultState;
    this.findApartments();
  }

  handleInputChange = (text, field, categ) => {
    if (categ === "c") {
      Object.assign(this.state.newCustomer, { [field]: text });
    } else {
      Object.assign(this.state.newBooking, { [field]: text });
    }
    console.log(this.state);
  };

  handleConfirm = () => {
    this.setState({ confirm: true });
  };

  handleSaveCustomer = async () => {
    this.setState({ isLoading: true });
    Object.assign(this.state.newCustomer, {
      street: this.state.street,
      bairro: this.state.bairro,
      cep: this.state.cep,
      city: this.state.cidade,
      uf: this.state.uf
    });
    await api.post("/customers", this.state.newCustomer);
    this.setState({ isLoading: false });
    this.props.close();
  };

  setCategory = categ => {
    Object.assign(this.state.newPayment, { category: categ });
    this.setState({ active: categ });
  };

  lookCEP = async (req, res) => {
    fetch(`http://viacep.com.br/ws/${this.state.newCustomer.cep}/json`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          cep: result.cep,
          street: result.logradouro,
          bairro: result.bairro,
          cidade: result.localidade,
          uf: result.uf
        });
      });
  };

  handleSearch = async search => {
    const response = await api.get(`/customers/search/${search}`);
    this.setState({ customers: response.data });
  };

  selectCustomer = customer => {
    Object.assign(this.state.newBooking, { customer: customer._id });
    this.setState({ customers: [customer], apartment: "show" });
    this.findApartments();
  };

  selectApartment = apartment => {
    Object.assign(this.state.newBooking, { apartment: apartment });
    this.setState({ activeApartment: apartment });
    console.log(this.state);
  };

  findApartments = async () => {
    const response = await api.get("/apartments/find");
    this.setState({ apartments: response.data });
  };

  render() {
    const {
      newBooking,
      newCustomer,
      customer,
      customers,
      apartment,
      street,
      cidade,
      bairro,
      uf,
      apartments,
      activeApartment,
      isLoading
    } = this.state;
    const { visible, close, type } = this.props;

    return (
      <Modal
        transparent
        style={{ flex: 1 }}
        visible={visible || false}
        animationType="slide"
      >
        <Fechar onPress={this._close} />
        {isLoading && <Spinner />}
        <View
          style={{
            height: getStatusBarHeight() + 30,
            backgroundColor: "#00000050"
          }}
        />
        <ScrollView
          style={{ marginTop: -20, backgroundColor: "white", borderRadius: 20 }}
          contentContainerStyle={styles.modalView}
        >
          <View>
            <Title style={{ paddingHorizontal: 20 }}>check in</Title>
            <View
              style={{
                flexDirection: "row",

                paddingLeft: 20,
                paddingRight: 10,
                paddingTop: 10
              }}
            >
              <Box
                bColor={customer === "create" ? "#007bff" : "#e2e4e6"}
                name="Criar Hospede"
                color={customer === "create" ? "white" : "#253858"}
                icon="plus"
                onPress={() => this.setState({ customer: "create" })}
              />
              <Box
                bColor={customer === "select" ? "#007bff" : "#e2e4e6"}
                name="Selecionar Hospede"
                color={customer === "select" ? "white" : "#253858"}
                icon="user-friends"
                onPress={() => this.setState({ customer: "select" })}
              />
            </View>
            <View style={styles.hr} />
            {customer === "create" ? (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    paddingHorizontal: 20,
                    color: "#253858"
                  }}
                >
                  cadastro de hóspede
                </Text>
                <InputTexto
                  onChangeText={text =>
                    this.handleInputChange(text, "nome", "c")
                  }
                  placeholder="Nome Completo"
                />
                <InputTexto
                  onChangeText={text =>
                    this.handleInputChange(text, "email", "c")
                  }
                  placeholder="Email"
                />
                <InputTexto
                  onChangeText={text =>
                    this.handleInputChange(text, "phone", "c")
                  }
                  placeholder="Telefone"
                />
                <InputTexto
                  onChangeText={text =>
                    this.handleInputChange(text, "cpf", "c")
                  }
                  placeholder="CPF"
                />
                <InputTexto
                  onChangeText={text => this.handleInputChange(text, "rg", "c")}
                  placeholder="RG"
                />
                <InputTexto
                  onChangeText={text =>
                    this.handleInputChange(text, "profissao", "c")
                  }
                  placeholder="Profissão"
                />
                <InputTexto
                  onChangeText={text =>
                    this.handleInputChange(text, "civil", "c")
                  }
                  placeholder="Estado Civil"
                />
                <DatePickerIOS
                  onDateChange={text =>
                    this.handleInputChange(text, "birthDate", "c")
                  }
                  initialDate={new Date()}
                  date={this.state.newCustomer.birthDate}
                  mode="date"
                />
                <View style={styles.hr} />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: 20
                  }}
                >
                  <InputTexto
                    style={{ flex: 1 }}
                    onChangeText={text =>
                      this.handleInputChange(text, "cep", "c")
                    }
                    placeholder="CEP"
                  />
                  <Button title="Buscar" onPress={this.lookCEP} />
                </View>

                <InputTexto placeholder="Rua" value={street} />
                <InputTexto
                  placeholder="Número"
                  onChangeText={text =>
                    this.handleInputChange(text, "streetNumber", "c")
                  }
                />
                <InputTexto placeholder="Bairro" value={bairro} />
                <InputTexto placeholder="Cidade" value={cidade} />

                <InputTexto placeholder="UF" value={uf} />
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: 20
                  }}
                >
                  <Icon name="search" size={18} />
                  <InputTexto
                    style={{ flex: 1 }}
                    onChangeText={text => this.handleSearch(text)}
                    placeholder="Pesquisar"
                  />
                </View>
                <FlatList
                  data={customers}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => (
                    <CustomerCard
                      key={item._id}
                      customer={item}
                      onSelect={customer => this.selectCustomer(customer)}
                    />
                  )}
                />
                <View style={styles.hr} />
                <View style={apartment === "hide" && { display: "none" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      paddingHorizontal: 20,
                      color: "#253858"
                    }}
                  >
                    apartamento
                  </Text>
                  <View style={styles.aptScrollView}>
                    {apartments.map(a => (
                      <TouchableOpacity
                        key={a._id}
                        onPress={() => this.selectApartment(`${a._id}`)}
                      >
                        <Label active={activeApartment === a._id}>
                          <LabelText>{a.number}</LabelText>
                        </Label>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      paddingHorizontal: 20,
                      color: "#253858"
                    }}
                  >
                    data check in
                  </Text>
                  <DatePickerIOS
                    onDateChange={text =>
                      this.handleInputChange(text, "birthDate", "c")
                    }
                    date={new Date()}
                    mode="date"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      paddingHorizontal: 20,
                      color: "#253858"
                    }}
                  >
                    data check out
                  </Text>
                  <DatePickerIOS
                    onDateChange={text =>
                      this.handleInputChange(text, "birthDate", "c")
                    }
                    date={new Date()}
                    mode="date"
                  />
                </View>
              </>
            )}
          </View>
          <SaveCancelModal
            onPressSave={this.handleSaveCustomer}
            onPressCancel={close}
          />
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  menuOpen: {},

  categorySelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30
  },

  modalView: {
    // backgroundColor: "red",
    paddingTop: getStatusBarHeight() + 20,
    paddingBottom: getBottomSpace(),
    // flex: 1
    // display: "flex",
    // height: 100 + "%",
    justifyContent: "space-around"
  },

  Modal: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  Total: {
    fontWeight: "700",
    fontSize: 12
  },

  aptScrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 20,
    marginBottom: 20
  },

  hr: {
    flex: 1,
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e4e6"
  }
});
