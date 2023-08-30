import "./App.css";
import { Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes/Index";
import Home from "./components/Home/Index";
import Favorites from "./components/Favorites/Index";
import Navbar from "./components/Navbar/Index";
import Register from "./components/Register/Index";
import Login from "./components/Login/Index";
import Calculator from "./components/Calculator/Index";
import Tracker from "./components/Tracker/Index";
import { createContext, useState } from "react";

export const Context = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Context.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken }}>
      <div className="App">
        <h1>MyNutrition</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
