import React, { Component } from "react";

export default class Table extends Component {
  state = {
    header: [],
    body: []
  };

  componentWillMount() {
    if (this.props.location.pathname === "/payments") {
      this.setState({
        body: [
          "",
          "title",
          "reservationId",
          "amountTotal",
          "dueDate",
          "paymentDate"
        ],
        header: [
          "",
          "Título",
          "Apartamento",
          "Total",
          "Data Vencimento",
          "Data Pagamento"
        ]
      });
    } else if (this.props.location.pathname === "/customers") {
      this.setState({
        header: ["", "Nome", "CPF", "E-mail", "Data Criação"],
        body: ["", "nome", "cpf", "email", "createdAt"]
      });
    }
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({ data: this.props.data });
    }
    console.log(this.state.data);
  }

  render() {
    console.log(this.state.props);
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            {this.state.header.map(titulo => (
              <th key={titulo}>{titulo}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hey</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
