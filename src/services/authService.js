import {requester} from "./requester.js";

const baseUrl = 'http://localhost:3030';
const user = localStorage.getItem('authData');
const auth = JSON.parse(user || '{}');

export const onLogin = (email, password) => {
    return requester("POST", `${baseUrl}/users/login`, {email, password});
    
}  

export const onRegister = (email, password) => {
    const userRegister = requester("POST", `${baseUrl}/users/register`, {email, password});
    return userRegister;
}

export const onPublicRegister = (username, profilePic, description) => {
    const publicDataRegister = requester("POST", `${baseUrl}/data/publicUsers`, {username, profilePic, description});
    return publicDataRegister;
}

export const onPublicLogin = (userId) => {
    const publicDataLogin = requester("GET", `${baseUrl}/data/publicUsers?where=_ownerId%3D%22${userId}%22`);
    return publicDataLogin;
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