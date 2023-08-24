import React from "react";
import { Link } from "react-router-dom";

const Calculator = () => {
  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Calculator</h2>
      <label for="gender">Gender:&nbsp;</label>
      <select name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br />
      <label for="height">Height:&nbsp;</label>
      <input name="height" placeholder="Height" />
      <p>cm</p>
      <label for="weight">Weight:&nbsp;</label>
      <input
        name="weight"
        type="number"
        min="1"
        max="300"
        placeholder="Weight"
      />
      <p>kg</p>
      <label for="age">Age:&nbsp;</label>
      <input name="age" type="number" min="1" max="100" placeholder="Age" />
      <br />
      <label for="goal-weight">Goal Weight:&nbsp;</label>
      <input
        name="goal-weight"
        type="number"
        min="20"
        max="300"
        placeholder="Goal Weight"
      />
      <br />
      <label for="goal">Goal:&nbsp;</label>
      <select name="goal">
        <option value="lose-weight">Lose Weight</option>
        <option value="lose-weight-fast">Lose Weight Fast</option>
        <option value="maintain-same-weight">Maintain Same Weight</option>
        <option value="gain-weight">Gain Weight</option>
        <option value="gain-weight-fast">Gain Weight Fast</option>
      </select>
      <input type="checkbox" name="bodybuilding" />
      <label for="bodybuilding">Bodybuilding</label>
      <br />
      <label for="activity">How active are you on a daily basis?&nbsp;</label>
      <select name="activity">
        <option value="light">Lightly Active</option>
        <option value="moderate">Moderately Active</option>
        <option value="active">Active</option>
        <option value="very">Very Active</option>
      </select>
      <br />
      <button>Calculate</button>
    </div>
  );
};

export default Calculator;
