import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { onLogin, onPublicLogin } from "../services/authService";

export const Login = () => {

    const navigate = useNavigate();
    const {userLogin, publicUserLogin} = useContext(AuthContext);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        const isValid = formValidation();
        let user = {};
        if (isValid) {
            user = await onLogin(email.trim(), password);
            if (user.message) {
                alert(user.message);
            } else {
                userLogin({"_id": user._id, "accessToken": user.accessToken});
                
                const publicDataList = await onPublicLogin(user._id);
                const publicData = publicDataList[0];
                publicUserLogin(publicData._id);
                navigate("/");
            }
            
        }
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
            errors.email = "This field is required" ;
        }
        if (password.trim().length === 0 ) {
            isValid = false;
            errors.password = "This field is required" ;
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