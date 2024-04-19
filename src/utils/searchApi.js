import axios from "axios";

const API_KEY = process.env.REACT_APP_SEARCH_API_KEY;

const searchApi = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/search",
  headers: {
    Accept: "application/json",
    Authorization: `KakaoAK ${API_KEY}`,
  },
});

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default searchApi;
