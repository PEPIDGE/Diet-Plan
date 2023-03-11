import { useState } from "react";

export const form = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
    }

    return(
        <div className="form-container">
            <h1>REGISTER/LOGIN/CREATE/EDIT</h1>
            <form >
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />

            <input className="btn" type="submit" value="Submit"/>
            </form>
        </div>
    );
}