import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import { Modal, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";

import Spinner from "../../components/spinner";

import "./styles.css";

export default class ApartmentsMain extends Component {
  state = {
    apartments: [],
    apartmentsInfo: {},
    apartmentTypes: [],
    page: 1,
    show: false,
    newNumber: "",
    newApartment: {
      status: "Disponivel"
    },
    isLoading: true
  };

  componentDidMount() {
    this.loadApartments();
  }

  loadApartments = async (page = 1) => {
    const response = await api.get("/apartments");

    const { docs, ...apartmentsInfo } = response.data;

    this.setState({ apartments: docs, apartmentsInfo, page, isLoading: false });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.loadTypes();
    this.setState({ show: true });
  };

  handleSave = async e => {
    const response = await api.post("/apartments", this.state.newApartment);
    this.setState({ show: false });
    // this.props.history.push(`/apartments/${response.data._id}`);
    console.log(response);
    this.loadApartments();
  };

  handleInputChange = e => {
    const changes = { [e.target.name]: e.target.value };
    Object.assign(this.state.newApartment, changes);
    console.log(this.state.newApartment);
  };

  loadTypes = async () => {
    const response = await api.get("/types");
    this.setState({
      apartmentTypes: response.data
    });
  };

  render() {
    const { apartments } = this.state;

    return (
      <div className="main-page">
        <div className="title-bar">
          <h1>Apartamentos</h1>
          <Button
            className="ml-auto"
            variant="outline-dark"
            size="sm"
            onClick={this.handleShow}
          >
            <span className="fa fa-plus" />
          </Button>
          <Link
            className="ml-auto"
            variant="outline-dark"
            size="sm"
            to="/apartment/types"
          >
            <span className="fa fa-plus" />
          </Link>
        </div>
        <div className="title-bar" />
        {this.state.isLoading === true && <Spinner />}
        <div className="row mb-4">
          {this.state.isLoading === false &&
            apartments
              .filter(a => {
                return a.status === "Disponivel";
              })
              .map(apartment => (
                <div
                  className="col col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                  key={apartment._id}
                >
                  <Link
                    to={`/apartments/${apartment._id}`}
                    className={
                      apartment.status === "Alugado"
                        ? "card ap-card rented mb-4"
                        : "card ap-card mb-4"
                    }
                    disabled={apartment.status === "Indisponivel"}
                  >
                    <div className="card-body">
                      <div className="card-title">
                        <h5 className="">{apartment.number}</h5>
                        {apartment.status === "Indisponivel" && (
                          <span className="fa fa-times-circle" />
                        )}
                        {apartment.status === "Alugado" && (
                          <span className="fa fa-lock" />
                        )}
                        {apartment.status === "Disponivel" && (
                          <span className="fa fa-key" />
                        )}
                      </div>
                    </div>
                    <div className="card-footer">
                      <small>Check out:</small>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
        <div className="row mb-4">
          {this.state.isLoading === false &&
            apartments
              .filter(a => {
                return a.status === "Alugado";
              })
              .map(apartment => (
                <div
                  className="col col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                  key={apartment._id}
                >
                  <Link
                    to={`/apartments/${apartment._id}`}
                    className={
                      apartment.status === "Alugado"
                        ? "card ap-card rented mb-4"
                        : "card ap-card mb-4"
                    }
                    disabled={apartment.status === "Indisponivel"}
                  >
                    <div className="card-body">
                      <div className="card-title">
                        <h5 className="">{apartment.number}</h5>
                        {apartment.status === "Indisponivel" && (
                          <span className="fa fa-times-circle" />
                        )}
                        {apartment.status === "Alugado" && (
                          <span className="fa fa-lock" />
                        )}
                        {apartment.status === "Disponivel" && (
                          <span className="fa fa-key" />
                        )}
                      </div>
                    </div>
                    <div className="card-footer">
                      <small>Check out:</small>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
        <div className="row mb-4">
          {this.state.isLoading === false &&
            apartments
              .filter(a => {
                return a.status === "Indisponivel";
              })
              .map(apartment => (
                <div
                  className="col col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                  key={apartment._id}
                >
                  <Link
                    to={`/apartments/${apartment._id}`}
                    className={
                      apartment.status === "Alugado"
                        ? "card ap-card rented mb-4"
                        : "card ap-card mb-4"
                    }
                    disabled={apartment.status === "Indisponivel"}
                  >
                    <div className="card-body">
                      <div className="card-title">
                        <h5 className="">{apartment.number}</h5>
                        {apartment.status === "Indisponivel" && (
                          <span className="fa fa-times-circle" />
                        )}
                        {apartment.status === "Alugado" && (
                          <span className="fa fa-lock" />
                        )}
                        {apartment.status === "Disponivel" && (
                          <span className="fa fa-key" />
                        )}
                      </div>
                    </div>
                    <div className="card-footer">
                      <small>Check out:</small>
                    </div>
                  </Link>
                </div>
              ))}
        </div>

        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Novo Apartamento</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Número</Form.Label>
                <Form.Control
                  type="number"
                  name="number"
                  placeholder="#"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  onChange={this.handleInputChange}
                  defaultValue=""
                >
                  <option disabled value="">
                    Pequeno, Médio ou Grande
                  </option>
                  {this.state.apartmentTypes.map(t => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Alugado, Disponivel ou Idisponivel"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.handleClose}>
              Fechar
            </Button>
            <Button variant="dark" onClick={this.handleSave}>
              Salvar e Criar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
