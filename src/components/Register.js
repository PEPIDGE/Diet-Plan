import { useState, useEffect } from "react";

export const Register = () => {

    const [data, setData] = useState({
        "username": "",
        "email": "",
        "description": "",
        "profilePic": "",
        "password": "",
        "rePassword": ""
    });
    const [dataErrors, setDataErrors] = useState({
        "username": "",
        "email": "",
        "description": "",
        "profilePic": "",
        "password": "",
        "rePassword": ""
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
            "email": "",
            "description": "",
            "profilePic": "",
            "password": "",
            "rePassword": ""
        };
        let isValid = true;
        if (data.username.trim().length <2 || data.username.trim().length > 8) {
            isValid = false;
            errors.username = "The length of the username must be between 2 and 8 symbols" ;
        }
        if (data.profilePic.length > 0 && data.profilePic.trim().slice(-4) !== ".jpg" && data.profilePic.trim().slice(-4) !== ".png") {
            isValid = false;
            errors.profilePic = "The type of photo format must be .png or .jpg"  ;
        }
        if (data.password.trim().length <10 || data.password.trim().length > 30) {
            isValid = false;
            errors.password = "The length of the username must be between 10 and 30 symbols" ;
        }
        if (data.password !== data.rePassword) {
            isValid = false;
            errors.rePassword = "The passwords don't match" ;
        }
        setDataErrors(errors)
        return isValid;
    }
    return(
        <div className="form-container">
            <h1>REGISTER</h1>
            <form className="register-form" onSubmit={submitHandler}>

            <label htmlFor="name">Username</label>
            <input type="text" id="username" name="username" value={data.username} onChange={inputHandler} placeholder="Enter your username" />
            {dataErrors.username.length > 0 ? <div className="error">{dataErrors.username}</div> : ""}

            
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={data.email} onChange={inputHandler} placeholder="Enter your email" />

            {dataErrors.email.length > 0 ? <div className="error">{dataErrors.email}</div> : ""}


            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={data.password} onChange={inputHandler} placeholder="Enter your password" />

            {dataErrors.password.length > 0 ? <div className="error">{dataErrors.password}</div> : ""}


            <label htmlFor="rePassword">Re-Password</label>
            <input type="password" id="rePassword" name="rePassword" value={data.rePassword} onChange={inputHandler} placeholder="Re-enter your password" />

            {dataErrors.rePassword.length > 0 ? <div className="error">{dataErrors.rePassword}</div> : ""}

            <label htmlFor="profilePic">Profile picture <span>(optional)</span></label>
            <input type="text" id="profilePic" name="profilePic" value={data.profilePic} onChange={inputHandler} placeholder="Enter a profile picture link" />

            {dataErrors.profilePic.length > 0 ? <div className="error">{dataErrors.profilePic}</div> : ""}

            <label htmlFor="description">Write how you want to be described to others <span>(optional)</span></label>
            <textarea maxLength="100" type="text" id="description" name="description" value={data.description} onChange={inputHandler} placeholder="Enter description about you" />
            
            {dataErrors.description.length > 0 ? <div className="error">{dataErrors.description}</div> : ""}

            {/* TODO: MAKE A CHECKBOX WITH TERMS */}
            <input className="btn submit-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}