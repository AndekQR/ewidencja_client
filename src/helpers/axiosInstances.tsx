import axios from "axios";
import { authHeader } from "./auth-header";
import { refreshToken, userService } from "../services/user.service";
import { credentialsConstants } from "./credentials.constants";

const baseAddress = "http://localhost:8080";

export const secureAxios = () => {
  let instance = axios.create({
    baseURL: baseAddress,
    headers: authHeader(),
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = credentialsConstants.get().token;
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      config.headers["Content-Type"] = "application/json; charset=utf-8";
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      console.log("interceptor: "+originalRequest.url);
      
      if (
        error.response.status === 401 &&
        originalRequest.url === "/auth/refreshToken"
      ) {
        console.log("next 401 refresh: logout");

        credentialsConstants.remove();
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshToken().then(() => {
          const token = credentialsConstants.get().token;
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return axios(originalRequest);
        });
      }
    }
  );

  return instance;
};

export const insecureAxios = () => {
      let instance = axios.create({
        baseURL: baseAddress,
        responseType: "json",
      });

      return instance;
};
