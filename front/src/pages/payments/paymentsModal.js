import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Modal, Button, ButtonGroup, Form, Col } from "react-bootstrap";

export default class NewPayment extends Component {
  state = {
    type: "",
    show: false,
    newPayment: {}
  };

  componentDidMount() {
    if (this.props.type === "in") {
      this.setState({ type: "In" });
    }
    if (this.props.type === "out") {
      this.setState({ type: "Out" });
    }
  }

  handleClose = () => {
    this.props.hideModal();
  };

  handleInputChange = e => {
    const value = e.target.value;
    const changes = { [e.target.name]: value };

    this.setState({
      newPayment: Object.assign(this.state.newPayment, changes)
    });
  };

  handleSave = async e => {
    if (this.props.type === "in") {
      this.setState({
        newBooking: Object.assign(this.state.newPayment, { type: "In" })
      });
    }
    if (this.props.type === "out") {
      this.setState({
        newBooking: Object.assign(this.state.newPayment, { type: "Out" })
      });
    }

    await api.post("/payments", this.state.newPayment);
    this.handleClose();
  };

  render() {
    return (
      <>
        <Modal size="lg" show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.type === "In" && <h1>Novo Recebimento</h1>}
              {this.state.type === "Out" && <h1>Nova Despesa</h1>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder={
                      this.state.type === "In" ? "Recebimento" : "Conta de Luz"
                    }
                    onChange={this.handleInputChange}
                    defaultValue=""
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Valor</Form.Label>
                  <Form.Control
                    type="number"
                    name="amountTotal"
                    placeholder="R$ 1000"
                    defaultValue=""
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Form.Row>
              {this.state.type === "In" && (
                <Form.Group>
                  <Form.Label>Apartmento</Form.Label>
                  <Form.Control
                    type="text"
                    name="apartment"
                    placeholder="201"
                    defaultValue=""
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="dark" onClick={this.handleClose}>
              Fechar
            </Button>
            <Button size="sm" variant="dark" onClick={this.handleSave}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
