import React from 'react'
import axios from '../../axios'

const upload = (file,getAds) => {
  const axiosInstance = axios.create();

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // Handle unauthorized error
      }
      return Promise.reject(error);
    }
  );

  const formData = new FormData();
  formData.append('file', file);

  try {
    axiosInstance.post('/lead/upload', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log('Upload successful', response.data);
    }).catch(error => {
      console.error('There was an error!', error);
    });
  } catch (error) {
    console.error('There was an error!', error);
  }

  return true
};

export default upload;
