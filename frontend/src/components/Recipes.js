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

    // getRecipes();
  }, []);
  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Recipes:</h2>
      <div className="recipe-navbar">
        <label for="search">Recipe Name:&nbsp;</label>
        <input name="search" type="search" placeholder="Recipe Name" />
        <label for="calories">Calories:&nbsp;</label>
        <input
          name="calories"
          type="number"
          min="1"
          placeholder="Calorie Amount"
        />
        <label for="protein">Protein:&nbsp;</label>
        <input
          name="protein"
          type="number"
          min="1"
          placeholder="Protein Amount"
        />
        <label for="preferences">Preferences: &nbsp;</label>
        <select name="preferences">
          <option value="">Anything</option>
          <option value="gluten-free">Gluten-free</option>
          <option value="lactose-free">Lactose-free</option>
          <option value="paleo">Paleo</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
        <label for="meal-type">Meal Type:&nbsp;</label>
        <select name="meal-type">
          <option value="">Anything</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch/dinner">Lunch / Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <button>Search</button>
      </div>
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
