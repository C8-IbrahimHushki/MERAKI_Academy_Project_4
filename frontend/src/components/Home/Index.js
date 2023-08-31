import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div
        className="home-navigation-buttons"
        onClick={() => {
          navigate("/recipes");
        }}
      >
        <p>Recipes</p>
      </div>
      <div
        className="home-navigation-buttons"
        onClick={() => {
          navigate("/calculator");
        }}
      >
        <p>Calculator</p>
      </div>
      <div
        className="home-navigation-buttons"
        onClick={() => {
          navigate("/tracker");
        }}
      >
        <p>Tracker</p>
      </div>
    </div>
  );
};

export default Home;
