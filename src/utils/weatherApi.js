import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.request.use(
  function (config) {
    config.params = {
      ...config.params,
      appid: API_KEY,
    };
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

export default weatherApi;
