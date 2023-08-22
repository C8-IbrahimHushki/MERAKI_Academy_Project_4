import React, { useEffect } from "react";
import axios from "axios";

const getAllRecipes = () => {
  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/search?q=&app_id=0d87e582&app_key=b2f449817d9266c9107a6cbd43e84504&from=0&to=5&calories=591-722&health=alcohol-free&health=pork-free`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};

export default getAllRecipes;
