
//import React from 'react';
import './viewWeather.css'
import React, {useState, useEffect} from 'react';

function ViewWeather(weather){

 const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);


        return(
            <div className='currentWeather'>

                <button className="arrow-button" >
                    <span className="arrow-symbol">←</span>
                </button>
                <div>
                    <h2 className='cityName'>Colombo</h2>
                    <p className='timeNdate'> {new Intl.DateTimeFormat('default', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    }).format(new Date(currentDateTime))}</p>
                </div>

                <div className='weather-description'>

                    <div className='weather-type'>
                        <p className='type'>Few Clouds</p>
                        <img src='../Assests/iconcloud.png' className='wether-icon'/>

                    </div>
                    <div className='weather-maxmincel'>
                        <h2 className='celcicus'>c</h2>
                        <p className="maxtem">Temp min:16c</p>
                        <p className="tempmin">Temp max:25c</p>
                    </div>


                </div>
                <div className='current-weather-footer'>
                    <div className="con1">
                        <p>Presure: 101 pa</p>
                        <p>Huminity: 78%</p>
                        <p>Visibility: 8 Km</p>
                    </div>
                    <div className='con2'>
                        <p>4ms degree</p>
                    </div>
                    <div className='con3'>
                        <p>sunrise: 8.00</p>
                        <p>Sunset: 6.00</p>
                    </div>
                </div>
               
            </div>
            
        );
           
}

export default ViewWeather;