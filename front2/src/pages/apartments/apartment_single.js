import React, { Component } from "react";
import api from "../../services/api";

export default class ApartmentSingle extends Component {
  state = {
    apartment: [],
    bookings: []
  };

  async componentDidMount() {
    this.loadApartmentDetails();
    this.loadApartmentHistory();
  }

  loadApartmentDetails = async () => {
    const { id } = this.props.match.params;

    const response = await api.get(`/apartments/${id}`);
    const apartment = response.data;

    // console.log(apartment);
    this.setState({ apartment });
  };

  loadApartmentHistory = async () => {
    const { id } = this.props.match.params;

    const response = await api.get(`/bookings`);

    const bookings = response.data.filter(a => a.apartment._id === id);

    this.setState({ bookings });
    console.log(bookings);
  };

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
    const { apartment, bookings } = this.state;
    var circle = "";
    if (apartment.status == "Alugado") {
      var circle = "fa fa-circle text-dark";
    } else {
      var circle = "fa fa-circle text-success";
    }

    return (
      <>
        <h1>{apartment.number}</h1>
        <div>
          <span className={circle + " mr-2"} />
          <small>{apartment.status}</small>
        </div>
        <hr className="mb-5" />
      </>
    );
  }
}
