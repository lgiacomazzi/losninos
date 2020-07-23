import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import { Button, Form } from "react-bootstrap";

import Spinner from "../../components/spinner";

import "./styles.css";

export default class ApartmentTypes extends Component {
  state = {
    types: [],
    changes: {},
    edit: false,
    create: false,
    newType: {}
  };

  componentDidMount() {
    this.loadTypes();
  }

  loadTypes = async () => {
    const response = await api.get("/types");
    this.setState({
      types: response.data
    });
  };

  handleClose = () => {
    this.setState({ edit: false, create: false });
  };

  handleEdit = () => {
    this.setState({ edit: true, create: false });
  };

  handleCreate = () => {
    this.setState({ create: true, edit: false });
  };

  handleSave = async e => {
    const entries = Object.entries(this.state.changes);
    for (const [id, changes] of entries) {
      await api.put(`/types/${id}`, changes);
      console.log(changes);
    }
    this.setState({ edit: false });
    this.loadTypes();
  };

  handleInputChange = e => {
    const lineChanges = { [e.target.name]: e.target.value };
    if (this.state.changes[e.target.id]) {
      Object.assign(this.state.changes[e.target.id], lineChanges);
    } else {
      const changes = { [e.target.id]: lineChanges };
      Object.assign(this.state.changes, changes);
    }
  };

  handleInputChangeCreate = e => {
    const lineChanges = { [e.target.name]: e.target.value };
    Object.assign(this.state.newType, lineChanges);
    console.log(this.state.newType);
  };

  handleCreateNew = async e => {
    await api.post("/types", this.state.newType);
    this.setState({ create: false });
    this.loadTypes();
  };

  handleDelete = async e => {
    const id = e.target.id;
    await api.delete(`/types/${id}`);
    this.setState({ edit: false });
    this.loadTypes();
  };

  render() {
    const { apartments } = this.state;
    return (
      <div className="main-page">
        <div className="title-bar">
          <h1>Tipos</h1>
        </div>
        <div className="title-bar">
          <Button
            variant="dark"
            size="sm"
            onClick={this.handleCreate}
            disabled={this.state.edit === true || this.state.create === true}
          >
            <span className="fa fa-plus mr-2" />
            Criar
          </Button>
          {this.state.edit === false ? (
            <Button
              variant="outline-dark"
              size="sm"
              onClick={this.handleEdit}
              disabled={this.state.create === true}
            >
              Editar
            </Button>
          ) : (
            <Button variant="success" size="sm" onClick={this.handleSave}>
              Salvar
            </Button>
          )}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Nome</th>
              <th>Diária</th>
              <th>Mensalidade</th>
              <th>Contrato</th>
            </tr>
          </thead>
          <tbody>
            {this.state.types.map(tipo => (
              <tr key={tipo._id}>
                <td>
                  {this.state.edit === false ? (
                    <span className="fa fa-box" />
                  ) : (
                    <span
                      id={tipo._id}
                      className="fa fa-trash-alt text-dark"
                      onClick={this.handleDelete}
                    />
                  )}
                </td>
                <td>
                  <Form.Control
                    id={tipo._id}
                    name="name"
                    disabled={this.state.edit === false}
                    type="text"
                    size="sm"
                    placeholder={tipo.name}
                    defaultValue={tipo.name}
                    onChange={this.handleInputChange}
                  />
                </td>
                <td>
                  <Form.Control
                    id={tipo._id}
                    name="dayPrice"
                    disabled={this.state.edit === false}
                    type="number"
                    size="sm"
                    placeholder={tipo.dayPrice}
                    defaultValue={tipo.dayPrice}
                    onChange={this.handleInputChange}
                  />
                </td>
                <td>
                  <Form.Control
                    id={tipo._id}
                    name="monthPrice"
                    disabled={this.state.edit === false}
                    type="number"
                    size="sm"
                    placeholder={tipo.monthPrice}
                    defaultValue={tipo.monthPrice}
                    onChange={this.handleInputChange}
                  />
                </td>
                <td>
                  <Form.Control
                    id={tipo._id}
                    name="discountPrice"
                    disabled={this.state.edit === false}
                    type="number"
                    size="sm"
                    placeholder={tipo.discountPrice}
                    defaultValue={tipo.discountPrice}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>
            ))}
            {this.state.create === true && (
              <tr>
                <td>
                  <span className="fa fa-box text-dark" />
                </td>
                <td>
                  <Form.Control
                    name="name"
                    type="text"
                    size="sm"
                    placeholder="Descrição"
                    onChange={this.handleInputChangeCreate}
                  />
                </td>
                <td>
                  <Form.Control
                    name="dayPrice"
                    type="number"
                    size="sm"
                    placeholder="Preço Diária"
                    onChange={this.handleInputChangeCreate}
                  />
                </td>
                <td>
                  <Form.Control
                    name="monthPrice"
                    type="number"
                    size="sm"
                    placeholder="Preço Mensal"
                    onChange={this.handleInputChangeCreate}
                  />
                </td>
                <td>
                  <Form.Control
                    name="discountPrice"
                    placeholder="Preço Contrato"
                    type="number"
                    size="sm"
                    onChange={this.handleInputChangeCreate}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {this.state.create === true && (
          <>
            <Button
              className="float-right ml-2"
              variant="dark"
              size="sm"
              onClick={this.handleCreateNew}
            >
              Salvar
            </Button>
            <Button
              className="float-right"
              variant="dark"
              size="sm"
              onClick={this.handleClose}
            >
              Cancelar
            </Button>
          </>
        )}
      </div>
    );
  }
}
