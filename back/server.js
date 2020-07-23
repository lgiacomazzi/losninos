const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

// Iniciando o App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Permitir acesso externo
app.use(cors());

// Iniciando DB
mongoose.connect(
  "mongodb+srv://luciano:luciano@cluster0-agfcf.mongodb.net/losninos?retryWrites=true",
  { useNewUrlParser: true }
);
requireDir("./src/models");

// Declara Tabelas
const Customer = mongoose.model("Customer");
const Apartment = mongoose.model("Apartment");
const Type = mongoose.model("Type");
const Booking = mongoose.model("Booking");
const Payment = mongoose.model("Payment");

// Arquivo de Rotas
app.use(require("./src/routes"));

app.listen(process.env.PORT || 3333);
