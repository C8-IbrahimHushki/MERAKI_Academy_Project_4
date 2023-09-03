import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { Context } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userName } = useContext(Context);
  return (
    <div className="navbar">
      <h1 id="website-name"
        onClick={() => {
          navigate("/");
        }}
      >
        MyNutrition
      </h1>
      {isLoggedIn === true ? (
        <div className="navbar-buttons">
          <p>Username: {userName}</p>
          <Link to="/favorites" id="favorites">Favorites</Link>
          <Link
            to="/"
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.clear();
            }}
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="navbar-buttons">
          <Link to="/users/register">Register</Link>
          <Link to="/users/login">Log In</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
