import React from "react";

import {
  BrowserRouter,
  Switch,
  Route,
  HashRouter,
  NavLink
} from "react-router-dom";

import Customers from "./pages/customers/customers";
import Home from "./pages/home/home.js";
import Apartments from "./pages/apartments/apartments";
import ApartmentSingle from "./pages/apartments/apartment_single";
import Payments from "./pages/payments/payments";

import { Header } from "./components";

const Routes = () => (
  <>
    <Header />

    <Switch>
      <div className="content">
        <Route exact path="/" component={Home} />
        <div className="container pt-5">
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/apartments" component={Apartments} />
          <Route exact path="/apartments/:id" component={ApartmentSingle} />
          <Route exact path="/payments" component={Payments} />
        </div>
      </div>
    </Switch>
  </>
);

export default Routes;
