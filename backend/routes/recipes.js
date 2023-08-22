const express = require("express");
const { addRecipeToFavorites } = require("../controllers/recipes");

const recipesRouter = express.Router();

recipesRouter.get("/recipes", addRecipeToFavorites)

module.exports = recipesRouter;
