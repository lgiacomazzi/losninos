const express = require("express");
const routes = express.Router();

const CustomerController = require("./controllers/CustomerController");

routes.get("/customers", CustomerController.index);
routes.get("/customers/search/:search", CustomerController.search);
routes.get("/customers/:id", CustomerController.show);
routes.post("/customers", CustomerController.store);
routes.put("/customers/:id", CustomerController.update);
routes.delete("/customers/:id", CustomerController.destroy);

const ApartmentController = require("./controllers/ApartmentController");

routes.get("/apartments", ApartmentController.index);
routes.get("/apartments/find", ApartmentController.find);
routes.get("/apartmentsType", ApartmentController.indexType);
routes.get("/apartments/:id", ApartmentController.show);
routes.post("/apartments", ApartmentController.store);
routes.put("/apartments/:id", ApartmentController.update);
routes.delete("/apartments/:id", ApartmentController.destroy);

const BookingController = require("./controllers/BookingController");

routes.get("/bookings", BookingController.index);
routes.get("/bookings/:id", BookingController.show);
routes.post("/bookings", BookingController.store);
routes.put("/bookings/:id", BookingController.update);
routes.delete("/bookings/:id", BookingController.destroy);

const TypeController = require("./controllers/TypeController");

routes.get("/types", TypeController.index);
routes.post("/types", TypeController.store);
routes.put("/types/:id", TypeController.update);
routes.delete("/types/:id", TypeController.destroy);

const PaymentController = require("./controllers/PaymentController");

// routes.get("/payments", PaymentController.index);
routes.get("/payments/:type", PaymentController.index);
routes.get("/payments/:id", PaymentController.show);
routes.get("/c", PaymentController.indexSort);
routes.get("/payments/:type/:search", PaymentController.search);
routes.post("/payments", PaymentController.store);
routes.delete("/payments/:id", PaymentController.destroy);

module.exports = routes;
