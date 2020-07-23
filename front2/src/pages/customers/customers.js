import React, { Component } from "react";
import api from "../../services/api";

import { New, Search } from "../../components/index.js";

export default class Customers extends Component {
  state = {
    currentBookings: [],
    customers: []
  };

  componentWillMount() {
    this.loadCurrentCustomers();
    this.loadCustomers();
  }

  loadCurrentCustomers = async () => {
    const response = await api.get("/bookings");
    const currentBookings = response.data;
    this.setState({ currentBookings });
  };

  loadCustomers = async () => {
    const response = await api.get("/customers");
    const customers = response.data.docs;
    this.setState({ customers });
  };

  NewCustomer = () => {
    console.log("add");
  };

  CustomerList() {
    const { currentBookings } = this.state;
    return (
      <div class="mb-5">
        <h5 className="mb-3">Últimos hóspedes...</h5>
        <div className="row">
          {currentBookings.map(booking => (
            <div key={booking._id} className="col col-md">
              {this.CustomerCard(booking)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  CustomerCard(booking) {
    return (
      <div className="card p-3 click-card" href={`/bookings/${booking._id}`}>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <p>{booking.customer.nome || "none"}</p>
            <small>{booking.customer.phone || "+00 00 0000 0000"}</small>
          </div>
          <h4>{booking.apartment.number || "none"}</h4>
        </div>
        <div>
          <p>{booking.customer.email || "none"}</p>
        </div>
      </div>
    );
  }

  AllCustomerList() {
    const { customers } = this.state;
    return (
      <div class="mb-5">
        <h5 className="mb-3">Hóspedes Cadastrados</h5>
        <div className="card">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Telefone</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer._id}>{this.CustomerLine(customer)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  CustomerLine(customer) {
    return (
      <>
        <td>{customer.nome}</td>
        <td>{customer.phone || "none"}</td>
        <td>{customer.email || "none"}</td>
      </>
    );
  }

  render() {
    return (
      <>
        <div class="mb-5">
          <div className="d-flex flex-row align-items-center">
            <h1 className="mr-3 m-0">Hóspedes</h1>
            <New className="mr-3" onClick={this.NewCustomer} />
            <Search className="mr-3" />
          </div>
          <hr />
        </div>
        {this.CustomerList()}
        {this.AllCustomerList()}
      </>
    );
  }
}
