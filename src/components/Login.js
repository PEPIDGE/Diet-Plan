import { useState } from "react";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}\nPassword: ${password}`);
    }

    return(
        <div className="form-container">
            <h1>LOGIN</h1>
            <form onSubmit={submitHandler}>
            
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />

            <input className="btn submit-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}