const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String },
  calories: { type: Number },
  protein: { type: Number },
  tags: { type: String },
});

// https://api.edamam.com/search?q=&app_id=0d87e582&app_key=b2f449817d9266c9107a6cbd43e84504&from=0&to=10&calories=591-722&health=alcohol-free&health=pork-free
module.exports = mongoose.model("Recipe", recipeSchema);
