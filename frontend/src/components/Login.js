import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
        <Link to="/">Back</Link>
      <h2>Log In</h2>
      <label for="email">Email:&nbsp;</label>
      <input name="email" type="email" placeholder="Email" />
      <br />
      <label for="password">Password:&nbsp;</label>
      <input name="password" type="password" placeholder="Password" />
      <br />
      <button>Log In</button>
    </div>
  );
};

export default Login;
