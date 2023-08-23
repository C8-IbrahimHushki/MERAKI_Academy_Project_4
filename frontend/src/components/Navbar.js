import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../App";

const Navbar = () => {
    const {isLoggedIn} = useContext(Context)
  return (
    <div>
        {isLoggedIn === false ? <Link to="/favorites">Favorites</Link> : null}
    </div>
  );
};

export default Navbar;
