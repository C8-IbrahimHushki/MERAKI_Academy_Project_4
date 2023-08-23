import React from "react";
import { Link } from "react-router-dom";


const Register = () => {
  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Register</h2>
      <label for="userName">Username:&nbsp;</label>
      <input name="userName" placeholder="Username" />
      <br />
      <label for="email">Email:&nbsp;</label>
      <input name="email" type="email" placeholder="Email" />
      <br />
      <label for="password">Password:&nbsp;</label>
      <input name="password" type="password" placeholder="Password" />
      <br />
      <label for="confirm-password">Confirm Password:&nbsp;</label>
      <input name="confirm-password" type="password" placeholder="Confrim Password" />
      <br />
      <button>Register</button>
    </div>
  );
};

export default Register;
