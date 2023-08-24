import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {isLoggedIn,setIsLoggedIn } = useContext(Context);

  const loggedUser = {
    email: email,
    password: password,
  };

  const loginUser = () => {
    axios
      .post(`http://localhost:5000/users/login`, loggedUser)
      .then((response) => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", isLoggedIn)
        console.log(response);
        navigate(-1)
      })
      .catch((err) => {
        setMessage(err.response.data.message)
      });
  };

  return (
    <div>
      <Link to="/">Back</Link>
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
        }}
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
