import axios from "axios";
import getApiBaseUrl from "../helpers/getApiBaseUrl";

const baseUrl = getApiBaseUrl() + "auth/";

function register(model) {
  return axios.post(baseUrl + "register", model);
}

function logIn(model) {
  return axios.post(baseUrl + "login", model);
}

const AuthApi = {
  register,
  logIn,
};

export default AuthApi;
