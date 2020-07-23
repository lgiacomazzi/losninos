import React, { Component } from "react";
import api from "../../services/api";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { format, addDays, getDaysInMonth, startOfMonth } from "date-fns";
import pt from "date-fns/locale/pt";
import CurrencyFormat from "react-currency-format";

export default class ReceitasChart extends Component {
  state = {
    data: [],
    lastTotal: 0
  };

  componentWillMount() {
    this.getData();
  }

  sumTotal = object => {
    if (object.length === 1) {
      // console.log(object[0].amountTotal);
      return object[0].amountTotal;
    } else if (object.length >= 2) {
      const sum = object.map(item => item.amountTotal).reduce((a, b) => a + b);
      return sum;
    } else return 0;
  };

  getData = async () => {
    const type = this.props.type;
    const days = [];
    const today = new Date();
    const response = await api.get(`/payments/${type}`); // Pega Pagamentos do Type
    const payments = response.data;
    const monthDays = getDaysInMonth(today);

    for (var i in payments) {
      payments[i].createdAt = format(payments[i].createdAt, "DD MMM", {
        locale: pt
      });
      payments[i].amountTotal = payments[i].amountTotal / 1000;
    } // Edita datas dos arquivos "1,2,3..."
    for (var i = 0; i < monthDays; i++) {
      const day = format(addDays(startOfMonth(today), i), "DD MMM", {
        locale: pt
      }); // Cria datas do mês atual "1,2,3..."
      const dayPayments = payments.filter(p => p.createdAt === day);
      const sum = this.sumTotal(dayPayments);
      days.push({ createdAt: day, amountTotal: sum });
    } // Soma os payments de cada dia
    const paymentDays = days;
    for (var j = 0; j < paymentDays.length - 1; j++) {
      paymentDays[j + 1].amountTotal =
        paymentDays[j + 1].amountTotal + paymentDays[j].amountTotal;
    } // Cascata a soma dos payments de cada dia
    this.setState({
      data: paymentDays,
      lastTotal: days[days.length - 1].amountTotal
    });
  };

  render() {
    const { type } = this.props;
    const { data } = this.state;
    return (
      <>
        <div className="card chart-card">
          <div className="chart-title">
            <small>R$ </small>
            <h5 className="m-0">
              <CurrencyFormat
                value={this.state.lastTotal}
                displayType={"text"}
                thousandSeparator="."
                decimalSeparator=","
                fixedDecimalScale={true}
              />
            </h5>
            <span className="referencia">
              {format(new Date(), "MMMM", { locale: pt })}
              {this.state.type === "In" ? " - Receitas" : " - Despesas"}
            </span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Line
                type="monotone"
                dot={false}
                dataKey="amountTotal"
                strokeWidth={4}
                stroke={type === "In" ? "#00bcd4" : "#3f51b5"}
              />
              <YAxis
                padding={{ top: 40, bottom: 40 }}
                domain={[0, 50]}
                orientation="right"
                axisLine={false}
                tickLine={false}
                unit="K"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  }
}
