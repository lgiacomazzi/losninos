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
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";

// Components
import {
  Spinner,
  Fechar,
  SaveCancel,
  SaveCancelModal,
  Category,
  CategorySelector
} from "../../components/index.js";

//Pages
import { PaymentLine } from "../index.js";

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
import { Price } from "./styles.js";
import { Label, LabelText } from "../bookings/styles.js";
//
import {
  getBottomSpace,
  getStatusBarHeight
} from "react-native-iphone-x-helper";

export default class PaymentsModal extends Component {
  state = {
    newPayment: {
      title: "",
      amountTotal: 0,
      type: "",
      category: "p"
    },
    active: "p",
    confirm: false,
    isLoading: false,
    apartments: [],
    activeApartment: ""
  };

  componentWillMount() {
    Object.assign(this.state.newPayment, { type: this.props.type });
    this.loadApartments();
  }

  loadApartments = async () => {
    const response = await api.get("/apartments/find");
    this.setState({ apartments: response.data });
  };

  handleInputChange = (text, field) => {
    Object.assign(this.state.newPayment, { [field]: text });
  };

  handleConfirm = () => {
    this.setState({ confirm: true });
  };

  handleSave = async () => {
    this.setState({ isLoading: true });
    await api.post("/payments", this.state.newPayment);
    this.setState({ confirm: false, isLoading: false });
    this.props.close();
  };

  setCategory = categ => {
    Object.assign(this.state.newPayment, { category: categ });
    this.setState({ active: categ });
  };

  selectApartment = apartment => {
    const pack = {
      title:
        apartment.number + " - " + format(new Date(), "MM/YYYY", { locale: pt })
    };
    // alert(JSON.stringify(pack.title));
    Object.assign(this.state.newPayment, pack);
    this.setState({ activeApartment: apartment._id });
  };

  render() {
    const { confirm, apartments, activeApartment } = this.state;
    const { visible, close, type } = this.props;
    const { title, amountTotal, category } = this.state.newPayment;

    return (
      <Modal
        style={{ flex: 1 }}
        visible={visible || false}
        animationType="slide"
      >
        <Fechar onPress={close} />
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
            <Title style={{ paddingHorizontal: 20 }}>
              {type === "In" ? "novo recebimento" : "nova despesa"}
            </Title>
            {type === "In" && (
              <View style={styles.aptScrollView}>
                {apartments.map(a => (
                  <TouchableOpacity
                    key={a._id}
                    onPress={() => this.selectApartment(a)}
                  >
                    <Label active={activeApartment === a._id}>
                      <LabelText active={activeApartment === a._id}>
                        {a.number}
                      </LabelText>
                    </Label>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {type === "Out" && (
              <View>
                <CategorySelector
                  setState={categ => this.setCategory(categ)}
                  active={this.state.active}
                />
                <InputTexto
                  onChangeText={text => this.handleInputChange(text, "title")}
                  placeholder="Título"
                  autoFocus={true}
                />
              </View>
            )}
            <View
              style={{
                marginLeft: 20,
                padding: 20,
                height: 75,
                width: 50 + "%",
                borderRadius: 14,
                backgroundColor: "#007bff"
              }}
            >
              <Text style={{ color: "white" }}>R$</Text>
              <TextInput
                onChangeText={text =>
                  this.handleInputChange(text, "amountTotal")
                }
                keyboardType={"numeric"}
                placeholder="1.000"
                style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "700",
                  flex: 0
                }}
              />
            </View>
          </View>
          <SaveCancelModal
            onPressSave={this.handleConfirm}
            onPressCancel={close}
          />
          <Modal visible={confirm} style={styles.Modal}>
            <ModalCard style={{ paddingTop: getStatusBarHeight() + 60 }}>
              {this.state.isLoading ? (
                <Spinner />
              ) : (
                <>
                  {type === "Out" && (
                    <Category category={category} active={true} size={1.5} />
                  )}
                  <Text style={{ textAlign: "center" }}>Deseja confirmar?</Text>
                  <Title style={{ textAlign: "center", margin: 10 }}>
                    {title}
                  </Title>
                  <Price>
                    <Text style={styles.Total}>R$ {amountTotal}</Text>
                  </Price>
                  <Text style={{ textAlign: "center", margin: 10 }}>
                    {format(new Date(), "DD MMMM YYYY - HH:mm ", {
                      locale: pt
                    })}
                  </Text>
                </>
              )}
            </ModalCard>
            <SaveCancelModal
              onPressSave={this.handleSave}
              onPressCancel={() => this.setState({ confirm: false })}
            />
          </Modal>
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
    marginVertical: 20
  }
});
