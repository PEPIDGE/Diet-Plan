import { useState } from "react";

export const CreateDietDay = () => {

    const [day, setDay] = useState({"Breakfast":[]});

    const submitHandler = (event) => {
        event.preventDefault();
        
    }

    return(
        <div className="form-container">
            <h1>Your diet day</h1>
            <form onSubmit={submitHandler} className="create-form">
            
            <label htmlFor="email">Breakfast</label>
            <textarea type="text" id="breakfast" name="breakfast" placeholder="Enter your breakfast" />

            <label htmlFor="lunch">Lunch</label>
            <textarea type="text" id="lunch" name="lunch" placeholder="Enter your lunch" />

            <label htmlFor="afternoon">Afternoon snack</label>
            <textarea type="text" id="afternoon" name="afternoon" placeholder="Enter your afternoon snack" />

            <label htmlFor="dinner">Dinner</label>
            <textarea type="text" id="dinner" name="dinner" placeholder="Enter your dinner" />

            <input className="btn submit-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}