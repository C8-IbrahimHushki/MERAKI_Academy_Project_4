import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";

const Calculator = () => {
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
  const { isLoggedIn, token } = useContext(Context);

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

  const calculateProteinIntake = () => {
    let leanBodyMass = 0;
    if (gender === "male") {
      leanBodyMass = 0.407 * weight + 0.267 * height - 19.2;
    } else {
      leanBodyMass = 0.252 * weight + 0.473 * height - 48.3;
    }
    setProteinIntake(Math.round(leanBodyMass * 2.2));
  };

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
      } else if (activity === "light") {
        calorieBasedOnActivity = basalMetabolicRate * 1.375;
      } else if (activity === "moderate") {
        calorieBasedOnActivity = basalMetabolicRate * 1.55;
      } else if (activity === "active") {
        calorieBasedOnActivity = basalMetabolicRate * 1.725;
      } else if (activity === "very") {
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

  const clearMessage = () => {
    setMessage("");
  };

  const clearMessageTimeout = () => {
    setTimeout(clearMessage, 5000);
  };


  const saveData = () => {
    axios
      .post(`http://localhost:5000/calculator`, userData,{headers: {Authorization: `Bearer ${token}`}})
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  

  useEffect(() => {
if (calorieIntake) {
  saveData();
}
  }, [calorieIntake])
  
  return (
    <div>
      <Link to="/">&lt;&lt; Back</Link>
      <h3>Calculator</h3>
      {isLoggedIn !== true ? (
        <h2>
          Log in or register to calculate your recommended nutritional intake
          and reach your goals
        </h2>
      ) : (
        <>
          {/* GENDER ELEMENT */}
          <label for="gender">Gender:&nbsp;</label>
          <select
            name="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          {/* AGE ELEMENT */}
          <label for="age">Age:&nbsp;</label>
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
          <br />
          {/* HEIGHT ELEMENT */}
          <label for="height">Height:&nbsp;</label>
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
          <br />
          {/* WEIGHT ELEMENT */}
          <label for="weight">Weight:&nbsp;</label>
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
          <br />
          {/* GOAL WEIGHT ELEMENT */}
          <label for="goal-weight">Goal Weight:&nbsp;</label>
          <input
            name="goal-weight"
            type="number"
            min="20"
            max="300"
            onChange={(e) => {
              setGoalWeight(e.target.value);
            }}
          />
          <label for="goal">&nbsp;kg</label>
          <br />
          {/* GOAL ELEMENT */}
          <label for="goal">Goal:&nbsp;</label>
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
            type="checkbox"
            name="bodybuilding"
            onClick={(e) => {
              setBodyBuilding(e.target.checked);
            }}
          />
          <label for="bodybuilding">Bodybuilding</label>
          <br />
          {/* ACTIVITY ELEMENT */}
          <label for="activity">
            How active are you on a daily basis?&nbsp;
          </label>
          <select
            name="activity"
            onChange={(e) => {
              setActivity(e.target.value);
            }}
          >
            <option value="inactive">Inactive (No Exercise)</option>
            <option value="light">Lightly Active (Light Exercise)</option>
            <option value="moderate">Moderately Active (3-5 days/wk)</option>
            <option value="active">Active (6-7 days/wk)</option>
            <option value="very">Very Active (Active & Physical Job)</option>
          </select>
          <br />
          {/* BUTTON */}
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
          <h3>{message}</h3>
          <h3>
            {calorieIntake !== null ? (
              <>
                Recommended Daily Calorie Intake:&nbsp; {calorieIntake} Calories
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
        </>
      )}
    </div>
  );
};

export default Calculator;
