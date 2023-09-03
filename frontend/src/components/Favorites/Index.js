import React from "react";
import "./style.css"
import { Link } from "react-router-dom";

const Favorites = () => {
  return (
    <div>
      <h1>Favorites</h1>
      <Link to="/" className="back-button">Back</Link>
    </div>
  );
};

export default Favorites;
