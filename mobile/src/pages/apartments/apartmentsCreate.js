// React
import React, { Component } from "react";

//Api
import api from "../../services/api";

//React Native
import {
  View,
  ScrollView,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

// Components
import {
  Menu,
  Add,
  Spinner,
  Fechar,
  Salvar,
  Cancelar,
  Box
} from "../../components/index.js";

//Pages

//Main Styled Components
import { Container, Title, InputTexto, InputLabel } from "../../main-styles.js";

//Local Styled Components

//
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

export default class CreateApt extends Component {
  state = {
    newApartment: {
      number: "",
      status: "",
      type: ""
    },
    apartmentTypes: [],
    tipo: ""
  };

  componentWillMount() {
    this.getTypes();
  }

  getTypes = async () => {
    const response = await api.get("/types");
    this.setState({
      apartmentTypes: response.data
    });
    console.log(response.data);
  };

  setType = tipo => {
    Object.assign(this.state.newApartment, { type: tipo });
    this.setState({ tipo: tipo });
  };

  handleInputChange = (text, field) => {
    Object.assign(this.state.newApartment, { [field]: text });
    console.log(this.state.newApartment);
  };

  handleSave = async () => {
    await api.post("/apartments", this.state.newApartment);
    this.props.close();
  };

  render() {
    const { apartmentTypes } = this.state;
    return (
      <Modal visible={this.props.visible || false} animationType="slide">
        <Fechar onPress={this.props.close} />
        <ScrollView
          style={styles.modalContainer}
          contentContainerStyle={styles.contentStyle}
        >
          <View>
            <Title style={{ marginLeft: 15 }}>Novo apartamento </Title>
            <InputTexto
              onChangeText={text => this.handleInputChange(text, "number")}
              keyboardType={"numeric"}
              placeholder="Digite aqui o Número"
            />
            <ScrollView
              style={{ paddingLeft: 20, paddingRight: 100 }}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              {apartmentTypes.map(t => (
                <TouchableOpacity
                  key={t._id}
                  onPress={() => this.setType(`${t._id}`)}
                >
                  <Box
                    icon="sign-in-alt"
                    color="white"
                    bColor="#007bff"
                    name={t.name}
                    active={this.state.tipo === t._id}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <InputTexto
              onChangeText={text => this.handleInputChange(text, "status")}
              placeholder="Alugado ou Disponível"
            />
          </View>
          <View>
            <Salvar onPress={this.handleSave} />
            <Cancelar onPress={this.props.close} />
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  menuOpen: {},

  modalContainer: {
    backgroundColor: "white"
  },

  contentStyle: {
    paddingTop: getStatusBarHeight() + 50,
    justifyContent: "space-between",
    height: 100 + "%",
    paddingBottom: getBottomSpace()
  }
});
