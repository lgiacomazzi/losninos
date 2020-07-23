const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const BookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: true
    },
    checkIn: {
      type: Date,
      default: Date.now,
      required: true
    },
    checkOut: {
      type: Date,
      default: Date.now,
      required: true
    },
    contract: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    amountTotal: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

BookingSchema.plugin(mongoosePaginate);

mongoose.model("Booking", BookingSchema);
