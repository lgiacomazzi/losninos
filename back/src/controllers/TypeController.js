const mongoose = require("mongoose");

const Type = mongoose.model("Type");

module.exports = {
  async index(req, res) {
    // Listagem
    const types = await Type.find();
    return res.json(types);
  },

  async store(req, res) {
    // Criação
    const type = await Type.create(req.body);
    return res.json(type);
  },

  async update(req, res) {
    // Atualização
    const type = await Type.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(type);
  },

  async destroy(req, res) {
    // Deletar
    await Type.findByIdAndRemove(req.params.id);
    return res.send();
  },

  async show(req, res) {
    // Visualiza com Id
    const type = await Type.findById(req.params.id);
    return res.json(type);
  }
};
