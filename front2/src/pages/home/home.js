import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";

import { New, Search, Category } from "../../components/index.js";

export default class Home extends Component {
  render() {
    return (
      <>
        <section id="main">
          <div className="container">
            <div className="w-100 p-5">
              <div className="mt-5">
                <h1>Los Niños Apart Hotel.</h1>
                <h1>Suítes Mobiliadas.</h1>
                <button className="btn btn-dark">Descubra ➞</button>
              </div>
            </div>
          </div>
        </section>
        <section id="history">
          <div className="container">
            <div className="w-100 p-5">
              <div className="mt-5">
                <p>
                  Estamos em Canoas, no Rio Grande do Sul, próximo à ULBRA.
                  Estamos há mais de 20 anos alugando apartamentos mobiliados
                  para estudantes e profissionais que vêm à nossa cidade.
                </p>
                <button className="btn btn-dark">Nossa História ➞</button>
              </div>
            </div>
          </div>
        </section>
        <section id="suites">
          <div className="container">
            <div className="w-100 p-5 text-center">
              <h2 className="text-light m-5">Suítes Mobiliadas.</h2>
              <div className="card-deck mb-5">
                <div className="card">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Mezanino Duplex</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
                <div className="card">
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Suíte Média</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Suíte Pequena</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
              <button className="btn btn-dark m-auto">
                Consultar Preços ➞
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
}
