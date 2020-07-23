import React from "react";

import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import Customers from "./pages/customers/customers";
import CustomersMain from "./pages/customers/customersMain";
import Calendar from "./pages/calendar/calendar";
import Apartments from "./pages/apartments/apartments";
import ApartmentsMain from "./pages/apartments/apartmentsMain";
import ApartmentTypes from "./pages/apartments/apartmentTypes";
import PaymentsMain from "./pages/payments/paymentsMain";
import Bookings from "./pages/bookings/bookings";
import BookingsMain from "./pages/bookings/bookingsMain";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/calendar" component={Calendar} />
    <Route exact path="/apartments" component={ApartmentsMain} />
    <Route path="/apartments/:id" component={Apartments} />
    <Route exact path="/apartment/types" component={ApartmentTypes} />
    <Route exact path="/customers" component={CustomersMain} />
    <Route path="/customers/:id" component={Customers} />
    <Route exact path="/payments" component={PaymentsMain} />
    <Route exact path="/bookings" component={BookingsMain} />
    <Route path="/bookings/:id" component={Bookings} />
  </Switch>
);

export default Routes;
