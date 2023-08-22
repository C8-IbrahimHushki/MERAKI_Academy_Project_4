import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <Routes>
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </div>
  );
}

export default App;
