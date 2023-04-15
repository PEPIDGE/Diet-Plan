import {requester} from "./requester";

const baseUrl = 'http://localhost:3030/data/likes';

export const getUserLikeAvailability = async(userId, dietDayId, isOwner) => {
    const like = await requester("GET", `${baseUrl}?where=dietDayId%3D%22${dietDayId}%22&where=_ownerId%3D%22${userId}%22`);
    if (like.length === 0) {
        return true;
    } else if (isOwner){
        return false;
    } else if (like.code === 404) {
        return true;
    }
    return false;
}

export const postLike = async(userId, dietDayId, isOwner) => {
    const like = await getUserLikeAvailability(userId, dietDayId, isOwner);
    if (like) {
        return await requester("POST", baseUrl, { dietDayId });  
    }
    return false;
}

export const getLikesCount = async (dietDayId) => {
    const likesCount = await requester("GET", `${baseUrl}?where=dietDayId%3D%22${dietDayId}%22`);
    return likesCount.length > 0 ? likesCount.length : 0;
}
