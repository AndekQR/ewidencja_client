import { credentialsConstants } from "./credentials.constants";

export const authHeader = () => {
    let token = credentialsConstants.get().token;

    if (token) {
        return {'Authorization': 'Bearer ' + token};
    } else {
        return {};
    }
};
