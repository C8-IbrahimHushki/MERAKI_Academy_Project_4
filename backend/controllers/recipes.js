const recipesModel = require("../models/favorites");

/* API : https://api.edamam.com/search?q=&app_id=0d87e582&app_key=b2f449817d9266c9107a6cbd43e84504&from=0&to=5&calories=591-722&health=alcohol-free&health=pork-free
 */

const addRecipeToFavorites = (req, res) => {
  const { title, calories, protein, tags } = req.body;
  const newRecipe = new recipesModel({
    title,
    calories,
    protein,
    tags,
  });

  newRecipe
    .save()
    .then((recipes) => {
      if (recipes.length) {
        res.status(200).json({
          success: true,
          message: `Recipe Added to Favorites`,
          recipes: recipes,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Favorite Recipes`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllFavorites = (req, res) => {

}

module.exports = { addRecipeToFavorites };
