import React, { Component } from "react";
import api from "../../services/api";
import "./style.css";
// import { format } from "date-fns";
// import pt from "date-fns/locale/pt";

import { New, Search, Category } from "../../components/index.js";

export default class Payments extends Component {
  state = {
    active: "Out",
    payments: [],
    isLoading: true
  };

  componentWillMount() {
    // this.loadCurrentPayments();
    this.loadPayments("/payments/Out");
  }

  // loadPayments = async () => {
  //   const response = await api.get("/payments");
  //   const payments = response.data;
  //   this.setState({ payments });
  // };

  loadPayments = async route => {
    const { active } = this.state;
    const response = await api.get(`${route}`);

    const docs = response.data;

    // Acha valores In ou Out
    const itens = docs.filter(d => d.type === this.state.active);
    //Troca o Sinal In ou Out
    const total = itens.map(d => {
      if (d.type === "Out") {
        return d.amountTotal * -1;
      }
      if (d.type === "In") {
        return d.amountTotal;
      }
    });
    //Soma toda a lista
    const sum = total.reduce((acc, currValue) => {
      return acc + currValue;
    }, 0);

    this.setState({
      payments: itens,
      sum: sum,
      isLoading: false
    });
  };

  viewReceitas = () => {
    this.setState({ active: "In", isLoading: true, payments: [] });
    const { month, year, categ } = this.state;
    if (this.state.activeFilter) {
      this.goFilter(month, year, categ);
    } else {
      this.getPayments();
    }
  };

  viewDespesas = () => {
    const { month, year, categ } = this.state;
    this.setState({ active: "Out", isLoading: true, payments: [] });
    if (this.state.activeFilter) {
      this.goFilter(month, year, categ);
    } else {
      this.getPayments("/payments");
    }
  };

  goFilter = (month, year, categ) => {
    this.setState({ payments: [], isLoading: true });
    // alert(`/c?month=${month}&year=${year}`);
    this.getPayments(`/c?month=${month}&year=${year}`);
    this.setState({ search: false, activeFilter: true, month, year, categ });
  };

  NewPayment = () => {
    console.log("add");
  };

  NewPaymentModal() {
    return (
      <div className="">
        <h4>teste</h4>
      </div>
    );
  }

  PaymentChart() {
    return (
      <div className="mb-5">
        <div className="row">
          <div className="col col-md">
            <div className="card card-click p-3" style={{ height: 400 }}>
              <h5 className="mb-3">Receitas</h5>
            </div>
          </div>
          <div className="col col-md">
            <div className="card card-click p-3" style={{ height: 400 }}>
              <h5 className="mb-3">Despesas</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  AllPaymentList() {
    const { payments, isLoading } = this.state;
    return (
      <div className="mb-5">
        <h5 className="mb-3">Últimos Pagamentos</h5>
        <div className="card">
          <table id="payments" className="table table-hover">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Data Emissão</th>
              </tr>
            </thead>
            {isLoading === true ? (
              <tr>
                <td />
              </tr>
            ) : (
              <tbody>
                {payments.map(payment => (
                  <tr key={payment._id}>{this.PaymentLine(payment)}</tr>
                ))}
              </tbody>
            )}
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
        <td className="text-right">R$ {payment.amountTotal || "none"}</td>
        <td />
      </>
    );
  }

  render() {
    return (
      <>
        <div className="mb-5">
          <div className="d-flex flex-row align-items-center">
            <h1 className="mr-3 m-0">Financeiro</h1>
            <New className="mr-3" onClick={this.NewPayment} />
            <Search className="mr-3" />
          </div>
          <hr />
        </div>

        {this.AllPaymentList()}
        {this.NewPaymentModal()}
      </>
    );
  }
}
