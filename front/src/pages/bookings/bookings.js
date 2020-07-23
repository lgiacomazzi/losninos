import React, { Component } from "react";
import api from "../../services/api";
import { Button, Badge } from "react-bootstrap";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import Spinner from "../../components/spinner";

export default class Bookings extends Component {
  state = {
    booking: {},
    bookingApartment: {},
    bookingCustomer: {},
    isLoading: true
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await api.get(`/bookings/${id}`);

    this.setState({
      booking: response.data,
      bookingApartment: response.data.apartment,
      bookingCustomer: response.data.customer,
      isLoading: false
    });
  }

  render() {
    const { booking, bookingApartment, bookingCustomer } = this.state;

    return (
      <div className="main-page">
        <div className="title-bar">
          <Button size="sm" variant="outline-dark" href="/bookings">
            <span className="fa fa-angle-left mr-2" />
            Voltar
          </Button>
        </div>
        <div className="title-bar">
          <Button size="sm" variant="outline-dark" href="/bookings">
            <span className="far fa-calendar-check mr-2" />
            Check In
          </Button>
          <Button size="sm" variant="outline-dark" href="/bookings">
            Deletar
          </Button>
        </div>
        <div className="title-bar">
          <Badge variant="dark">{booking._id}</Badge>
        </div>

        <div className="doc-page">
          {this.state.isLoading === true && (
            <div className="card p-3">
              <Spinner />
            </div>
          )}
          {this.state.isLoading === false && (
            <div className="card p-3">
              <h1>{bookingApartment.number}</h1>
              <h1>{bookingCustomer.nome}</h1>
              <h1>{bookingCustomer.phone}</h1>
              <h1>{booking.amountTotal}</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}
