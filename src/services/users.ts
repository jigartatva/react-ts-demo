import axios from "./api";

export const fetchUsersService = () => {
  return axios.get("/users");
};

export const fetchUserService = id => {
  return axios.get(`/users/${id}`);
};

export const updateUser = user => {
  return axios.post(`/users`, user);
};

export const addUserService = user => {
  return axios.post(`/users`, user);
};

export const editUserService = editedUser => {
  return axios.patch(`/users/${editedUser.id}`, editedUser);
};

export const deleteUserService = id => {
  return axios.delete(`/users/${id}`);
};