import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { createDietDay, getLastDietDay } from "../services/dietDayService";


export const CreateDietDay = () => {
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const [dataErrors, setDataErrors] = useState({
        "breakfast": "",
        "breakfast-calories": "",
        "lunch": "",
        "lunch-calories": "",
        "afternoon": "",
        "afternoon-calories": "",
        "dinner": "",
        "dinner-calories": "",
    });

    const submitHandler = async (event) => {
        event.preventDefault();
        let isValid = true;
        let errors = {
            "breakfast": "",
            "breakfast-calories": "",
            "lunch": "",
            "lunch-calories": "",
            "afternoon": "",
            "afternoon-calories": "",
            "dinner": "",
            "dinner-calories": "",
        };
        const data = Object.fromEntries(new FormData(event.target))
        for (const key in data) {
            if (data[key] === "") {
                errors[key] = "This field is required";
                isValid = false;
            }
        }
        data.totalCalories = Number(data["breakfast-calories"]) + Number(data["lunch-calories"]) + Number(data["afternoon-calories"]) + Number(data["dinner-calories"]);
        data["breakfast-calories"] = Number(data["breakfast-calories"]);
        data["lunch-calories"] = Number(data["lunch-calories"]);
        data["afternoon-calories"] = Number(data["afternoon-calories"]);
        data["dinner-calories"] = Number(data["dinner-calories"]);
        
        if (data["breakfast-calories"] >3000) {
            errors["breakfast-calories"] = "The maximum calories are 3000";
            isValid = false;
        }
        if (data["lunch-calories"] >3000) {
            errors["lunch-calories"] = "The maximum calories are 3000";
            isValid = false;
        }
        if (data["afternoon-calories"] >3000) {
            errors["afternoon-calories"] = "The maximum calories are 3000";
            isValid = false;
        }
        if (data["dinner-calories"] >3000) {
            errors["dinner-calories"] = "The maximum calories are 3000";
            isValid = false;
        } 
        if (["breakfast-calories"] <0) {
            errors["breakfast-calories"] = "The calories can't be negative";
            isValid = false;
        }
        if (["lunch-calories"] <0) {
            errors["lunch-calories"] = "The calories can't be negative";
            isValid = false;
        }
        if (["afternoon-calories"] <0) {
            errors["afternoon-calories"] = "The calories can't be negative";
            isValid = false;
        }
        if (["dinner-calories"] <0) {
            errors["dinner-calories"] = "The calories can't be negative";
            isValid = false;
        }
        if ((data["breakfast"]).length >50) {
            errors["breakfast"] = "The maximum length of the field must be max 50 symbols";
            isValid = false;
        }
        if ((data["lunch"]) >50) {
            errors["lunch"] = "The maximum length of the field must be max 50 symbols";
            isValid = false;
        }
        if ((data["afternoon"]) >50) {
            errors["afternoon"] = "The maximum length of the field must be max 50 symbols";
            isValid = false;
        }
        if ((data["dinner"]) >50) {
            errors["dinner"] = "The maximum length of the field must be max 50 symbols";
            isValid = false;
        }
        setDataErrors(errors);

        //if (isValid ) {
            const lastDay = await getLastDietDay(auth._id);
            if (lastDay.length === 0) {
                data.day = 1;
            } else {
                data.day = Number(lastDay.day) +1;
            }
            const dietDay = await createDietDay(data);
            if (dietDay.code === 401 || dietDay.code === 403) {
                return navigate("/error401");      
            } else if(dietDay.message) {
                alert(dietDay.message);
            } else {
                navigate("/");
            }
        //}
    }

    return(
        <div className="form-container">
            <h1 className="create-title">Your diet day</h1>


            <form onSubmit={submitHandler} className="create-form">
            
            <div className="create-form-div">

                <label htmlFor="email">Breakfast <span className="required">*</span></label>
                <input type="text" id="breakfast" name="breakfast" placeholder="Enter your breakfast" />
                {dataErrors.breakfast.length > 0 ? <div className="error">{dataErrors.breakfast}</div> : ""}
            
            
                <label htmlFor="email">Calories <span className="required">*</span></label>
                <input type="number" id="breakfast-calories" name="breakfast-calories" placeholder="Kilocalories of the breakfast" />
                {dataErrors["breakfast-calories"].length > 0 ? <div className="error">{dataErrors["breakfast-calories"]}</div> : ""}
            
            
                <label htmlFor="lunch">Lunch <span className="required">*</span></label>
                <input type="text" id="lunch" name="lunch" placeholder="Enter your lunch" />
                {dataErrors.lunch.length > 0 ? <div className="error">{dataErrors.lunch}</div> : ""}
            

                <label htmlFor="lunch">Calories <span className="required">*</span></label>
                <input type="number" id="lunch-calories" name="lunch-calories" placeholder="Kilocalories of the lunch" />
                {dataErrors["lunch-calories"].length > 0 ? <div className="error">{dataErrors["lunch-calories"]}</div> : ""}
            

                <label htmlFor="afternoon">Afternoon snack <span className="required">*</span></label>
                <input type="text" id="afternoon" name="afternoon" placeholder="Enter your afternoon snack" />
                {dataErrors.afternoon.length > 0 ? <div className="error">{dataErrors.afternoon}</div> : ""}
            

                <label htmlFor="afternoon">Calories <span className="required">*</span></label>
                <input type="number" id="afternoon-calories" name="afternoon-calories" placeholder="Kilocalories of the afternoon snack" />
                {dataErrors["afternoon-calories"].length > 0 ? <div className="error">{dataErrors["afternoon-calories"]}</div> : ""}
            

                <label htmlFor="dinner">Dinner <span className="required">*</span></label>
                <input type="text" id="dinner" name="dinner" placeholder="Enter your dinner" />
                {dataErrors.dinner.length > 0 ? <div className="error">{dataErrors.dinner}</div> : ""}
            

                <label htmlFor="dinner">Calories <span className="required">*</span></label>
                <input type="number" id="dinner-calories" name="dinner-calories" placeholder="Kilocalories of the dinner" />
                {dataErrors["dinner-calories"].length > 0 ? <div className="error">{dataErrors["dinner-calories"]}</div> : ""}
            
            </div>

            <input className="btn create-form-btn" type="submit" value="Submit"/>
            </form>

            
        </div>
    );
}