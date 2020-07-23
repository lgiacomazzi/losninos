import React from "react";
import Routes from "./routes";

import Header from "./components/header";

import "./mainstyles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Header />
      <div className="content">
        <div className="container">
          <Switch>
            <Routes />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </div>
);

export default App;
