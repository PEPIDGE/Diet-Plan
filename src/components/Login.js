import { useState } from "react";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        const isValid = formValidation();
        console.log(`Email: ${email}\nPassword: ${password}`);
    }

    const [dataErrors, setDataErrors] = useState({
        "email": "",
        "password": "",
    });

    function formValidation () {
        let errors = {
            "email": "",
            "password": "",
        };
        let isValid = true;
        
        
        if (email.trim().length === 0 ) {
            isValid = false;
            errors.email = "The field is required" ;
        }
        if (password.trim().length === 0 ) {
            isValid = false;
            errors.password = "The field is required" ;
        }
        setDataErrors(errors)
        return isValid;
    }

    return(
        <div className="form-container">
            <h1>LOGIN</h1>
            <form onSubmit={submitHandler} className="login-form">
            
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />
            {dataErrors.email.length > 0 ? <div className="error">{dataErrors.email}</div> : ""}

            <label htmlFor="password">Password <span className="required">*</span></label>
            <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
            {dataErrors.password.length > 0 ? <div className="error">{dataErrors.password}</div> : ""}

            <input className="btn submit-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}