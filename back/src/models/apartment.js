const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ApartmentSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type"
      // required: true
    },
    status: {
      type: String
      // required: true
    }
  },
  {
    timestamps: true
  }
);

ApartmentSchema.plugin(mongoosePaginate);

mongoose.model("Apartment", ApartmentSchema);
