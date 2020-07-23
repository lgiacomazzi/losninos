const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    dayPrice: {
      type: Number
    },
    monthPrice: {
      type: Number
    },
    discountPrice: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

mongoose.model("Type", TypeSchema);
