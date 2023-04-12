import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import {getPublicUser, putCaloriesInUserProfile} from "../services/authService";

export const CalorieCalculator = () => {

  const navigate = useNavigate();
  const {auth} = useContext(AuthContext);
  
  const [dataErrors, setDataErrors] = useState({
    age: "",
    weight: "",
    height: "",
  });
  
  const [data, setData] = useState({
    "gender": "male",
    "age": "",
    "weight":"",
    "height":"",
    "activity": "1",  
  });
  const inputHandler = (event) => {
    setData({...data, [event.target.name] : event.target.value});
  }

  async function calculateCalories(e) {
    e.preventDefault();
    let totalCalories = 0;
    const isValid = formValidation(data);
    if(isValid){
      if (data.gender === "male" && data.activity === "1") {
        totalCalories =
          1.2 *
          (66.5 +
            13.75 * parseFloat(data.weight) +
            5.003 * parseFloat(data.height) -
            6.755 * parseFloat(data.age));
      } else if (data.gender === "male" && data.activity === "2") {
        totalCalories =
          1.375 *
          (66.5 +
            13.75 * parseFloat(data.weight) +
            5.003 * parseFloat(data.height) -
            6.755 * parseFloat(data.age));
      } else if (data.gender === "male" && data.activity === "3") {
        totalCalories =
          1.55 *
          (66.5 +
            13.75 * parseFloat(data.weight) +
            5.003 * parseFloat(data.height) -
            6.755 * parseFloat(data.age));
      } else if (data.gender === "male" && data.activity === "4") {
        totalCalories =
          1.725 *
          (66.5 +
            13.75 * parseFloat(data.weight) +
            5.003 * parseFloat(data.height) -
            6.755 * parseFloat(data.age));
      } else if (data.gender === "male" && data.activity === "5") {
        totalCalories =
          1.9 *
          (66.5 +
            13.75 * parseFloat(data.weight) +
            5.003 * parseFloat(data.height) -
            6.755 * parseFloat(data.age));
      } else if (data.gender === "female" && data.activity === "1") {
        totalCalories =
          1.2 *
          (655 +
            9.563 * parseFloat(data.weight) +
            1.85 * parseFloat(data.height) -
            4.676 * parseFloat(data.age));
      } else if (data.gender === "female" && data.activity === "2") {
        totalCalories =
          1.375 *
          (655 +
            9.563 * parseFloat(data.weight) +
            1.85 * parseFloat(data.height) -
            4.676 * parseFloat(data.age));
      } else if (data.gender === "female" && data.activity === "3") {
        totalCalories =
          1.55 *
          (655 +
            9.563 * parseFloat(data.weight) +
            1.85 * parseFloat(data.height) -
            4.676 * parseFloat(data.age));
      } else if (data.gender === "female" && data.activity === "4") {
        totalCalories =
          1.725 *
          (655 +
            9.563 * parseFloat(data.weight) +
            1.85 * parseFloat(data.height) -
            4.676 * parseFloat(data.age));
      } else if (data.gender === "female" && data.activity === "5"){
        totalCalories =
          1.9 *
          (655 +
            9.563 * parseFloat(data.weight) +
            1.85 * parseFloat(data.height) -
            4.676 * parseFloat(data.age));
      }
      const user = await getPublicUser(auth._id);
      if(user === {}){
        return;
      } 
      const updatedUser = await putCaloriesInUserProfile(auth.publicUserId, user.username, user.profilePic, user.description, data.gender, Number(data.age), Number(data.weight), Number(data.height), data.activity,  Number(totalCalories.toFixed(2)));
      console.log(updatedUser); 
      navigate(`/myProfile/${auth.publicUserId}`);
  
    }
    
  }

  function formValidation(data) {
    let errors = {
        age: "",
        height: "",
        weight: "",
    };
    let isValid = true;
    if (
        Number(data.age) < 15 || Number(data.age) > 80
    ) {
        isValid = false;
        errors.age = "The age must be between 15 and 80 years old";
    } 
    if (
        Number(data.weight) < 40 || Number(data.weight) > 250
    ) {
        isValid = false;
        errors.weight = "The weight must be between 40 and 250 kilograms";
    }
    if (
        Number(data.height) < 56 || Number(data.height) > 251
    ) {
        isValid = false;
        errors.height = "The height must be between 56 and 251 cm";
    } 
    if (
        data.age == ""
    ) {
        isValid = false;
        errors.age = "This field is required";
    } 
    if (
      data.weight == ""
    ) {
      isValid = false;
      errors.weight = "This field is required";
    }
    if (
      data.height == ""
    ) {
      isValid = false;
      errors.height = "This field is required";
    } 
      
      setDataErrors(errors);
      return isValid;
    }
    
    

  return (
    <>
      <h1 className="home-title">Calorie Calculator</h1>
      <form className="calorie-form" onSubmit={calculateCalories}>
        <div className="group" onChange={inputHandler}>
          <label className="gender">Gender</label>

          <input
            type="radio" id="male" name="gender" value="male" className="custom-control-input" defaultChecked
          />
          <label htmlFor="male">
            Male
          </label>

          <input type="radio" id="female" value="female" name="gender" className="custom-control-input" />
          <label htmlFor="female">
            Female
          </label>
        </div>
        <label htmlFor="age" >
          Age <span className="required">*</span>
        </label>
        <input type="number" name="age"  id="age" placeholder="Ages 15-80"  value={data.age} onChange={inputHandler}/>
        {dataErrors.age.length > 0 ? <div className="error">{dataErrors.age}</div> : "" }


        <label htmlFor="weight" >
          Weight <span className="required">*</span>
        </label>
        <input  type="number" name="weight"  id="weight" placeholder="In kilograms"  value={data.weight} onChange={inputHandler}/>
        {dataErrors.weight.length > 0 ? <div className="error">{dataErrors.weight}</div> : "" }

        <label htmlFor="height" >
          Height <span className="required">*</span>
        </label>
        <input type="number" name="height" className="form-control" id="height" placeholder="In centimeters" value={data.height} onChange={inputHandler} />
        {dataErrors.height.length > 0 ? <div className="error">{dataErrors.height}</div> : "" }
        
          <label className="activity-label">Activity</label>
         <div className="select">
          <select id="list" name="activity" onChange={inputHandler}>
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
