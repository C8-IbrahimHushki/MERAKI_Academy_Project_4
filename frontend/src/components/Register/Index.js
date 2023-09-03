import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn, setToken } = useContext(Context);

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
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        navigate("/calculator");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div>
      {" "}
      <Link to="/" className="back-button">
        &lt;&lt; Back
      </Link>
      <div className="register">
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
    </div>
  );
};

export default Register;
