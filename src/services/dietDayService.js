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
