import { useState } from "react";

export const CreateDietDay = () => {

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

    const submitHandler = (event) => {
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
        if (Number(data["breakfast-calories"]) >3000) {
            errors["breakfast-calories"] = "The maximum calories are 3000";
            isValid = false;
        }
        if (Number(data["lunch-calories"]) >3000) {
            errors["lunch-calories"] = "The maximum calories are 3000";
            isValid = false;
        }
        if (Number(data["afternoon-calories"]) >3000) {
            errors["afternoon-calories"] = "The maximum calories are 3000";
            isValid = false;
        }
        if (Number(data["dinner-calories"]) >3000) {
            errors["dinner-calories"] = "The maximum calories are 3000";
            isValid = false;
        } 
        if (Number(data["breakfast-calories"]) <0) {
            errors["breakfast-calories"] = "The calories can't be negative";
            isValid = false;
        }
        if (Number(data["lunch-calories"]) <0) {
            errors["lunch-calories"] = "The calories can't be negative";
            isValid = false;
        }
        if (Number(data["afternoon-calories"]) <0) {
            errors["afternoon-calories"] = "The calories can't be negative";
            isValid = false;
        }
        if (Number(data["dinner-calories"]) <0) {
            errors["dinner-calories"] = "The calories can't be negative";
            isValid = false;
        }
        if ((data["breakfast"]).length >100) {
            errors["breakfast"] = "The maximum length of the field must be max 100 symbols";
            isValid = false;
        }
        if ((data["lunch"]) >100) {
            errors["lunch"] = "The maximum length of the field must be max 100 symbols";
            isValid = false;
        }
        if ((data["afternoon"]) >100) {
            errors["afternoon"] = "The maximum length of the field must be max 100 symbols";
            isValid = false;
        }
        if ((data["dinner"]) >100) {
            errors["dinner"] = "The maximum length of the field must be max 100 symbols";
            isValid = false;
        }
        console.log(errors);
        setDataErrors(errors);
        
    }

    return(
        <div className="form-container">
            <h1>Your diet day</h1>
            <form onSubmit={submitHandler} className="create-form">
            
            <div className="create-form-div">
                <div>
                    <label htmlFor="email">Breakfast <span className="required">*</span></label>
                    <input type="text" id="breakfast" name="breakfast" placeholder="Enter your breakfast" />
                    {dataErrors.breakfast.length > 0 ? <div className="error">{dataErrors.breakfast}</div> : ""}
                </div>

                <div>
                    <label htmlFor="email">Calories <span className="required">*</span></label>
                    <input type="number" id="breakfast-calories" name="breakfast-calories" placeholder="Kilocalories of the breakfast" />
                    {dataErrors["breakfast-calories"].length > 0 ? <div className="error">{dataErrors["breakfast-calories"]}</div> : ""}
                </div>


                <div>
                    <label htmlFor="lunch">Lunch <span className="required">*</span></label>
                    <input type="text" id="lunch" name="lunch" placeholder="Enter your lunch" />
                    {dataErrors.lunch.length > 0 ? <div className="error">{dataErrors.lunch}</div> : ""}
                </div>
                <div>
                    <label htmlFor="lunch">Calories <span className="required">*</span></label>
                    <input type="number" id="lunch-calories" name="lunch-calories" placeholder="Kilocalories of the lunch" />
                    {dataErrors["lunch-calories"].length > 0 ? <div className="error">{dataErrors["lunch-calories"]}</div> : ""}
                </div>

                <div>
                    <label htmlFor="afternoon">Afternoon snack <span className="required">*</span></label>
                    <input type="text" id="afternoon" name="afternoon" placeholder="Enter your afternoon snack" />
                    {dataErrors.afternoon.length > 0 ? <div className="error">{dataErrors.afternoon}</div> : ""}
                </div>
                <div>
                    <label htmlFor="afternoon">Calories <span className="required">*</span></label>
                    <input type="number" id="afternoon-calories" name="afternoon-calories" placeholder="Kilocalories of the afternoon snack" />
                    {dataErrors["afternoon-calories"].length > 0 ? <div className="error">{dataErrors["afternoon-calories"]}</div> : ""}
                </div>

                <div>
                    <label htmlFor="dinner">Dinner <span className="required">*</span></label>
                    <input type="text" id="dinner" name="dinner" placeholder="Enter your dinner" />
                    {dataErrors.dinner.length > 0 ? <div className="error">{dataErrors.dinner}</div> : ""}
                </div>
                <div>
                    <label htmlFor="dinner">Calories <span className="required">*</span></label>
                    <input type="number" id="dinner-calories" name="dinner-calories" placeholder="Kilocalories of the dinner" />
                    {dataErrors["dinner-calories"].length > 0 ? <div className="error">{dataErrors["dinner-calories"]}</div> : ""}
                </div>

            </div>

            <input className="btn create-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}