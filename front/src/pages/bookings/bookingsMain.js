import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { format, differenceInCalendarDays, differenceInMonths } from "date-fns";
import {
  Modal,
  Button,
  ButtonGroup,
  Form,
  Col,
  Badge,
  Alert
} from "react-bootstrap";

import style from "./checkbox.scss";

export default class BookingsMain extends Component {
  state = {
    bookings: [],
    page: 1,
    isLoading: true,
    show: false,
    deleteAlert: false,
    customers: [],
    apartments: [],
    newBooking: {},
    apartmentDetails: {},
    bookingToDelete: {}
  };

  async componentWillMount() {
    // Pega reservas atuais
    const response = await api.get("/bookings");
    this.setState({ bookings: response.data });
    this.loadApartmentsAndCustomers(); //REMOVE
  }

  handleClose = () => {
    this.setState({ show: false, deleteAlert: false, bookingToDelete: "" });
  };

  handleShow = () => {
    this.setState({ show: true });
    this.loadApartmentsAndCustomers();
  };

  handleInputChange = e => {
    const id = e.target.value;
    const changes = { [e.target.name]: id };

    this.setState({
      newBooking: Object.assign(this.state.newBooking, changes)
    });

    console.log(this.state.newBooking);

    if (e.target.name === "apartment") {
      this.getApartmentDetails(e.target.value);
      this.calculateStay();
    } else if (e.target.name === "contract") {
      this.handleContractChange(e);
      this.calculateStay();
    }
  };

  getApartmentDetails = async id => {
    const response = await api.get("/apartmentsType");
    const filter = response.data.filter(a => a._id == id);
    const apartment = filter[0];
    this.setState({ apartmentDetails: filter[0] });
  };

  getTimeInterval = time => {
    const changes = {};
    if (this.state.newBooking.contract === "dayPrice") {
      const result = differenceInCalendarDays(
        this.state.newBooking.checkOut,
        this.state.newBooking.checkIn
      );
      Object.assign(changes, { time: result });
    } else {
      const result = Math.max(
        differenceInMonths(
          this.state.newBooking.checkOut,
          this.state.newBooking.checkIn
        ),
        1
      );
      Object.assign(changes, { time: result });
    }
    this.setState({
      newBooking: Object.assign(this.state.newBooking, changes)
    });
  };

  calculateStay = () => {
    if (
      this.state.newBooking.apartment &&
      this.state.newBooking.contract &&
      this.state.newBooking.checkIn &&
      this.state.newBooking.checkOut
    ) {
      const { newBooking, apartmentDetails } = this.state;
      const contract = newBooking.contract;
      const price = apartmentDetails.type[contract];
      this.getTimeInterval();
      const changes = {
        amountTotal: newBooking.time * price
      };
      this.setState({
        newBooking: Object.assign(this.state.newBooking, changes)
      });
    }
  };

  handleContractChange = e => {
    const changes = { contract: e.target.id };
    this.setState({
      newBooking: Object.assign(this.state.newBooking, changes)
    });
  };

  handleSave = async e => {
    await api.post("/bookings", this.state.newBooking);
    this.setState({ show: false });
    this.componentWillMount();
  };

  handleDelete = e => {
    Object.assign(this.state.bookingToDelete, {
      name: e.target.name,
      _id: e.target.value
    });
    this.setState({ deleteAlert: true });
  };

  handleDeleteBooking = async e => {
    const id = this.state.bookingToDelete._id;
    await api.delete(`/bookings/${id}`);
    this.setState({ deleteAlert: false });
    this.componentWillMount();
  };

  loadApartmentsAndCustomers = async () => {
    // Busca base de clientes e de apartamentos
    const response1 = await api.get("/customers");
    const response2 = await api.get("/apartmentsType");
    this.setState({
      customers: response1.data.docs,
      apartments: response2.data
    });
  };

