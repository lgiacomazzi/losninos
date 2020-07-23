const mongoose = require("mongoose");

const Apartment = mongoose.model("Apartment");

module.exports = {
  async index(req, res) {
    // Listagem
    const apartments = await Apartment.paginate({}, { page, limit: 50 });
    return res.json(apartments);
  },

  async find(req, res) {
    // Listagem dos Aptos
    const apartments = await Apartment.find();
    return res.json(apartments);
  },

  async indexType(req, res) {
    // Listagem dos Tipos
    const apartments = await Apartment.find().populate({ path: "type" });
    return res.json(apartments);
  },

  async store(req, res) {
    // Criação
    const apartment = await Apartment.create(req.body);
    return res.json(apartment);
  },

  async update(req, res) {
    // Atualização
    const apartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
    return res.json(apartment);
  },

  async destroy(req, res) {
    // Deletar
    await Apartment.findByIdAndRemove(req.params.id);
    return res.send();
  },

  async show(req, res) {
    // Visualiza com Id
    const apartment = await Apartment.findById(req.params.id).populate({
      path: "type"
    });
    return res.json(apartment);
  }
};
