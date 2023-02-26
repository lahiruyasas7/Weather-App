import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/App.css";
import citiesData from "./cities.json";
import DashBoardCard from "./Components/DashBoardCard";
import ViewWeather from "./Components/ViewWeather";
import Button from "react-bootstrap/Button";

function App() {
  const [weather, setWeather] = useState([]);
  const [viewCard, setViewCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cities = citiesData.List.map((city) => city);

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < cities.length; i++) {
        const result = await axios(
          `${process.env.REACT_APP_API_URL}?id=${cities[i].CityCode}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );

        setWeather((prevState) => [
          ...prevState,
          {
            cityId: cities[i].CityCode,
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
          },
        ]);
      }
    };

    fetchData();
  }, []);

  const cards = weather.map((data) => {
    return (
      <DashBoardCard
        key={data.CityCode}
        cityId={data.cityId}
        name={data.name}
        temp={data.temp}
        description={data.description}
        temp_min={data.temp_min}
        temp_mac={data.temp_max}
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

  const CACHE_KEY = "weatherData";
  const CACHE_EXPIRATION = 5 * 60 * 1000;

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
      setWeather(cachedData.data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(weather));
  }, [weather]);

  function toggle(cityId) {
    const cardData = weather.find((data) => data.cityId === cityId);
    setSelectedCard(cardData);
    setViewCard(true);
  }

  const deleteCard = (cityId) => {
    setWeather(weather.filter((data) => data.cityId !== cityId));
  };

  console.log(weather);

  return (
    <div className="App">
      <di className="top">
        <img src="./Assests/logo.png" className="weather-icon" alt="weatehr" />
        <h1 className="header-name">weather app</h1>
      </di>

      <div>
        <input type="text" placeholder="Enter a city" className="search-bar" />
        <Button className="btn-search" variant="primary">
          add city
        </Button>{" "}
      </div>

      <section className="cards-list"> {!viewCard && cards}</section>

      {viewCard && selectedCard && (
        <ViewWeather setView={toggle} viewData={selectedCard} />
      )}

      <div className="footer">2023 Fidenz Technologies</div>
    </div>
  );
}

export default App;
