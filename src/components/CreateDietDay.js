import { useState } from "react";

export const CreateDietDay = () => {

    const [day, setDay] = useState({"Breakfast":[]});

    const submitHandler = (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target))
        console.log(data);
    }

    return(
        <div className="form-container">
            <h1>Your diet day</h1>
            <form onSubmit={submitHandler} className="create-form">
            
            <div className="create-form-div">
                <div>
                    <label htmlFor="email">Breakfast</label>
                    <input type="text" id="breakfast" name="breakfast" placeholder="Enter your breakfast" />
                </div>
                <div>
                    <label htmlFor="email">Grams</label>
                    <input type="number" id="breakfast-weight" name="breakfast-weight" placeholder="Weight of the breakfast" />
                </div>

                <div>
                    <label htmlFor="lunch">Lunch</label>
                    <input type="text" id="lunch" name="lunch" placeholder="Enter your lunch" />
                </div>
                <div>
                    <label htmlFor="lunch">Grams</label>
                    <input type="number" id="lunch-weight" name="lunch-weight" placeholder="Weight of the lunch" />
                </div>

                <div>
                    <label htmlFor="afternoon">Afternoon snack</label>
                    <input type="text" id="afternoon" name="afternoon" placeholder="Enter your afternoon snack" />
                </div>
                <div>
                    <label htmlFor="afternoon">Grams</label>
                    <input type="number" id="afternoon-weight" name="afternoon-weight" placeholder="Weight of the afternoon snack" />
                </div>

                <div>
                    <label htmlFor="dinner">Dinner</label>
                    <input type="text" id="dinner" name="dinner" placeholder="Enter your dinner" />
                </div>
                <div>
                    <label htmlFor="dinner">Grams</label>
                    <input type="number" id="dinner-weight" name="dinner-weight" placeholder="Weight of the dinner" />
                </div>

            </div>

            <input className="btn create-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}