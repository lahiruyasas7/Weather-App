

import './viewWeather.css'
import React, {useState, useEffect} from 'react';

function ViewWeather(viewcard){

 const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);


        return(
            <div className='viewcurrentWeather' >

                <button className="viewarrow-button" >
                    <span className="viewarrow-symbol">←</span>
                </button>
                <div>
                    <h2 className='viewcityName'>{viewcard.name}</h2>
                    <p className='timeNdate'> {new Intl.DateTimeFormat('default', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    }).format(new Date(currentDateTime))}</p>
                </div>

                <div className='viewweather-description'>

                    <div className='viewweather-type'>
                        <p className='viewtype'>Few Clouds</p>
                        <img src='../Assests/iconcloud.png' className='wether-icon'/>

                    </div>
                    <div className='viewweather-maxmincel'>
                        <h2 className='celcicus'>c</h2>
                        <p className="maxtem">Temp min:16c</p>
                        <p className="tempmin">Temp max:25c</p>
                    </div>


                </div>
                <div className='viewcurrent-weather-footer'>
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