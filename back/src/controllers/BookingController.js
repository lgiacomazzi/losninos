const mongoose = require("mongoose");

const Booking = mongoose.model("Booking");

module.exports = {
  async index(req, res) {
    // Listagem
    const { page = 1 } = req.query;
    const bookings = await Booking.find()
      .populate({
        path: "apartment",
        populate: { path: "type" }
      })
      .populate({
        path: "customer"
      });
    return res.json(bookings);
  },

  async store(req, res) {
    // Criação
    const booking = await Booking.create(req.body);
    return res.json(booking);
  },

  async update(req, res) {
    // Atualização
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(booking);
  },

  async destroy(req, res) {
    // Deletar
    await Booking.findByIdAndRemove(req.params.id);
    return res.send();
  },

  async show(req, res) {
    // Visualiza com Id
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: "apartment",
        populate: { path: "type" }
      })
      .populate({
        path: "customer"
      });
    return res.json(booking);
  }
};
