import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  return (
    <div>
      {isLoggedIn === true ? (
        <>
          <Link to="/favorites">Favorites</Link>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/users/register">Register</Link>
          <Link to="/users/login">Log In</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
