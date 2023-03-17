import { useState } from "react";

export const Register = () => {

    const [data, setData] = useState({
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

   console.log(data);
    return(
        <div className="form-container">
            <h1>REGISTER</h1>
            <form className="register-form">

            <label htmlFor="name">Username</label>
            <input type="text" id="username" name="username" value={data.username} onChange={inputHandler} placeholder="Enter your username" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={data.email} onChange={inputHandler} placeholder="Enter your email" />

            <label htmlFor="password">Profile picture</label>
            <input type="url" id="profilePic" name="profilePic" value={data.profilePic} onChange={inputHandler} placeholder="Enter a profile picture link" />


            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={data.password} onChange={inputHandler} placeholder="Enter your password" />

            <label htmlFor="rePassword">Re-Password</label>
            <input type="password" id="rePassword" name="rePassword" value={data.rePassword} onChange={inputHandler} placeholder="Re-enter your password" />

            <label htmlFor="password">Write how you want to be described to others</label>
            <textarea maxLength="100" type="text" id="description" name="description" value={data.description} onChange={inputHandler} placeholder="Enter description about you" />
            
            <input className="btn submit-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}