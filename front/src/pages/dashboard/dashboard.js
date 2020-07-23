import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import NewPayment from "../payments/paymentsModal.js";
import NewBooking from "../bookings/bookingsModal.js";
import NewCustomer from "../customers/customersModal.js";

import ReceitasChart from "../payments/paymentsChart.js";
import ApartamentsChart from "../apartments/apartmentsChart.js";

export default class Dashboard extends Component {
  state = {
    checkin: false,
    receber: false,
    pagar: false,
    limpeza: false,
    hospede: false
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadCustomers(pageNumber);
  };

  nextPage = () => {
    const { page, customersInfo } = this.state;

    if (page === customersInfo.pages) return;

    const pageNumber = page + 1;

    this.loadCustomers(pageNumber);
  };

  showModal = e => {
    this.setState({
      [e.target.id]: true
    });
  };

  hideModal = e => {
    this.setState({
      checkin: false,
      receber: false,
      pagar: false,
      limpeza: false,
      hospede: false
    });
  };

  render() {
    return (
      <>
        <NewBooking
          show={this.state.checkin}
          hideModal={this.hideModal.bind(this)}
        />
        <NewPayment
          type="in"
          show={this.state.receber}
          hideModal={this.hideModal.bind(this)}
        />
        <NewPayment
          type="out"
          show={this.state.pagar}
          hideModal={this.hideModal.bind(this)}
        />
        <NewCustomer
          type="in"
          show={this.state.hospede}
          hideModal={this.hideModal.bind(this)}
        />

        <div className="main-page">
          <div className="title-bar">
            <h1>Dashboard</h1>
          </div>
          <div className="bubble-box">
            <div className="bubble-bar">
              <div className="bubble-rectangle">
                <div
                  id="checkin"
                  onClick={this.showModal}
                  className="circle bg-check-in"
                />
                <span>Check In</span>
              </div>
              <div className="bubble-rectangle">
                <div
                  id="receber"
                  onClick={this.showModal}
                  className="circle bg-receber"
                />
                <span>Receber</span>
              </div>
              <div className="bubble-rectangle">
                <div
                  id="pagar"
                  onClick={this.showModal}
                  className="circle bg-pagar"
                />
                <span>Pagar</span>
              </div>
              <div className="bubble-rectangle">
                <div
                  id="limpeza"
                  onClick={this.showModal}
                  className="circle bg-limpeza"
                />
                <span>Limpeza</span>
              </div>
              <div className="bubble-rectangle">
                <div
                  id="hospede"
                  onClick={this.showModal}
                  className="circle bg-hospede"
                />
                <span>+ Hóspede</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-lg-6 col-12">
              <ReceitasChart type="In" />
            </div>
            <div className="col col-lg-6 col-12">
              <ReceitasChart type="Out" />
            </div>
            <div className="col col-lg-4 col-12">
              <ApartamentsChart type="Out" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
