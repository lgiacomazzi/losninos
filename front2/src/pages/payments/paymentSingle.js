import React, { Component } from "react";
import api from "../../services/api";
import "./style.css";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import { New, Search, Category } from "../../components/index.js";

export default class PaymentSingle extends Component {
  state = {
    payment: {},
    isLoading: true
  };

  componentWillMount() {
    // this.loadCurrentPayments();
    this.loadPayment();
  }

  // loadPayments = async () => {
  //   const response = await api.get("/payments");
  //   const payments = response.data;
  //   this.setState({ payments });
  // };

  loadPayment = async () => {
    const { id } = this.props.match.params;

    const response = await api.get(`/payments/${id}`);
    const payment = response.data;

    this.setState({ payment });
  };

  PaymentChart() {
    return (
      <div class="mb-5">
        <div class="row">
          <div class="col col-md">
            <div class="card card-click p-3" style={{ height: 400 }}>
              <h5 className="mb-3">Receitas</h5>
            </div>
          </div>
          <div class="col col-md">
            <div class="card card-click p-3" style={{ height: 400 }}>
              <h5 className="mb-3">Despesas</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  AllPaymentList() {
    const { payments } = this.state;
    return (
      <div class="mb-5">
        <h5 className="mb-3">Últimos Pagamentos</h5>
        <div className="card">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Data Emissão</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id}>{this.PaymentLine(payment)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  PaymentLine(payment) {
    return (
      <>
        <td>
          <Category category={payment.category} />
        </td>
        <td>{payment.title || "none"}</td>
        <td class="text-right">R$ {payment.amountTotal || "none"}</td>
        <td>
          {format(payment.createdAt, "DD MMM YYYY - HH:mm", { locale: pt })}
        </td>
      </>
    );
  }

  render() {
    return (
      <>
        <div class="mb-5">
          <div className="d-flex flex-row align-items-center">
            <h1 className="mr-3 m-0">Financeiro</h1>
            <New className="mr-3" onClick={this.NewPayment} />
            <Search className="mr-3" />
          </div>
          <hr />
        </div>
        {this.PaymentChart()}
        {this.AllPaymentList()}
      </>
    );
  }
}
