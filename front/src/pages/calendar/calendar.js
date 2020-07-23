import React, { Component } from "react";
import {
  Modal,
  Button,
  Form,
  FormControl,
  Col,
  Row,
  ButtonGroup,
  InputGroup
} from "react-bootstrap";

import styles from "./styles.css";

export default class Calendar extends Component {
  state = {
    apartments: []
  };

  render() {
    return (
      <>
        <div className="d-flex flex-wrap mt-5">
          <span className="mr-2 fa fa-times fechar" />
          <span className="mr-2 fa fa-check fechar" />
          <span className="mr-2 fa fa-trash-alt fechar" />
          <span className="mr-2 fa fa-plus fechar" />
          <span className="mr-2 btn btn-sm btn-primary">Salvar</span>
        </div>
        <div className="d-flex flex-wrap mt-5">
          <span className="mr-2 circle" />
          <span className="mr-2 circle bg-check-in" />
          <span className="mr-2 circle bg-receber" />
          <span className="mr-2 circle bg-pagar" />
          <span className="mr-2 circle bg-limpeza" />
          <span className="mr-2 circle bg-hospede" />
        </div>
        <div className="d-flex flex-wrap mt-5">
          <span className="mr-2 circle" />
          <span className="mr-2 circle bg-reservas" />
          <span className="mr-2 circle bg-receitas" />
          <span className="mr-2 circle bg-despesas" />
          <span className="mr-2 circle bg-apartamentos" />
          <span className="mr-2 circle bg-hospedes" />
          <span className="mr-2 circle bg-dashboard" />
          <span className="mr-2 circle bg-calendario" />
        </div>
        <div className="d-flex flex-wrap mt-5">
          <div className="card ap-card mr-4">
            <div className="card-body d-flex flex-column">
              <div className="card-title mb-2">
                <h5 className="mr-5">222</h5>
                <span className="fa fa-key" />
              </div>
              <div className="card bg-dark pt-3 pb-3 d-flex flex-justify-center align-items-center">
                <span className="text-primary">---</span>
              </div>
            </div>
          </div>
          <div className="card ap-card rented mr-4">
            <div className="card-body d-flex flex-column">
              <div className="card-title mb-2">
                <h5 className="mr-5">222</h5>
                <span className="fa fa-lock" />
              </div>
              <div className="card bg-dark pt-3 pb-3 d-flex flex-justify-center align-items-center">
                <span className="text-primary">Luciano</span>
              </div>
            </div>
          </div>
          <div disabled className="card ap-card mr-4">
            <div className="card-body d-flex flex-column">
              <div className="card-title mb-2">
                <h5 className="mr-5">222</h5>
                <span className="fa fa-times-circle" />
              </div>
              <div className="card bg-dark pt-3 pb-3 d-flex flex-justify-center align-items-center">
                <span className="text-danger">---</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
