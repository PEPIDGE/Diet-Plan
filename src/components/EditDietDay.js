import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { createDietDay, editDietDay, getLastDietDay, getOne } from "../services/dietDayService";


export const EditDietDay = () => {

    const {dietDayId} = useParams();
    const [dietDay, setDietDay] = useState({});
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        (async () => {
          const dietDayData = await getOne(dietDayId);
          setDietDay(dietDayData);
          if (dietDayData._ownerId !== auth._id) {
            //todo 401 page
          }
        })();
    }, []);

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

        if (isValid ) {
            data.day = dietDay.day;
            const dietDayData = await editDietDay(dietDayId, data);
            if (dietDayData.code === 401 || dietDayData.code === 403) {
                return navigate("/error401");
            } else if(dietDayData.message) {
                alert(dietDayData.message)
            } else {
                navigate(`/details/${dietDayId}`);
            }
        }
    }

    return(
        <div className="form-container">
            <h1 className="create-title">Your diet day</h1>


            <form onSubmit={submitHandler} className="create-form">
            
            <div className="create-form-div">

                <label htmlFor="email">Breakfast <span className="required">*</span></label>
                <input type="text" id="breakfast" name="breakfast"  defaultValue={dietDay?.breakfast} placeholder="Enter your breakfast" />
                {dataErrors.breakfast.length > 0 ? <div className="error">{dataErrors.breakfast}</div> : ""}
            
            
                <label htmlFor="email">Calories <span className="required">*</span></label>
                <input type="number" id="breakfast-calories" name="breakfast-calories" defaultValue={dietDay?.["breakfast-calories"]} placeholder="Kilocalories of the breakfast" />
                {dataErrors["breakfast-calories"].length > 0 ? <div className="error">{dataErrors["breakfast-calories"]}</div> : ""}
            
            
                <label htmlFor="lunch">Lunch <span className="required">*</span></label>
                <input type="text" id="lunch" name="lunch" defaultValue={dietDay?.lunch} placeholder="Enter your lunch" />
                {dataErrors.lunch.length > 0 ? <div className="error">{dataErrors.lunch}</div> : ""}
            

                <label htmlFor="lunch">Calories <span className="required">*</span></label>
                <input type="number" id="lunch-calories" name="lunch-calories" defaultValue={dietDay?.["lunch-calories"]} placeholder="Kilocalories of the lunch" />
                {dataErrors["lunch-calories"].length > 0 ? <div className="error">{dataErrors["lunch-calories"]}</div> : ""}
            

                <label htmlFor="afternoon">Afternoon snack <span className="required">*</span></label>
                <input type="text" id="afternoon" name="afternoon" defaultValue={dietDay?.afternoon} placeholder="Enter your afternoon snack" />
                {dataErrors.afternoon.length > 0 ? <div className="error">{dataErrors.afternoon}</div> : ""}
            

                <label htmlFor="afternoon">Calories <span className="required">*</span></label>
                <input type="number" id="afternoon-calories" name="afternoon-calories" defaultValue={dietDay?.["afternoon-calories"]} placeholder="Kilocalories of the afternoon snack" />
                {dataErrors["afternoon-calories"].length > 0 ? <div className="error">{dataErrors["afternoon-calories"]}</div> : ""}
            

                <label htmlFor="dinner">Dinner <span className="required">*</span></label>
                <input type="text" id="dinner" name="dinner" defaultValue={dietDay?.dinner} placeholder="Enter your dinner" />
                {dataErrors.dinner.length > 0 ? <div className="error">{dataErrors.dinner}</div> : ""}
            

                <label htmlFor="dinner">Calories <span className="required">*</span></label>
                <input type="number" id="dinner-calories" name="dinner-calories" defaultValue={dietDay?.["dinner-calories"]} placeholder="Kilocalories of the dinner" />
                {dataErrors["dinner-calories"].length > 0 ? <div className="error">{dataErrors["dinner-calories"]}</div> : ""}
            
            </div>

            <input className="btn create-form-btn" type="submit" value="Submit"/>
            </form>

            
        </div>
    );
}