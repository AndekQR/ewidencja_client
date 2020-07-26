import Authority from "./Authority";

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    verified: boolean,
    username: string,
    authorities: Authority[]
    
}