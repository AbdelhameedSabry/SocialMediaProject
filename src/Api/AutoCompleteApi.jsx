import axios from "axios";
import getApiBaseUrl from "../helpers/getApiBaseUrl";

const baseUrl = getApiBaseUrl();

function get(url) {
  return axios.get(baseUrl + url);
}

const autoCompleteApi = {
  get,
};

export default autoCompleteApi;
