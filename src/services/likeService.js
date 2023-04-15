import {requester} from "./requester";

const baseUrl = 'http://localhost:3030/data/likes';

export const getUserLikeAvailability = async(userId, dietDayId) => {
    const like = await requester("GET", `${baseUrl}?where=dietDayId%3D%22${dietDayId}%22&where=_ownerId%3D%22${userId}%22`);
    if (like.code === 404 || like.length === 0) {
        return true;
    }
    return false;
}

export const postLike = async(userId, dietDayId) => {
    const like = await getUserLikeAvailability(userId, dietDayId);
    if (like) {
        return await requester("POST", baseUrl, { dietDayId });  
    }
    return false;

}

export const getLikesCount = async (dietDayId) => {
    const likesCount = await requester("GET", `${baseUrl}?where=dietDayId%3D%22${dietDayId}%22&count`);
    return likesCount;
}
