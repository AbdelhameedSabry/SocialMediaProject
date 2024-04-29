import axios from "axios";
import getApiBaseUrl from "../helpers/getApiBaseUrl";

const baseUrl = getApiBaseUrl();

function GetRows(url) {
  return axios.get(baseUrl + url);
}

function Delete(url, id) {
  return axios.delete(baseUrl + url + `/${id}`);
}

function Enable(url, id) {
  return axios.put(baseUrl + url + `/${id}`);
}

const CustomDataGridApi = {
  GetRows,
  Delete,
  Enable,
};

export default CustomDataGridApi;
