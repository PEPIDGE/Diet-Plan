import { useState, useEffect } from "react";

export const UpdateProfile = () => {

    const [data, setData] = useState({
        "username": "",
        "profilePic": "",
        "description": ""
    });
    const [dataErrors, setDataErrors] = useState({
        "username": "",
        "profilePic": "",
        "description": ""
    });

   
    function inputHandler (event) {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    function submitHandler (e) {
        e.preventDefault();
        const isValid = formValidation();
    }

    function formValidation () {
        let errors = {
            "username": "",
            "profilePic": "",
            "description": ""
        };
        let isValid = true;
        if (data.username.trim().length <2 || data.username.trim().length > 8) {
            isValid = false;
            errors.username = "The length of the username must be between 2 and 8 symbols" ;
        }
        if (data.profilePic.trim().slice(-4) !== ".jpg" && data.profilePic.trim().slice(-4) !== ".png") {
            isValid = false;
            errors.profilePic = "The type of photo format must be .png or .jpg"  ;
        }
        if (data.description.trim().length <15) {
            isValid = false;
            errors.description = "The length of the description must be at least 15 symbols" ;
        }
        else if (data.description.trim().length > 300) {
            isValid = false;
            errors.description = "The length of the description must be maximum 300 symbols" ;
        }
        setDataErrors(errors)
        return isValid;
    }


    return (
        <div className="form-container">
            <h1>UPDATE PROFILE</h1>
            <form className="update-form" onSubmit={submitHandler}>
            <label htmlFor="name">Username <span className="required">*</span></label>
            <input type="text" id="username" name="username" value={data.username} onChange={inputHandler} placeholder="Enter your username" />

            {dataErrors.username.length > 0 ? <div className="error">{dataErrors.username}</div> : ""} 

            <label htmlFor="profilePic">Profile picture <span className="required">*</span></label>
            <input type="url" id="profilePic" name="profilePic" value={data.profilePic} onChange={inputHandler} placeholder="Enter a profile picture link" />

            {dataErrors.profilePic.length > 0 ? <div className="error">{dataErrors.profilePic}</div> : ""} 

            <label htmlFor="description">Write how you want to be described to others <span className="required">*</span></label>
            <textarea type="text" id="description" name="description" value={data.description} onChange={inputHandler} placeholder="Enter description about you" />
            
            {dataErrors.description.length > 0 ? <div className="error">{dataErrors.description}</div> : ""} 

            {/* TODO: MAKE A CHECKBOX WITH TERMS */}
            <input className="btn submit-form-btn" type="submit" value="Submit"/>
            </form>
        </div>

    );
}