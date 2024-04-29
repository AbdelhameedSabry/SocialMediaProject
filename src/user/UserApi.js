import axios from "axios";
import getApiBaseUrl from "../helpers/getApiBaseUrl";

const baseUrl = getApiBaseUrl() + "users/";

function GetUserById(id) {
  return axios.get(baseUrl + `/`, {
    params: {
      id,
    },
  });
}

function CreateOrEditUser(dto) {
  const user = {
    ...dto,
    username: dto.firstName,
    phoneNumber: Math.floor(
      Math.random() * (999999999999 - 100000000000 + 1) + 999999999999
    ),
    role: "user",
    isActive: true,
    confirmPassword: undefined,
    image: undefined,
    profilePicture: dto.image,
    bio: "",
  };

  if (dto.id) return axios.put(baseUrl + `update/${dto.id}`, user);

  return axios.post(baseUrl + "create/", user);
}

const UserApi = {
  GetUserById,
  CreateOrEditUser,
};

export default UserApi;
