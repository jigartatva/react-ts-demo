import axios from "./api";

//fetch users list
export const fetchUsersService = () => {
  return axios.get("/users");
};

//fetch user by id
export const fetchUserService = id => {
  return axios.get(`/users/${id}`);
};

//add update
export const addUserService = user => {
  return axios.post(`/users`, user);
};

//user update
export const editUserService = editedUser => {
  return axios.patch(`/users/${editedUser.id}`, editedUser);
};

//user delete
export const deleteUserService = id => {
  return axios.delete(`/users/${id}`);
};