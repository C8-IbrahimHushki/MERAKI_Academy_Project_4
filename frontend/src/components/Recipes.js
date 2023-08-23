import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=&app_id=0d87e582&app_key=b2f449817d9266c9107a6cbd43e84504&from=0&to=5&calories=591-722&health=alcohol-free&health=pork-free`
        );
        setRecipes(response.data.hits);
        console.log(response.data.hits);
      } catch (err) {
        console.log(err);
      }
    };

    getRecipes();
  }, []);
  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Recipes:</h2>
      {recipes &&
        recipes.map((recipe, i) => (
          <div key={i}>
            <img src={recipe.recipe.image} alt="Recipe" />
            <p>{recipe.recipe.label}</p>
          </div>
        ))}
    </div>
  );
};

export default Recipes;
