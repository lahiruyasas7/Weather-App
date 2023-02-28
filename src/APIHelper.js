import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const getWeatherData = async (cityCode) => {
  const response = await axios.get(
    `${API_URL}?id=${cityCode}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};

export { getWeatherData };
