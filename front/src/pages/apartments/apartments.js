import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Form,
  FormControl,
  Col,
  Row,
  ButtonGroup,
  InputGroup
} from "react-bootstrap";
import { format } from "date-fns";

export default class Apartments extends Component {
  state = {
    apartment: {},
    type: {},
    tipos: [],
    show: false,
    newNumber: "",
    newType: "",
    newStatus: "",
    bookings: []
  };

  async componentDidMount() {
    this.loadApartmentDetails();
    this.loadApartmentHistory();
    this.loadTypes();
  }

  loadApartmentHistory = async () => {
    const { id } = this.props.match.params;

    const response = await api.get(`/bookings`);

    const filter = response.data.filter(a => a.apartment._id === id);

    this.setState({ bookings: filter });
    //console.log(this.state.bookings);
  };

  loadApartmentDetails = async () => {
    const { id } = this.props.match.params;

    const response = await api.get(`/apartments/${id}`);

    //console.log(response.data && response.data);
    this.setState({
      apartment: response.data,
      type: response.data.type,
      newNumber: response.data.number,
      newType: response.data.type && response.data.type.name,
      newStatus: response.data.status
    });
  };

  loadTypes = async () => {
    const tipos = await api.get(`/types`);
    this.setState({ tipos: tipos.data });
  };

  handleInputChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = e => {
    this.setState({ show: true });
  };

  handleSave = async e => {
    const { id } = this.props.match.params;

    await api.put(`/apartments/${id}`, {
      number: this.state.newNumber,
      type: this.state.newType && this.getTypeId(this.state.newType),
      status: this.state.newState
    });
    this.setState({ show: false });
    this.componentDidMount();
  };

  getTypeId = nome => {
    const id = this.state.tipos.filter(value => value.name === nome);
    return id[0]._id;
  };

  changeStatus = async e => {
    const { id } = this.props.match.params;
    if (this.state.newStatus === "Alugado") {
      await api.put(`/apartments/${id}`, {
        status: "Disponivel"
      });
    } else if (this.state.newStatus === "Disponivel") {
      await api.put(`/apartments/${id}`, {
        status: "Alugado"
      });
    }
    this.componentDidMount();
  };

  render() {
    const { apartment, type, tipos, newStatus, bookings } = this.state;

    return (
      <div className="apartment-page">
        <div className="title-bar">
          <Button size="sm" variant="outline-dark" href="/apartments">
            <span className="fa fa-angle-left mr-2" />
            Voltar
          </Button>
        </div>
        <div className="title-bar">
          <Button
            size="sm"
            variant="warning"
            className={this.state.newStatus === "Alugado" ? "" : "invisible"}
            onClick={this.changeStatus}
          >
            <span className="fa fa-key mr-2" />
            Alugado
          </Button>
          <Button
            size="sm"
            variant="outline-success"
            className={this.state.newStatus === "Disponivel" ? "" : "invisible"}
            onClick={this.changeStatus}
          >
            <span className="fa fa-key mr-2" />
            Alugar
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            className={
              this.state.newStatus === "Indisponivel" ? "" : "invisible"
            }
            onClick={this.changeStatus}
          >
            <span className="fa fa-times-circle mr-2" />
            Indisponivel
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            onClick={this.handleShow}
            className={this.state.show === true && "invisible"}
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="success"
            onClick={this.handleSave}
            className={this.state.show === false && "invisible"}
          >
            Salvar
          </Button>
        </div>
        <div className="doc-page">
          <div className="card p-3">
            <div className="title-bar">
              <h1>{apartment.number}</h1>
            </div>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={2} size="sm">
                  Número
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="newNumber"
                    placeholder={apartment.number}
                    value={this.state.newNumber}
                    onChange={this.handleInputChange}
                    disabled={this.state.show === false}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label size="sm" column sm={2}>
                  Tipo
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    size="sm"
                    column
                    as="select"
                    name="newType"
                    value={this.state.newType}
                    onChange={this.handleInputChange}
                    disabled={this.state.show === false}
                  >
                    {tipos.map(tipo => (
                      <option key={tipo._id} id={tipo._id}>
                        {tipo.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
            <div>
              <h6>Últimas Reservas</h6>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th />
                    <th>Reserva</th>
                    <th>Hóspede</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b._id}>
                      <td />
                      <td>
                        <Link to={`/bookings/${b._id}`}>{b._id}</Link>
                      </td>
                      <td>{b.customer.nome}</td>
                      <td>{format(b.checkIn, "DD/MM/YYYY")}</td>
                      <td>{format(b.checkOut, "DD/MM/YYYY")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length == 0 && (
                <div className="text-center mb-5">
                  <small>
                    Não foram encontradas reservas para este apartamento.
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
