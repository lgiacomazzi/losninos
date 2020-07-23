import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { format } from "date-fns";

export default class NewCustomer extends Component {
  state = {
    show: false,
    newCustomer: {}
  };

  handleClose = () => {
    this.props.hideModal();
  };

  handleSave = async e => {
    const response = await api.post("/customers", this.state.newCustomer);
    this.handleClose();
  };

  handleInputChange = e => {
    const value = e.target.value;
    const changes = { [e.target.name]: value };

    this.setState({
      newCustomer: Object.assign(this.state.newCustomer, changes)
    });
  };

  render() {
    return (
      <Modal size="lg" show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span class="far fa-user" />
            <h1>Novo Hóspede</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="nome"
                    placeholder="Nome e Sobrenome"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Doc. Identidade</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="cpf"
                    placeholder="RG ou CPF"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    size="sm"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Telefone / Celular</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="(00) 00000 0000"
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>CEP</Form.Label>
                  <Form.Control size="sm" type="text" placeholder="" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control size="sm" type="text" placeholder="Cidade" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>UF</Form.Label>
                  <Form.Control
                    size="sm"
                    as="select"
                    placeholder=""
                    defaultValue="RS"
                  >
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col sm={8}>
                <Form.Group>
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control size="sm" type="text" placeholder="" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Casa, Apto"
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group>
              <Form.Label>Observação</Form.Label>
              <Form.Control size="sm" as="textarea" rows="3" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="dark" onClick={this.handleClose}>
            Cancelar
          </Button>
          <Button size="sm" variant="dark" onClick={this.handleSave}>
            Salvar e Criar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
