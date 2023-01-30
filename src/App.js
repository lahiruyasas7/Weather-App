import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
//import cities from './cities.json';
import DashBoardCard from './Components/DashBoardCard';
//import ViewWeather from './Components/ViewWeather';

const cities = [  {    CityCode: "1248991",    CityName: "Colombo",    Temp: "33.0",    Status: "Clouds"  },  {    CityCode: "1850147",    CityName: "Tokyo",    Temp: "8.6",    Status: "Clear"  },  {    CityCode: "2644210",    CityName: "Liverpool",    Temp: "16.5",    Status: "Rain"  },  {    CityCode: "2988507",    CityName: "Paris",    Temp: "22.4",    Status: "Clear"  },  {    CityCode: "2147714",    CityName: "Sydney",    Temp: "27.3",    Status: "Rain"  },  {    CityCode: "4930956",    CityName: "Boston",    Temp: "4.2",    Status: "Mist"  },  {    CityCode: "1796236",    CityName: "Shanghai",    Temp: "10.1",    Status: "Clouds"  },  {    CityCode: "3143244",    CityName: "Oslo",    Temp: "-3.9",    Status: "Clear"  }];

function App() {

  const [citiesData, setCitiesData] = useState([]);
  const [weather, setWeather] = useState([]);

  
 
  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < cities.length; i++) {
        const result = await axios(
          `http://api.openweathermap.org/data/2.5/weather?id=${cities[i].CityCode}&appid=10497b1b7f6a8b11047bd09b0f12ec24`
        );
        setWeather(prevState => [          ...prevState,          {            city: cities[i].CityName,
            temp: result.data.main.temp,
            max_temp: result.data.main.temp_max,
            min_temp: result.data.main.temp_min,
            sunrise: result.data.sys.sunrise,
            sunset: result.data.sys.sunset,
            name: result.data.name
          }
        ]);
      }
    };

    fetchData();
  }, []);  

console.log(weather);


  

  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
}, []);

  
 
  const cards = weather.map(data=>{
    return(
      <DashBoardCard
        name={data.name}
        temp={data.temp}
        
        temp_min={data.temp_min}
        temp_mac={data.temp_max}
        pressure={data.pressure}
        humidity={data.humidity}

      />
    )
  })



  return (

  
    <div className="App">


      <di className="top">
        <img src='./Assests/logo.png' className='weather-icon' alt="weatehr"/>
        <h1 className='header-name'>weather app</h1>
     </di> 
    
    {cards}
    

   {/*}
    <div className='currentWeather'>
  
  <div>
      <h2 className='cityName'>{weather.name}</h2>
      <p className='timeNdate'> {new Intl.DateTimeFormat('default', {
                      hour: 'numeric',
                      minute: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      }).format(new Date(currentDateTime))}</p>
  </div>
  
  <div className='weather-description'>
  
      <div className='weather-type'>
          <p className='type'>sunny</p>
          <img src='../Assests/iconcloud.png' className='wether-icon'/>
  
      </div>
      <div className='weather-maxmincel'>
          <h2 className='celcicus'>{weather?.main?.temp}c</h2>
          <p className="tempmin">Temp min:{weather?.main?.temp_min}c</p>
          <p className="tempmax">Temp max:{weather?.main?.temp_max}c</p>
      </div>
  
  
  </div>
  <div className='current-weather-footer'>
      <div className="con1">
          <p>Presure: {weather?.main?.pressure} pa</p>
          <p>Huminity: {weather?.main?.humidity} </p>
          <p>Visibility: {weather.visibility}Km</p>
      </div>
      <div className='con2'>
          <p>4ms degree</p>
      </div>
      <div className='con3'>
          <p>sunrise: {weather?.sys?.sunrise}</p>
          <p>Sunset: {weather.sunset}</p>
      </div>
  </div>
  
  </div>
                                     
                    */}                      
                  
   
 
    </div>
  );
}

export default App;
