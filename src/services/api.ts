import axios from "axios";
import { notification } from "antd";
import { API_BASE_URL } from "../constants/appConfig";

const instance = axios.create({
  baseURL: API_BASE_URL
});

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message
  });
};

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    if (response.config.method === "post" && response.status === 200) {
      openNotificationWithIcon("success", "Record added successfully");
    } else if (response.config.method === "patch" && response.status === 200) {
      openNotificationWithIcon("success", "Record updated successfully");
    } else if (response.config.method === "delete" && response.status === 200) {
      openNotificationWithIcon("success", "Record deleted successfully");
    }

    return response;
  },
  function(error) {
    openNotificationWithIcon("error", "Something went wrong");
    return Promise.reject(error);
  }
);

export default instance;