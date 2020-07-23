import React, { Component } from "react";
import api from "../../services/api";

export default class Apartments extends Component {
  state = {
    apartments: []
  };

  componentWillMount() {
    this.loadApartments();
  }

  loadApartments = async () => {
    const response = await api.get("/apartments/find");
    const apartments = response.data;
    this.setState({ apartments });
  };

  ApartmentList() {
    const { apartments } = this.state;
    return (
      <>
        <div className="row">
          {apartments.map(apartment => (
            <div key={apartment._id} className="col col-3">
              {this.AptCard(apartment)}
            </div>
          ))}
        </div>
      </>
    );
  }

  AptCard(apartment) {
    var circle = "";
    if (apartment.status == "Alugado") {
      var circle = "fa fa-circle text-dark";
    } else {
      var circle = "fa fa-circle text-success";
    }

    return (
      <a
        className="card p-3 mb-3 click-card"
        href={`/apartments/${apartment._id}`}
      >
        <div className="d-flex flex-row justify-content-between">
          <h4>{apartment.number || "none"}</h4>
          <span className={circle} />
        </div>
        <div>
          <p>{apartment.type.name || "none"}</p>
          <p>{apartment.guest ? apartment.guest.nome : "---"}</p>
        </div>
      </a>
    );
  }

  render() {
    return (
      <>
        <h1>Apartmentos</h1>
        <hr className="mb-5" />
        {this.ApartmentList()}
      </>
    );
  }
}
