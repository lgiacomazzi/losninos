import React from "react";
import Routes from "./routes";

import { Header } from "./components/index.js";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </div>
);

export default App;
