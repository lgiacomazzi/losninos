import React, { Component } from "react";
import api from "../../services/api";
import { distanceInWordsToNow } from "date-fns";
import pt from "date-fns/locale/pt";

import "./styles.css";

export default class Customers extends Component {
  state = {
    customer: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await api.get(`/customers/${id}`);

    this.setState({ customer: response.data });
  }

  deleteCustomer = async () => {
    const { id } = this.props.match.params;

    await api.delete(`/customers/${id}`);

    this.props.history.push("/customers");
  };

  render() {
    const { customer } = this.state;

    return (
      <div className="main-page">
        <div className="title-bar">
          <a
            className="btn btn-outline-primary btn-sm mb-2 mr-2"
            href="/customers"
          >
            <span className="fa fa-angle-left mr-2" />
            Voltar
          </a>

          <a
            className="btn btn-outline-dark btn-sm mb-2 mr-2"
            href="/customers"
          >
            Editar
          </a>

          <button
            className="btn btn-outline-danger btn-sm mb-2 mr-2"
            onClick={this.deleteCustomer}
          >
            <span className="fa fa-trash-alt" />
          </button>
        </div>
        <h1>{customer.nome}</h1>
        <p>Há {distanceInWordsToNow(customer.createdAt, { locale: pt })}</p>
        <p>{customer.cpf}</p>
      </div>
    );
  }
}
