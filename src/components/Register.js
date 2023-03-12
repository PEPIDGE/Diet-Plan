import { useState } from "react";

export const Register = () => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(`Name: ${firstName} ${lastName} \n Email: ${email} \n Password: ${password}`);
    }

    return(
        <div className="form-container">
            <h1>REGISTER</h1>
            <form onSubmit={submitHandler} className="register-form">
            <label htmlFor="name">First name</label>
            <input type="text" id="name" name="name" value={firstName} onChange={(event) => setfirstName(event.target.value)} placeholder="Enter your first name" />

            <label htmlFor="name">Last name</label>
            <input type="text" id="name" name="name" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter your last name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />

            <input className="btn submit-form-btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}