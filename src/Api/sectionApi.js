import axios from "axios";
import getApiBaseUrl from "../helpers/getApiBaseUrl";

const baseUrl = getApiBaseUrl() + "sections";

function GetAll() {
  return axios.get(baseUrl + "/");
}

const SectionApi = { GetAll };

export default SectionApi;
