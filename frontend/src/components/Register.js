import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const newUser = {
    userName: userName,
    email: email,
    password: password,
  };

  const clearMessage = () => {
    setMessage("");
  };

  const clearMessageTimeout = () => {
    setTimeout(clearMessage, 5000);
  };

  const saveUser = () => {
    axios
      .post(`http://localhost:5000/users/register`, newUser)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <Link to="/">&lt;&lt; Back</Link>
      <h2>Register</h2>
      <label for="userName">Username:&nbsp;</label>
      <input
        name="userName"
        placeholder="Username"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <br />
      <label for="email">Email:&nbsp;</label>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <label for="password">Password:&nbsp;</label>
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <label for="confirm-password">Confirm Password:&nbsp;</label>
      <input
        name="confirm-password"
        type="password"
        placeholder="Confrim Password"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          if (password === confirmPassword) {
            saveUser();
          } else {
            setMessage("Password confirmation does not match");
            clearMessageTimeout();
          }
        }}
      >
        Register
      </button>
      <br />
      <p>
        Already have an account?{" "}
        {<Link to="/users/login">Click here to log in</Link>}
      </p>
      <h2>{message}</h2>
    </div>
  );
};

export default Register;
