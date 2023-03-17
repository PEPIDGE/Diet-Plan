import { useState } from "react";

export const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(`Userame: ${username} \n Email: ${email} \n Password: ${password}`);
    }

    return(
        <div className="form-container">
            <h1>REGISTER</h1>
            <form onSubmit={submitHandler} className="register-form">

            <label htmlFor="name">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />

            <label htmlFor="password">Re-Password</label>
            <input type="password" id="rePassword" name="rePassword" value={rePassword} onChange={(event) => setRePassword(event.target.value)} placeholder="Re-enter your password" />

            <input className="btn submit-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}