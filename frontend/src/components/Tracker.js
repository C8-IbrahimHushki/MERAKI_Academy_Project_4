import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../App";

const Tracker = () => {
  const { isLoggedIn } = useContext(Context);
  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Personal Tracker</h2>
      {isLoggedIn !== true ? (
        <h2>Log in or register to enjoy your own personal tracker</h2>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Tracker;
