const mongoose = require("mongoose");

const Customer = mongoose.model("Customer");

module.exports = {
  async index(req, res) {
    // Listagem
    const { page = 1 } = req.query;
    const customers = await Customer.paginate({}, { page, limit: 50 });
    return res.json(customers);
  },

  async search(req, res) {
    const search = req.params.search;

    const customers = await Customer.find({
      nome: { $regex: search, $options: "i" }
    });
    return res.json(customers);
  },

  async store(req, res) {
    // Criação
    const customer = await Customer.create(req.body);
    return res.json(customer);
  },

  async update(req, res) {
    // Atualização
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(customer);
  },

  async destroy(req, res) {
    // Deletar
    await Customer.findByIdAndRemove(req.params.id);
    return res.send();
  },

  async show(req, res) {
    // Visualiza com Id
    const customer = await Customer.findById(req.params.id);
    return res.json(customer);
  }
};
