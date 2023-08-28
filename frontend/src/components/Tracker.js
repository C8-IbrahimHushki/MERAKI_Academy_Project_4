import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../App";

const Tracker = () => {
  const [changeGoal, setChangeGoal] = useState(false);
  const [changeCalorieGoal, setChangeCalorie] = useState(false);
  const [changeProteinGoal, setChangeProteinGoal] = useState(false);
  const { isLoggedIn } = useContext(Context);

  return (
    <div>
      <Link to="/">&lt;&lt; Back</Link>
      <h2>Personal Tracker</h2>
      {isLoggedIn !== true ? (
        <h2>Log in or register to enjoy your own personal tracker</h2>
      ) : (
        <>
          {/* --------- WEIGHT PROGRESS --------- */}
          <h3>Weight Progress:</h3>
          <input name="weight" type="number" placeholder="Current Weight" />
          <label for="weight">&nbsp;kg</label>
          <button>Enter</button>
          {/* INSERT PROGRESS GRAPH HERE */}
          <p>Goal Weight:</p>
          <p name="goal weight">65 kg</p>
          {changeGoal === false ? (
            <>
              <button
                onClick={() => {
                  setChangeGoal(true);
                }}
              >
                Change Goal
              </button>
            </>
          ) : (
            <>
              <input placeholder="New Goal"></input> <label>kg</label>
              <button>Enter</button>
              <button
                onClick={() => {
                  setChangeGoal(false);
                }}
              >
                Cancel
              </button>
              <br />
            </>
          )}
          {/* --------- CALORIE TRACKER --------- */}
          <h3>Calorie Intake:</h3>
          <p>calories consumed today/ daily goal</p>

          <progress id="file" value="95" max="100"></progress>
          <label>&nbsp;95%</label>
          <input type="number" placeholder="Calories" />
          <button>Add</button>
          <br />
          {changeCalorieGoal === false ? (
            <>
              <button
                onClick={() => {
                  setChangeCalorie(true);
                }}
              >
                Change Goal
              </button>
            </>
          ) : (
            <>
              <input placeholder="New Goal"></input> <label>kg</label>
              <button>Enter</button>
              <button
                onClick={() => {
                  setChangeCalorie(false);
                }}
              >
                Cancel
              </button>
            </>
          )}
          <br />
          <Link to="/recipes">Find a recipe</Link>
          {/* --------- PROTEIN TRACKER --------- */}
          <h3>Protein Intake:</h3>
          <p>protein consumed today/ daily goal</p>

          <progress id="file" value="95" max="100"></progress>
          <label>&nbsp;95%</label>
          <input type="number" placeholder="grams" />
          <button>Add</button>
          <br />
          {changeProteinGoal === false ? (
            <>
              <button
                onClick={() => {
                  setChangeProteinGoal(true);
                }}
              >
                Change Goal
              </button>
            </>
          ) : (
            <>
              <input placeholder="New Goal"></input> <label>gm</label>
              <button>Enter</button>
              <button
                onClick={() => {
                  setChangeProteinGoal(false);
                }}
              >
                Cancel
              </button>
            </>
          )}
          <br />
          <Link to="/recipes">Find a recipe</Link>
        </>
      )}
    </div>
  );
};

export default Tracker;
