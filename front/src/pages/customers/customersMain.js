import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { format } from "date-fns";

import List from "../../components/list";
import Spinner from "../../components/spinner";

import "./styles.css";

export default class CustomersMain extends Component {
  state = {
    customers: [],
    customersInfo: {},
    page: 1,
    show: false,
    newName: "",
    newCpf: "",
    isLoading: true,
    tableData: {}
  };

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = async (page = 1) => {
    this.isLoading = true;

    const response = await api.get("/customers");

    const { docs, ...customersInfo } = response.data;

    this.setState({
      customers: docs,
      customersInfo,
      page,
      tableData: response
    });

    this.setState({ isLoading: false });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleSave = async e => {
    const response = await api.post("/customers", {
      nome: this.state.newName,
      cpf: this.state.newCpf
    });
    this.setState({ show: false });

    this.props.history.push(`/customers/${response.data._id}`);
  };

  handleInputChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  render() {
    const { customers } = this.state;

    return (
      <div className="main-page">
        <div className="title-bar">
          <h1 className="float-left">Hóspedes</h1>
          <Button
            className="ml-3"
            size="sm"
            variant="outline-dark"
            onClick={this.handleShow}
          >
            <span className="fa fa-plus mr-1" />
            <span>Criar</span>
          </Button>
        </div>
        <List
          location={this.props.location}
          showCreate={this.handleShow.bind(this)}
          data={this.state.tableData}
        />
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>

          <tbody>
            {this.state.isLoading === true && (
              <tr>
                <td colSpan="5">
                  <Spinner />
                </td>
              </tr>
            )}
            {this.state.isLoading === false &&
              customers.map(customer => (
                <tr key={customer._id}>
                  <td>
                    <span class="far fa-user" />
                  </td>
                  <td>
                    <Link to={`/customers/${customer._id}`}>
                      {customer.nome}
                    </Link>
                  </td>
                  <td>{customer.cpf}</td>
                  <td>{format(customer.createdAt, "DD/MM/YYYY")}</td>
                  <td>
                    {customer.updatedAt &&
                      format(customer.updatedAt, "DD/MM/YYYY")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
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
                      name="newName"
                      placeholder="Nome e Sobrenome"
                      value={this.state.newName}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Doc. Identidade</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      name="newCpf"
                      placeholder="RG ou CPF"
                      value={this.state.cpf}
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
      </div>
    );
  }
}
