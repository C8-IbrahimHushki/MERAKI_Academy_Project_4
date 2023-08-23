import "./App.css";
import { Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Calculator from "./components/Calculator";
import { createContext, useState } from "react";

export const Context = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Context.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
