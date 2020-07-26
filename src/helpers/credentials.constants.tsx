import Credentials from "../interfaces/Credentials";

export const credentialsConstants = {

         set: (credentials: Credentials) => {
           localStorage.setItem("token", credentials.token);
           localStorage.setItem("refreshToken", credentials.refreshToken);
           localStorage.setItem("expires", JSON.stringify(credentials.expires));
         },

         remove: () => {
           localStorage.removeItem("token");
           localStorage.removeItem("refreshToken");
           localStorage.removeItem("expires");
         },

         get: () => ({
           token: localStorage.getItem("token"),
           refreshToken: localStorage.getItem("refreshToken"),
           expires: JSON.parse(localStorage.getItem("expires") || '0') as number,
         }),
       };
