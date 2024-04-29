import axios from "axios";
import getApiBaseUrl from "../helpers/getApiBaseUrl";

const baseUrl = getApiBaseUrl() + "comments";

function GetComments(postId) {
  return axios.get(baseUrl + "/", { params: { postId } });
}

function Delete(id) {
  return axios.delete(baseUrl + "/delete"`/${id}`);
}

function CreateOrEditComment(model) {
  if (model.id) return axios.put(baseUrl + `/update/${model.id}`, model);

  return axios.post(baseUrl + `/create`, model);
}

const CommentApi = { GetComments, Delete, CreateOrEditComment };

export default CommentApi;
