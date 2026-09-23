import axios from "axios";

const options = {
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, data } = error;
    return Promise.reject({ status, ...data });
  },
);

export default API;
