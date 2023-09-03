import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import "./style.css";
import axios from "axios";

const Tracker = () => {
  const [changeGoal, setChangeGoal] = useState(false);
  const [changeCalorieGoal, setChangeCalorie] = useState(false);
  const [changeProteinGoal, setChangeProteinGoal] = useState(false);
  const [message, setMessage] = useState("")

  const { isLoggedIn, userInfo, token } = useContext(Context);
  const [weightProgress] = useState(userInfo)

  const newInfo = {};

  const updateInfo = () => {
    axios
      .put(`http://localhost:5000/calculator`, newInfo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setMessage(response.data.message)
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const clearMessage = () => {
    setMessage("");
  };

  const clearMessageTimeout = () => {
    setTimeout(clearMessage, 3000);
  };
 
  const progressInfo = {};

  const trackInfo = () => {

  }

  return (
    <div>
      <Link to="/" className="back-button">
        &lt;&lt; Back
      </Link>
      {isLoggedIn !== true ? (
        <h2>Log in or register to enjoy your own personal tracker</h2>
      ) : (
        <>
          {/* --------- WEIGHT PROGRESS --------- */}
          <h2>Personal Tracker</h2>
          <div className="tracker-page">
            <div className="trackers">
              <h3>Weight Progress:</h3>
              <progress id="file" value={weightProgress} max="100"></progress>
              <input
                type="number"
                placeholder="Current Weight"
                onChange={(e) => {
                  newInfo.weight = e.target.value;
                }}
              />
              <button onClick={()=>{
                updateInfo()
                clearMessageTimeout()
              }}>Enter</button>
              <p>Goal Weight: {userInfo.goalWeight} kg</p>
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
            </div>
            {/* --------- CALORIE TRACKER --------- */}
            <div className="trackers">
              <h3>Calorie Intake:</h3>
              <p>calories consumed today/ {userInfo.calorieIntake} calories</p>
              <progress id="file" value="95" max="100"></progress>
              <label>&nbsp;95%</label>
              <input type="number" placeholder="Calories" min="1" max="10000" />
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
                  <input placeholder="New Goal" min="1" max="10000"></input>{" "}
                  <label>kg</label>
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
            </div>
            {/* --------- PROTEIN TRACKER --------- */}
            <div className="trackers">
              <h3>Protein Intake:</h3>
              <p>protein consumed today/ {userInfo.proteinIntake} gm</p>

              <progress id="file" value="95" max="100"></progress>
              <label>&nbsp;95%</label>
              <input type="number" placeholder="grams" min="1" max="1000" />
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
                  <input placeholder="New Goal" min="1" max="1000"></input>{" "}
                  <label>gm</label>
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
            </div>
          </div>
        </>
      )}
      <h2>{message}</h2>
    </div>
  );
};

export default Tracker;
