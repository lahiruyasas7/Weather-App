import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
//import cities from './cities.json';
import DashBoardCard from './Components/DashBoardCard';
//import ViewWeather from './Components/ViewWeather';

const cities = [  {    CityCode: "1248991",    CityName: "Colombo",    Temp: "33.0",    Status: "Clouds"  },  {    CityCode: "1850147",    CityName: "Tokyo",    Temp: "8.6",    Status: "Clear"  },  {    CityCode: "2644210",    CityName: "Liverpool",    Temp: "16.5",    Status: "Rain"  },  {    CityCode: "2988507",    CityName: "Paris",    Temp: "22.4",    Status: "Clear"  },  {    CityCode: "2147714",    CityName: "Sydney",    Temp: "27.3",    Status: "Rain"  },  {    CityCode: "4930956",    CityName: "Boston",    Temp: "4.2",    Status: "Mist"  },  {    CityCode: "1796236",    CityName: "Shanghai",    Temp: "10.1",    Status: "Clouds"  },  {    CityCode: "3143244",    CityName: "Oslo",    Temp: "-3.9",    Status: "Clear"  }];

function App() {

  
  const [weather, setWeather] = useState([]);

  console.log(weather)
 
  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < cities.length; i++) {
        const result = await axios(
          `http://api.openweathermap.org/data/2.5/weather?id=${cities[i].CityCode}&appid=10497b1b7f6a8b11047bd09b0f12ec24`
        );
        setWeather(prevState => [          ...prevState,          {            
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
            
          }
        ]);
      }
    };

    fetchData();
  }, []);  




  

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

      />
    )
  })



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
