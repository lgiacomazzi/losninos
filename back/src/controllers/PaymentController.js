const mongoose = require("mongoose");

const Payment = mongoose.model("Payment");

module.exports = {
  async index(req, res) {
    // Listagem
    const type = req.params.type;
    const payments = await Payment.find({ type }).sort({ createdAt: -1 });
    // const pages = payments.paginate({}, { page, limit: 200 });
    return res.json(payments);
  },

  async search(req, res) {
    //Busca req.query search
    const search = req.params.search;
    const type = req.params.type;

    const payments = await Payment.find({
      title: { $regex: search, $options: "i" },
      type: type
    });
    return res.json(payments);
  },

  async indexSort(req, res) {
    // Listagem com Sort
    const mysort = { createdAt: -1 };
    const { month, year } = req.query;
    const filter = {
      createdAt: {
        $gte: `${year}-${month}-01`,
        $lt: `${year}-${month}-31`
      }
    };
    const payments = await Payment.find(filter).sort(mysort);
    return res.json(payments);
  },

  async store(req, res) {
    // Criação
    const payment = await Payment.create(req.body);
    return res.json(payment);
  },

  async update(req, res) {
    // Atualização
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(payment);
  },

  async destroy(req, res) {
    // Deletar
    await Payment.findByIdAndRemove(req.params.id);
    return res.send();
  },

  async show(req, res) {
    // Visualiza com Id
    const payment = await Payment.findById(req.params.id);
    return res.json(payment);
  }
};
