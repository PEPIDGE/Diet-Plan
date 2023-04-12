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
    const publicDataRegister = requester("POST", `${baseUrl}/data/publicUsers`, {username, profilePic, description, "calories": 0});
    return publicDataRegister;
}

export const getPublicUser = async (userId) => {
    const publicUserData = await requester("GET", `${baseUrl}/data/publicUsers?where=_ownerId%3D%22${userId}%22`);
    return publicUserData.length > 0 ? publicUserData[0] : {};
}

export const getPublicUserWithPublicUserId = (userId) => {
    const publicUserData = requester("GET", `${baseUrl}/data/publicUsers/${userId}`);
    return publicUserData;
}


export const updatePublicUser = (userId, username, profilePic, description) => {
    const publicUserData = requester("PUT", `${baseUrl}/data/publicUsers/${userId}`, {username, profilePic, description});
    return publicUserData;
}

export const putCaloriesInUserProfile = (userId, username, profilePic, description, gender, age, height, weight, activity, calories) => {
    const publicUserData = requester("PUT", `${baseUrl}/data/publicUsers/${userId}`, {username, profilePic, description, gender, age, height, weight, activity, calories});
    return publicUserData;
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