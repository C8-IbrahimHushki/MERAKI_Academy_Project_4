import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [searchInput, setSearchInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchInput}&app_id=0d87e582&app_key=b2f449817d9266c9107a6cbd43e84504&from=0&to=32&calories=0-${caloriesInput}&health=alcohol-free&health=pork-free`
      );
      setRecipes(response.data.hits);
      console.log(response.data.hits);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const initialRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=&app_id=0d87e582&app_key=b2f449817d9266c9107a6cbd43e84504&from=0&to=32&calories=500-1500&health=alcohol-free&health=pork-free`
        );
        setRecipes(response.data.hits);
        console.log(response.data.hits);
      } catch (err) {
        console.log(err);
      }
    };
    initialRecipes();
  }, []);

  return (
    <div>
      <Link to="/" className="back-button">
        &lt;&lt; Back
      </Link>
      <h2>Recipes:</h2>
      <div className="recipe-navbar">
        <label for="search">Recipe Name:&nbsp;</label>
        <input
          name="search"
          type="search"
          placeholder="Example: chicken"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <label for="calories">Maximum calories:&nbsp;</label>
        <input
          name="calories"
          type="number"
          min="1"
          placeholder="Example: 400"
          onChange={(e) => {
            setCaloriesInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getRecipes();
          }}
        >
          Search
        </button>
      </div>
      <div className="recipes">
        {recipes &&
          recipes.map((recipe, i) => (
            <div className="single-recipe" key={i} onClick={()=>{
              window.open(recipe.recipe.url, '_blank');
            }}>
              <img src={recipe.recipe.image} alt="Recipe" />
              <p>{recipe.recipe.label}</p>
              <p>Calories: {Math.round((recipe.recipe.calories))} calorie</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recipes;
