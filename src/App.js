import React, { useState, useEffect } from "react";
import "./Styles/App.css";
import citiesData from "./cities.json";
import DashBoardCard from "./Components/DashBoardCard";
import ViewWeather from "./Components/ViewWeather";
import Button from "react-bootstrap/Button";
import { getWeatherData } from "./APIHelper";
//import { ConstructionOutlined } from "@mui/icons-material";

function App() {
  const [weather, setWeather] = useState([]);
  const [viewCard, setViewCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [city, setCity] = useState("");

  const cities = citiesData.List;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = cities.map(async (city) => {
          const result = await getWeatherData(city.CityCode);

          return {
            cityId: city.CityCode,
            temp: result.data.main.temp,
            temp_max: result.data.main.temp_max,
            temp_min: result.data.main.temp_min,
            sunrise: result.data.sys.sunrise,
            sunset: result.data.sys.sunset,
            name: result.data.name,
            visibility: result.data.visibility,
            humidity: result.data.main.humidity,
            pressure: result.data.main.pressure,
            description: result.data.weather[0].main,
            country: result.data.sys.country,
            icon: result.data.weather[0].icon,
            speed: result.data.wind.speed,
            degree: result.data.wind.deg,
            dt: result.data.dt,
          };
        });

        const data = await Promise.all(promises);
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [cities]);

  const cards = weather.map((data) => {
    return (
      <DashBoardCard
        key={data.cityId}
        cityId={data.cityId}
        name={data.name}
        temp={data.temp}
        description={data.description}
        temp_min={data.temp_min}
        temp_max={data.temp_max}
        pressure={data.pressure}
        humidity={data.humidity}
        sunrise={data.sunrise}
        sunset={data.sunset}
        visibility={data.visibility}
        country={data.country}
        icon={data.icon}
        speed={data.speed}
        degree={data.degree}
        toggle={() => toggle(data.cityId)}
        deleteCard={() => deleteCard(data.cityId)}
      />
    );
  });


const handleInputChange = (event) =>{
  setCity(event.target.value)
}

const handleButtonClick = () =>{
  console.log(`City name: ${city}`);
}

console.log(city)

  const CACHE_KEY = "weatherData";
  const CACHE_EXPIRATION = 5 * 60 * 1000;

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
      setWeather(cachedData.data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cachedData = {
      timestamp: Date.now(),
      data: weather,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cachedData));
  }, [weather]);

  function toggle(cityId) {
    const cardData = weather.find((data) => data.cityId === cityId);
    setSelectedCard(cardData);
    setViewCard(true);
  }
  const closeView = () => {
    setViewCard(false);
  };
  const deleteCard = (cityId) => {
    setWeather(weather.filter((data) => data.cityId !== cityId));
  };

    /*}
function getCity(){
  
    const cityData = getWeatherData(city);
  setWeather(cityData);
  .jason => {
    json=>setWeather();
  }
  }
  
*/

  return (
    <div className="App">
      <div className="top">
        <img
          src="./Assests/logo.png"
          className="topweather-icon"
          alt="weather"
        />
        <h1 className="header-name"> Weather App</h1>
      </div>

      {!viewCard && (
        <div>
          <input
            type="text"
            placeholder="Enter a city"
            className="search-bar"
            onChange={handleInputChange}
          />
          <Button className="btn-search" variant="primary" onClick={handleButtonClick}>
            add city
          </Button>
        </div>
      )}

      <section className="cards-list"> {!viewCard && cards}</section>

      {viewCard && selectedCard && (
        <ViewWeather closeView={closeView} viewData={selectedCard} />
      )}

      <div className="footer">2023 Lahiru Karunathilaka</div>
    </div>
  );
}

export default App;
