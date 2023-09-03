import "./style.css";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";

const Calculator = () => {
  // ------------- STATES -------------
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [goalWeight, setGoalWeight] = useState(null);
  const [goal, setGoal] = useState("lose weight");
  const [bodybuilding, setBodyBuilding] = useState(false);
  const [activity, setActivity] = useState("inactive");
  const [calorieIntake, setCalorieIntake] = useState(null);
  const [proteinIntake, setProteinIntake] = useState(null);
  const [message, setMessage] = useState("");
  const [] = useState("");
  const [] = useState("");

  // ------------- CONTEXT -------------
  const {
    isLoggedIn,
    token,
    setUserName,
    userInfoMessage,
    setUserInfoMessage,
    userInfo, setUserInfo
  } = useContext(Context);

  const userData = {
    gender: gender,
    height: height,
    weight: weight,
    age: age,
    goalWeight: goalWeight,
    goal: goal,
    bodybuilding: bodybuilding,
    activity: activity,
    calorieIntake: calorieIntake,
    proteinIntake: proteinIntake,
  };

  // ------------- CALCULATE PROTEIN FUNCTION -------------
  const calculateProteinIntake = () => {
    let leanBodyMass = 0;
    if (gender === "male") {
      leanBodyMass = 0.407 * weight + 0.267 * height - 19.2;
    } else {
      leanBodyMass = 0.252 * weight + 0.473 * height - 48.3;
    }
    setProteinIntake(Math.round(leanBodyMass * 2.2));
  };

  // ------------- AVAILABLE GOAL OPTIONS -------------
  const getAvailableGoalOptions = () => {
    if (
      goalWeight < weight &&
      goalWeight !== null &&
      weight !== null &&
      goalWeight !== 0 &&
      weight !== 0 &&
      goalWeight !== "" &&
      weight !== ""
    ) {
      return ["lose weight", "lose weight fast"];
    } else if (
      goalWeight > weight &&
      goalWeight !== null &&
      weight !== null &&
      goalWeight !== 0 &&
      weight !== 0 &&
      goalWeight !== "" &&
      weight !== ""
    ) {
      return ["gain weight", "gain weight fast"];
    } else if (
      goalWeight === weight &&
      goalWeight !== null &&
      weight !== null &&
      goalWeight !== 0 &&
      weight !== 0 &&
      goalWeight !== "" &&
      weight !== ""
    ) {
      return ["maintain same weight"];
    } else {
      return [
        "lose weight",
        "lose weight fast",
        "maintain same weight",
        "gain weight",
        "gain weight fast",
      ];
    }
  };

  const availableGoalOptions = getAvailableGoalOptions();

  // --------- CALCULATE CALORIE FUNCTION ---------
  const calculateCalorieIntake = () => {
    if (height !== null && weight !== null && age !== null) {
      // BMR (BASAL METABOLIC RATE)
      let basalMetabolicRate = 0;
      let calorieBasedOnActivity = 0;

      if (gender === "male") {
        basalMetabolicRate =
          66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
      } else if (gender === "female") {
        basalMetabolicRate =
          655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
      }

      // ACTIVITY LEVELS
      if (activity === "inactive") {
        calorieBasedOnActivity = basalMetabolicRate * 1.2;
      } else if (activity === "lightly active") {
        calorieBasedOnActivity = basalMetabolicRate * 1.375;
      } else if (activity === "moderately active") {
        calorieBasedOnActivity = basalMetabolicRate * 1.55;
      } else if (activity === "active") {
        calorieBasedOnActivity = basalMetabolicRate * 1.725;
      } else if (activity === "very active") {
        calorieBasedOnActivity = basalMetabolicRate * 1.9;
      }

      // SET CALORIES BASED ON GOAL
      if (goal === "maintain same weight") {
        setCalorieIntake(Math.round(calorieBasedOnActivity));
      } else if (goal === "lose weight") {
        setCalorieIntake(Math.round(calorieBasedOnActivity - 500));
      } else if (goal === "lose weight fast") {
        setCalorieIntake(Math.round(calorieBasedOnActivity - 1000));
      } else if (goal === "gain weight") {
        setCalorieIntake(Math.round(calorieBasedOnActivity + 500));
      } else if (goal === "gain weight fast") {
        setCalorieIntake(Math.round(calorieBasedOnActivity + 1000));
      }
    }
  };
  // --------- CLEAR MESSAGE TIMER ---------
  const clearMessage = () => {
    setMessage("");
  };

  const clearMessageTimeout = () => {
    setTimeout(clearMessage, 5000);
  };

  // --------- SAVE DATA FUNCTION ---------
  const saveData = () => {
    axios
      .post(`http://localhost:5000/calculator`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  // --------- GET USER DATA FUNCTION ---------
  const getUserData = () => {
    axios
      .get(`http://localhost:5000/calculator`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.success === false) {
          setUserInfoMessage(response.data.message);
        }
        setUserInfo(response.data.userInfo[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, [token]);

  useEffect(() => {
    if (calorieIntake) {
      saveData();
    }
  }, [calorieIntake]);

  return (
    <div>
      <Link to="/" className="back-button">
        &lt;&lt; Back
      </Link>
      {isLoggedIn ? (
        <div className="info-and-calculator">
          <div>
            <>
              {userInfoMessage ? (
                <>
                  <h3>User Information</h3>
                  <p id="no-data-message">{userInfoMessage}</p>
                </>
              ) : (
                <div className="user-info">
                  <h3>User Information</h3>
                  <p>Username: {userInfo?.user?.userName}</p>
                  <p>Gender: {userInfo.gender}</p>
                  <p>Age: {userInfo.age} Years</p>
                  <p>Height: {userInfo.height} cm</p>
                  <p>Current Weight: {userInfo.weight} kg</p>
                  <p>Goal Weight: {userInfo.goalWeight} kg</p>
                  <p>Goal: {userInfo.goal}</p>
                  <p>Bodybuilding? {userInfo.proteinIntake} </p>
                  <p>Activity Level: {userInfo.activity}</p>
                  <p>Daily Calorie Intake: {userInfo.calorieIntake} Calories</p>
                  {userInfo.proteinIntake > 0 ? (
                    <p>Daily Protein Intake: {userInfo.proteinIntake} gm</p>
                  ) : null}
                </div>
              )}
            </>
          </div>
          <div>
            <div className="calculator">
              <h3>Calculator</h3>
              {/* GENDER ELEMENT */}
              <div>
                <label for="gender" className="input-name">
                  Gender:&nbsp;
                </label>
                <div className="calculator-input">
                  <select
                    name="gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              {/* AGE ELEMENT */}
              <div>
                <label for="age" className="input-name">
                  Age:&nbsp;
                </label>
                <div className="calculator-input">
                  <input
                    name="age"
                    type="number"
                    min="1"
                    max="100"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                  <label for="age">&nbsp;Years</label>
                </div>
              </div>
              {/* HEIGHT ELEMENT */}
              <div>
                <label for="height" className="input-name">
                  Height:&nbsp;
                </label>
                <div className="calculator-input">
                  <input
                    name="height"
                    type="number"
                    min="40"
                    max="230"
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
                  />
                  <label for="height">&nbsp;cm</label>
                </div>
              </div>
              {/* WEIGHT ELEMENT */}
              <div>
                <label for="weight" className="input-name">
                  Weight:&nbsp;
                </label>
                <div className="calculator-input">
                  <input
                    name="weight"
                    type="number"
                    min="1"
                    max="300"
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                  <label for="weight">&nbsp;kg</label>
                </div>
              </div>
              {/* GOAL WEIGHT ELEMENT */}
              <div>
                <label for="goal-weight" className="input-name">
                  Goal Weight:&nbsp;
                </label>
                <div className="calculator-input">
                  <input
                    name="goal-weight"
                    type="number"
                    min="20"
                    max="300"
                    onChange={(e) => {
                      setGoalWeight(e.target.value);
                    }}
                  />
                  <label for="goal-weight">&nbsp;kg</label>
                </div>
              </div>
              {/* GOAL ELEMENT */}
              <div>
                <label for="goal" className="input-name">
                  Goal:&nbsp;
                </label>
                <div className="calculator-input">
                  <select
                    name="goal"
                    onChange={(e) => {
                      setGoal(e.target.value);
                    }}
                  >
                    {availableGoalOptions.map((option) => (
                      <option value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                  {/* BODYBUILDING ELEMENT */}
                  <input
                    id="bodybuilding"
                    type="checkbox"
                    name="bodybuilding"
                    onClick={(e) => {
                      setBodyBuilding(e.target.checked);
                    }}
                  />
                  <label for="bodybuilding">Bodybuilding</label>
                </div>
              </div>
              {/* ACTIVITY ELEMENT */}
              <div>
                <label for="activity" className="input-name">
                  How active are you on a daily basis?&nbsp;
                </label>
                <div className="calculator-input">
                  <select
                    name="activity"
                    onChange={(e) => {
                      setActivity(e.target.value);
                    }}
                  >
                    <option value="inactive">Inactive (No Exercise)</option>
                    <option value="lightly active">
                      Lightly Active (Light Exercise)
                    </option>
                    <option value="moderately active">
                      Moderately Active (3-5 days/wk)
                    </option>
                    <option value="active">Active (6-7 days/wk)</option>
                    <option value="very active">
                      Very Active (Active & Physical Job)
                    </option>
                  </select>
                </div>
              </div>
              {/* BUTTON */}
              <div>
                <button
                  onClick={() => {
                    if (bodybuilding === true) {
                      calculateProteinIntake();
                    }
                    calculateCalorieIntake();
                    clearMessageTimeout();
                  }}
                >
                  Calculate
                </button>
              </div>

              {!userInfoMessage && isLoggedIn ? (
                <p>
                  Note: entering new data will erase previous progress tracking
                  data
                </p>
              ) : null}
            </div>
            <h3>{message}</h3>
            <h3>
              {calorieIntake !== null ? (
                <>
                  Recommended Daily Calorie Intake:&nbsp; {calorieIntake}{" "}
                  Calories
                </>
              ) : null}
            </h3>
            <h3>
              {proteinIntake !== null ? (
                <>Recommended Daily Protein Intake:&nbsp; {proteinIntake} gm</>
              ) : null}
            </h3>
            {calorieIntake !== null ? (
              <Link to="/recipes">Find Recipes</Link>
            ) : null}
          </div>
        </div>
      ) : (
        <h2 id="login-message">
          Log in or register to calculate your recommended nutritional intake
          and reach your goals
        </h2>
      )}
    </div>
  );
};

export default Calculator;
