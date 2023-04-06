export const CalorieCalculator = () => {
  function calculateCalories(e) {
    const age = document.getElementById("age");
    const gender = document.querySelector(
      'input[name="customRadioInline1"]:checked'
    );
    const weight = document.getElementById("weight");
    const height = document.getElementById("height");
    const activity = document.getElementById("list").value;
    const totalCalories = document.getElementById("total-calories");

    if (
      age.value === "" ||
      weight.value === "" ||
      height.value === "" ||
      80 < age.value ||
      age.value < 15
    ) {
      errorMessage("Please make sure the values you entered are correct");
    } else if (gender.id === "male" && activity === "1") {
      totalCalories.value =
        1.2 *
        (66.5 +
          13.75 * parseFloat(weight.value) +
          5.003 * parseFloat(height.value) -
          6.755 * parseFloat(age.value));
    } else if (gender.id === "male" && activity === "2") {
      totalCalories.value =
        1.375 *
        (66.5 +
          13.75 * parseFloat(weight.value) +
          5.003 * parseFloat(height.value) -
          6.755 * parseFloat(age.value));
    } else if (gender.id === "male" && activity === "3") {
      totalCalories.value =
        1.55 *
        (66.5 +
          13.75 * parseFloat(weight.value) +
          5.003 * parseFloat(height.value) -
          6.755 * parseFloat(age.value));
    } else if (gender.id === "male" && activity === "4") {
      totalCalories.value =
        1.725 *
        (66.5 +
          13.75 * parseFloat(weight.value) +
          5.003 * parseFloat(height.value) -
          6.755 * parseFloat(age.value));
    } else if (gender.id === "male" && activity === "5") {
      totalCalories.value =
        1.9 *
        (66.5 +
          13.75 * parseFloat(weight.value) +
          5.003 * parseFloat(height.value) -
          6.755 * parseFloat(age.value));
    } else if (gender.id === "female" && activity === "1") {
      totalCalories.value =
        1.2 *
        (655 +
          9.563 * parseFloat(weight.value) +
          1.85 * parseFloat(height.value) -
          4.676 * parseFloat(age.value));
    } else if (gender.id === "female" && activity === "2") {
      totalCalories.value =
        1.375 *
        (655 +
          9.563 * parseFloat(weight.value) +
          1.85 * parseFloat(height.value) -
          4.676 * parseFloat(age.value));
    } else if (gender.id === "female" && activity === "3") {
      totalCalories.value =
        1.55 *
        (655 +
          9.563 * parseFloat(weight.value) +
          1.85 * parseFloat(height.value) -
          4.676 * parseFloat(age.value));
    } else if (gender.id === "female" && activity === "4") {
      totalCalories.value =
        1.725 *
        (655 +
          9.563 * parseFloat(weight.value) +
          1.85 * parseFloat(height.value) -
          4.676 * parseFloat(age.value));
    } else {
      totalCalories.value =
        1.9 *
        (655 +
          9.563 * parseFloat(weight.value) +
          1.85 * parseFloat(height) -
          4.676 * parseFloat(age.value));
    }

    document.getElementById("results").style.display = "block";

    document.getElementById("loading").style.display = "none";
  }

  function errorMessage(error) {
    document.getElementById("results").style.display = "none";

    document.getElementById("loading").style.display = "none";
    const errorDiv = document.createElement("div");
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);
  }

  return (
    <>
      <h1 className="home-title">Calorie Calculator</h1>
      <form className="calorie-form">
        <div className="group">
          <label className="gender">Gender</label>

          <input
            type="radio" id="male" name="customRadioInline1" className="custom-control-input" defaultChecked="checked"
          />
          <label className="custom-control-label" htmlFor="male">
            Male
          </label>

          <input type="radio" id="female" name="customRadioInline1" className="custom-control-input"  />
          <label className="custom-control-label" htmlFor="female">
            Female
          </label>
        </div>
        <label htmlFor="age" className="col-sm-2 col-form-label">
          Age
        </label>
        <input type="number" className="form-control" id="age" placeholder="Ages 15-80" />


        <label htmlFor="weight" className="col-sm-2 col-form-label">
          Weight
        </label>
        <input  type="number" className="form-control" id="weight" placeholder="In kilograms" />
        <label htmlFor="height" className="col-sm-2 col-form-label">
          Height
        </label>
        <input type="number" className="form-control" id="height" placeholder="In centimeters" />

          <label className="col-form-label col-sm-2 pt-0">Activity</label>
         <div className="select">
          <select id="list">
            <option value={1}>
              Sedentary (little or no exercise)
            </option>
            <option value={2}>
              Lightly active (light exercise/sports 1-3 days/week)
            </option>
            <option value={3}>
              Moderately active (moderate exercise/sports 3-5 days/week)
            </option>
            <option value={4}>
              Very active (hard exercise/sports 6-7 days a week)
            </option>
            <option value={5}>
              Extra active (very hard exercise/sports &amp; physical job or 2x
              training)
            </option>
          </select>
        </div>
        <input type="submit" className="btn calorie-btn" value="Calculate" />
      </form>
    </>
  );
};
