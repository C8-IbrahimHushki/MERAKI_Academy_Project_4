import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../App";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn, setToken } = useContext(Context);

  const loggedUser = {
    email: email,
    password: password,
  };

  const clearMessage = () => {
    setMessage("");
  };

  const clearMessageTimeout = () => {
    setTimeout(clearMessage, 5000);
  };

  const loginUser = () => {
    axios
      .post(`http://localhost:5000/users/login`, loggedUser)
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        navigate(-1);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      <Link to="/">&lt;&lt; Back</Link>
      <h2>Log In</h2>
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
      <button
        onClick={() => {
          loginUser();
          clearMessageTimeout();
        }}
      >
        Log In
      </button>
      <br />
      <p>
        Don't have an account?{" "}
        {<Link to="/users/register">Click here to register</Link>}
      </p>

      <h2>{message}</h2>
    </div>
  );
};

export default Login;
