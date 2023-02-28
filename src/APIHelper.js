import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const getWeatherData = (cityCode) => {
  const response = axios.get(
    `${API_URL}?id=${cityCode}&appid=${API_KEY}&units=metric`
  );
  return response;
};

export { getWeatherData };
