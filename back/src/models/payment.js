const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PaymentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    reservationId: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      default: Date.now
    },
    paymentDate: {
      type: Date
    },
    amountTotal: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

PaymentSchema.plugin(mongoosePaginate);

mongoose.model("Payment", PaymentSchema);
