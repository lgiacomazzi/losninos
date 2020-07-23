import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Modal, Button, ButtonGroup, Form, Col } from "react-bootstrap";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import CurrencyFormat from "react-currency-format";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import List from "../../components/list";

import "./styles.css";

export default class PaymentsMain extends Component {
  state = {
    payments: [],
    paymentsInfo: {},
    page: 1,
    sum: "",
    type: ""
  };

  componentDidMount() {
    if (this.props.location.hash === "#in") {
      this.setState({ type: "In" });
    }
    if (this.props.location.hash === "#out") {
      this.setState({ type: "Out" });
    }
    this.loadPayments();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.location.hash !== prevProps.location.hash) {
      this.componentDidMount();
    }
  }

  loadPayments = async (page = 1, e) => {
    const response = await api.get("/payments");

    const { docs, ...paymentsInfo } = response.data;

    // Acha valores In ou Out
    const itens = docs.filter(d => d.type === this.state.type);
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
      paymentsInfo,
      page,
      sum: sum
    });
  };

  handleSearch = async e => {
    const payments = this.state.payments;

    const search = e.target.value;
    const type = this.state.type;
    const response = await api.get("/c").sort({ amountTotal: -1 });
    this.setState({ payments: response.data });
    console.log(response);
  };

  render() {
    const { payments } = this.state;
    return (
      <div className="main-page">
        <div className="title-bar">
          {this.state.type === "In" ? (
            <h1 className="float-left">Receitas</h1>
          ) : (
            <h1 className="float-left">Despesas</h1>
          )}
        </div>

        <List data={this.state.payments} location={this.props.location} />

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Título</th>
              {this.state.type === "In" && <th scope="col">Apartamento</th>}
              <th scope="col" className="text-right">
                Total
              </th>
              <th scope="col" className="text-right">
                Data Vencimento
              </th>
              <th scope="col" className="text-right">
                Data Pagamento
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id}>
                <td>
                  <span className="far fa-file-alt" />
                </td>
                <td>
                  <Link to={`/payments/${payment._id}`}>{payment.title}</Link>
                </td>
                {this.state.type === "In" && <td>{payment.reservationId}</td>}
                <td className="text-right">
                  <CurrencyFormat
                    value={payment.amountTotal}
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={"R$ "}
                  />
                </td>

                <td className="text-right">
                  {format(payment.createdAt, "DD/MM/YYYY")}
                </td>
                <td className="text-right">
                  {payment.paymentDate &&
                    format(payment.paymentDate, "DD/MM/YYYY")}
                </td>
              </tr>
            ))}
            <tr>
              <td />
              <td />
              {this.state.type === "In" && <td />}
              <td className="text-right">
                <b>
                  <CurrencyFormat
                    value={this.state.sum}
                    displayType={"text"}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={"R$ "}
                  />
                </b>
              </td>
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
