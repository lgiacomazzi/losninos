const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CustomerSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    cpf: {
      type: String,
      required: true
    },
    rg: {
      type: String
    },
    profissao: {
      type: String
    },
    civil: {
      type: String
    },
    cep: {
      type: String
    },
    street: {
      type: String
    },
    streetNumber: {
      type: String
    },
    bairro: {
      type: String
    },
    city: {
      type: String
    },
    uf: {
      type: String
    },
    birthDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

CustomerSchema.plugin(mongoosePaginate);

mongoose.model("Customer", CustomerSchema);
