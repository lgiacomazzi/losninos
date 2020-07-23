import React, { Component } from "react";
import api from "../../services/api";
import {
  PieChart,
  Pie,
  XAxis,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { format, addDays, getDaysInMonth, startOfMonth } from "date-fns";
import pt from "date-fns/locale/pt";
import CurrencyFormat from "react-currency-format";

export default class ApartamentsChart extends Component {
  state = {
    data: [],
    occRate: 0
  };

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    const response = await api.get("/apartments");
    const docs = response.data.docs;

    // Alugados
    const rented = docs.filter(d => d.status === "Alugado");
    // Disponíveis
    const available = docs.filter(d => d.status === "Disponivel");

    const occRate = (rented.length / (rented.length + available.length)) * 100;

    this.setState({
      data: [
        {
          name: "Alugados",
          value: rented.length
        },
        {
          name: "Disponíveis",
          value: available.length
        }
      ],
      alugados: rented.length,
      disponiveis: available.length,
      occRate: occRate
    });
  };

  render() {
    const COLORS = ["#3f51b5", "#00bcd4", "#FFBB28", "#FF8042"];

    return (
      <>
        <div className="card chart-card">
          <div className="chart-title">
            <h5 className="m-0">
              {parseFloat(this.state.occRate.toFixed(2)) + " %"}
            </h5>
            <small className="referencia">Ocupação</small>
          </div>
          <div className="chart-title fixed-bottom">
            <b>{this.state.alugados} </b>
            <small className="referencia">
              {this.state.alugados === 1 ? "alugado" : "alugados"}
            </small>
            <br />
            <b>{this.state.disponiveis} </b>
            <small className="referencia">
              {this.state.disponiveis === 1 ? "disponivel" : "disponiveis"}
            </small>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                isAnimationActive={false}
                data={this.state.data}
                dataKey="value"
                nameKey="name"
                cx="70%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
              >
                {this.state.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  }
}
