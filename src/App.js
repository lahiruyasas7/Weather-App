import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
//import cities from './cities.json';
import DashBoardCard from './Components/DashBoardCard';
import ViewWeather from './Components/ViewWeather';
import {BrowseRouter as Router, Route, Routes} from 'react-router-dom';



function App() {

  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState([]);
  
  
  useEffect(() => {
    fetch('cities.json')
      .then(res => res.json())
      .then(data => setCities(data.List))
      .catch(err => console.error(err));
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < cities.length; i++) {
        const result = await axios(
          `http://api.openweathermap.org/data/2.5/weather?id=${cities[i].CityCode}&appid=10497b1b7f6a8b11047bd09b0f12ec24&units=metric`
        );
        setWeather(prevState => [    ...prevState,  {            
            city: cities[i].CityCode,
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
            speed: result.data.wind.speed
            
          }
        ]);
      }
    };

    fetchData();
  }, []);  



 
  const cards = weather.map(data=>{
    return(
      <DashBoardCard
        key={data.CityCode} 
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
      />
    )
  })

  useEffect(() => {
    
    
    const fetchWeatherData = async () => {
      const weatherPromises = cities.map(city => {
        const weatherCacheKey = `weather_${city.CityCode}`;
        const weatherCache = localStorage.getItem(weatherCacheKey);
  
        if (weatherCache) {
          const weatherCacheData = JSON.parse(weatherCache);
          const cacheTime = new Date(weatherCacheData.timestamp).getTime();
          const currentTime = new Date().getTime();
          const timeDifference = (currentTime - cacheTime) / 1000 / 60;
          if (timeDifference < 5) {
            return Promise.resolve(weatherCacheData.data);
          }
        }
  
       
      });
  
      const weatherData = await Promise.all(weatherPromises);
      setWeather(weatherData);
    };
  
    fetchWeatherData();
  }, [cities]);
    

  return (
    

    <div className="App">

    
      <di className="top">
        <img src='./Assests/logo.png' className='weather-icon' alt="weatehr"/>
        <h1 className='header-name'>weather app</h1>
     </di> 

    <section className='cards-list'>
    {cards}
    </section>
             
   
 
    </div>
    

  );
}

export default App;
