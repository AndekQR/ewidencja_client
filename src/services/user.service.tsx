import { credentialsConstants } from "../helpers/credentials.constants";
import { axiosInstance } from "../helpers/axiosInstances";
import { User } from "../interfaces/User";
import Credentials from "../interfaces/Credentials";

export const userService = {
  login,
  logout,
  register,
};

function login(username: string, password: string) {
  return axiosInstance(false, false)
    .post("/auth/login", {
      username,
      password,
    })
    .then((credentials) => {
      const { token, refreshToken, expires, user } = credentials.data;
      credentialsConstants.set({ token, refreshToken, expires, user } as Credentials);
      return user;
    });
}

export function refreshToken() {

  return axiosInstance(false, true)
    .post(
      "/auth/refreshToken",
      { refreshToken: credentialsConstants.get().refreshToken }
    )
    .then((response) => {
      if (response.status === 200) {
        const { token, refreshToken, expires, user } = response.data;
        console.log(
          "Zatkualizowano na: " + JSON.stringify(response.data.token)
        );
        credentialsConstants.set({ token, refreshToken, expires, user });
      }
    })
    .catch((error) => {
      let er = JSON.parse(JSON.stringify(error));
      console.log(er);
    });
}

export function logout() {
  return axiosInstance(true, true)
    .get("/auth/logout")
    .then((_) => {
      credentialsConstants.remove();

    });
}

function register(user: User, password: string) {
  return axiosInstance(false, false)
    .post("/auth/register", {...user, password})
    .catch((error) => {
      console.log(error);
    });
}
