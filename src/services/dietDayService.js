import { requester } from "./requester";

const baseUrl = "http://localhost:3030";

export const getAll = () => {
    return requester("GET", `${baseUrl}/data/dietDays`);
};

export const getOne = (id) => {
    return requester("GET", `${baseUrl}/data/dietDays/${id}`);
};

export const createDietDay = (data) => {
    return requester("POST", `${baseUrl}/data/dietDays`, data);
};

export const deleteDietDay = (id) => {
    return requester("DELETE", `${baseUrl}/data/dietDays/${id}`);
};

export const editDietDay = (id, data) => {
    return requester("PUT", `${baseUrl}/data/dietDays/${id}`, data);
};

export const getLastDietDay = async(userId) => {
    const lastDietDays = await requester("GET", `${baseUrl}/data/dietDays?where=_ownerId%3D%22${userId}%22?sortBy=_createdOn%20desc`);
    return lastDietDays.message ? [] : lastDietDays.length === 0 ? [] : lastDietDays[lastDietDays.length - 1];
}
