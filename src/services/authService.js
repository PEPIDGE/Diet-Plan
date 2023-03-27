import {requester} from "./requester.js";

const baseUrl = 'http://localhost:3030';
const user = localStorage.getItem('authData');
const auth = JSON.parse(user || '{}');

export const onLogin = (email, password) => {
    return requester("POST", `${baseUrl}/users/login`, {email, password});
    
}  

export const onRegister = (email, password, username, profilePic, description) => {
    const userRegister = requester("POST", `${baseUrl}/users/register`, {email, password});
    const publicDataRegister = requester("POST", `${baseUrl}/publicUsers`, {username, profilePic, description});
    return [userRegister, publicDataRegister];
}

export const onLogout = () => {
    try {
        return fetch(`${baseUrl}/users/logout`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization' : auth.accessToken
            }
        });
    } catch (error) {
        console.log(error);
        return error;
    }
}