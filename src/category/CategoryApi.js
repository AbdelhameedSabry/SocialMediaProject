import axios from "axios";
import getApiBaseUrl from "../helpers/getApiBaseUrl";

const baseUrl = getApiBaseUrl() + "categories/";

function GetCategories(sectionId) {
  return axios.get(baseUrl, {
    params: {
      section: sectionId ? sectionId : "0",
    },
  });
}

function GetCategoryById(id) {
  return axios.get(baseUrl + `/`, {
    params: {
      id,
    },
  });
}

function CreateOrEditCategory(dto) {
  const model = {
    name: dto.name,
    sectionId: dto.section,
  };

  if (dto.id) return axios.put(baseUrl + `update/${dto.id}`, model);

  return axios.post(baseUrl + "create", model);
}

const CategoryApi = {
  GetCategoryById,
  CreateOrEditCategory,
  GetCategories,
};

export default CategoryApi;