  render() {
    const { bookings, customers, apartments, apartmentDetails } = this.state;
    return (
      <div className="main-page">
        <div className="title-bar">
          <h1>Reservas</h1>
        </div>
        <div className="title-bar">
          <Button size="sm" variant="dark" onClick={this.handleShow}>
            <span>
              <span className="fa fa-plus mr-2" />
              Criar
            </span>
          </Button>

          <ButtonGroup>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={this.handleShow}
            >
              <span className="fa fa-th-large" />
            </Button>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={this.handleShow}
            >
              <span className="fa fa-bars" />
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={this.handleShow}
            >
              <span className="fa fa-caret-left" />
            </Button>
            <Button size="sm" variant="outline-dark">
              1
            </Button>
            <Button size="sm" variant="outline-dark">
              2
            </Button>
            <Button size="sm" variant="outline-dark">
              3
            </Button>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={this.handleShow}
            >
              <span className="fa fa-caret-right" />
            </Button>
          </ButtonGroup>
          <Button size="sm" variant="outline-dark" onClick={this.handleShow}>
            <span className="fa fa-search" />
          </Button>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Buscar"
            className="search"
          />
        </div>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Apartamento</th>
                <th scope="col">Hospede</th>
                <th scope="col">Check In</th>
                <th scope="col">Check Out</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b._id}>
                  <td>
                    <span className="far fa-bookmark" />
                  </td>
                  <td>{b.apartment.number}</td>
                  <td>{b.customer.nome}</td>
                  <td>{format(b.checkIn, "DD/MM/YYYY")}</td>
                  <td>{format(b.checkOut, "DD/MM/YYYY")}</td>
                  <td className="text-right">
                    <Button
                      size="xs"
                      variant="outline-dark"
                      className="mr-2"
                      href={`/bookings/${b._id}`}
                    >
                      Info
                    </Button>
                    <Button
                      size="xs"
                      variant="dark"
                      className="mr-2"
                      onClick={this.handleCheckIn}
                    >
                      Check In
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      className="mr-2"
                      name={b.apartment.number + " / " + b.customer.nome}
                      value={b._id}
                      onClick={this.handleDelete}
                    >
                      Deletar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Alert show={this.state.deleteAlert} variant="secondary">
          <span>Deseja excluír permanentemente a reserva </span>
          <Badge className="mb-2" variant="light">
            {this.state.bookingToDelete.name}
          </Badge>
          <div className="d-flex justify-content-end">
            <Button
              size="sm"
              variant="dark"
              onClick={this.handleClose}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={this.handleDeleteBooking}
              variant="outline-dark"
              value={this.state.bookingToDelete._id}
            >
              Deletar
            </Button>
          </div>
        </Alert>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="far fa-bookmark" />
              <h1>Nova reserva</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Apartamento</Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  name="apartment"
                  onChange={this.handleInputChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione um Apartamento
                  </option>
                  {apartments.map(a => (
                    <option key={a._id} value={a._id}>
                      {a.number}
                    </option>
                  ))}
                </Form.Control>
                <Form.Label>
                  <small>
                    {apartmentDetails.type && apartmentDetails.type.name}
                  </small>
                  <small>
                    {apartmentDetails.type && apartmentDetails.type.dayPrice}
                  </small>
                  <small>
                    {apartmentDetails.type && apartmentDetails.type.monthPrice}
                  </small>
                  <small>
                    {apartmentDetails.type &&
                      apartmentDetails.type.discountPrice}
                  </small>
                  <small>{apartmentDetails.status}</small>
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <div>
                  <Form.Label>Hóspede</Form.Label>
                  <Link to="/customers">
                    <Badge variant="dark" className="ml-2">
                      Criar
                    </Badge>
                  </Link>
                </div>
                <Form.Control
                  size="sm"
                  as="select"
                  name="customer"
                  onChange={this.handleInputChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione um Hóspede
                  </option>
                  {customers.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.nome}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Check In</Form.Label>
                    <Form.Control
                      size="sm"
                      type="date"
                      name="checkIn"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label as={Col}>Check Out</Form.Label>
                    <Form.Control
                      size="sm"
                      type="date"
                      name="checkOut"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
            <div className="row mb-4">
              <div className="col">
                <div className="card inputGroup">
                  <input
                    id="dayPrice"
                    name="contract"
                    type="radio"
                    onChange={this.handleInputChange}
                  />
                  <label for="dayPrice">Diária</label>
                </div>
              </div>
              <div className="col">
                <div className="card inputGroup">
                  <input
                    id="monthPrice"
                    name="contract"
                    type="radio"
                    onChange={this.handleInputChange}
                  />
                  <label for="monthPrice">Mensal</label>
                </div>
              </div>
              <div className="col">
                <div className="card inputGroup">
                  <input
                    id="discountPrice"
                    name="contract"
                    type="radio"
                    onChange={this.handleInputChange}
                  />
                  <label for="discountPrice">Semestral</label>
                </div>
              </div>
            </div>
            {this.state.newBooking.amountTotal && (
              <Modal.Footer>
                <p>R$</p>
                <h1>{this.state.newBooking.amountTotal}</h1>
              </Modal.Footer>
            )}
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
