import React from "react";
import "./styles.css";

import spinner from "../../assets/tail-spin.svg";

const Spinner = () => (
  <div className="spinner-container">
    <img src={spinner} className="spinner" alt="loading..." />
  </div>
);

export default Spinner;
