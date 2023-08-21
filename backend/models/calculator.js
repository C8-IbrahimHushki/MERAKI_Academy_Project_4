const mongoose = require("mongoose");

const calculatorSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
});

module.exports = mongoose.model("Calculator", calculatorSchema);
