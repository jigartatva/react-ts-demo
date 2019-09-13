import axios from 'axios';
import { notification } from 'antd';
import { API_BASE_URL } from '../constants/appConfig';

const instance =  axios.create({
    baseURL: API_BASE_URL
});

const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message 
    });
  };
  
// Add a request interceptor
instance.interceptors.request.use(function (config) {
   
    return config;
  }, function (error) {
   
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
   
    if( response.config.method === 'post'){
        openNotificationWithIcon('success', 'Record added successfully');
    }else if( response.config.method === 'patch'){
        openNotificationWithIcon('success', 'Record updated successfully');
    }else if( response.config.method === 'delete'){
        openNotificationWithIcon('success', 'Record deleted successfully');
    }
   
   
    return response;
  }, function (error) {
  
    return Promise.reject(error);
  });

  export default instance;