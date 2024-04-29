import axios from "axios";
import getApiBaseUrl from "../helpers/getApiBaseUrl";
const baseUrl = getApiBaseUrl() + "posts/";

function GetAlltPosts(sectionId, categoryId, saved) {
  if (saved) return axios.get(baseUrl + "saved-posts");

  return axios.get(baseUrl, {
    params: { section: sectionId, category: categoryId },
  });
}

function GetPostById(id) {
  return axios.get(baseUrl + `/`, {
    params: {
      id,
    },
  });
}

function CreateOrEditPost(dto) {
  const post = {
    title: dto.title,
    description: dto.body,
    categoryId: dto.category.id,
    image: dto.image,
  };

  if (dto.id) return axios.put(baseUrl + `update/${dto.id}`, post);

  return axios.post(baseUrl + `create`, post);
}

function SavePost(id) {
  return axios.post(baseUrl + `save-post/${id}`);
}

function LikePost(id) {
  return axios.post(baseUrl + `like-post/${id}`);
}

function DisLikePost(id) {
  return axios.post(baseUrl + `dislike-post/${id}`);
}

function GetCurrentUserPosts(value) {
  if (value === 0) return axios.get(baseUrl + "current-user");

  return axios.get(baseUrl + "saved-posts");
}

const PostApi = {
  GetPostById,
  CreateOrEditPost,
  GetAlltPosts,
  SavePost,
  LikePost,
  DisLikePost,
  GetCurrentUserPosts,
};

export default PostApi;
