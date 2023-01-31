
import './DashBoardCard.css';
import React, {useState, useEffect} from 'react';


function DashBoardCard(props){

    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
}, []);



return(
   
<div className='currentWeather' key={props.Citycode}>
  
<div>
    <h2 className='cityName'>{props.name}</h2>
    <p className='timeNdate'> {new Intl.DateTimeFormat('default', {
                    hour: 'numeric',
                    minute: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    }).format(new Date(currentDateTime))}</p>
</div>

<div className='weather-description' >

    <div className='weather-type'>
        <p className='type'>{props.description}</p>
        <img src='../Assests/iconcloud.png' className='wether-icon'/>

    </div>
    <div className='weather-maxmincel'>
        <h2 className='celcicus'>{props.temp}c</h2>
        <p className="tempmin">Temp min:{props.temp_min}c</p>
        <p className="tempmax">Temp max:{props.temp_max}c</p>
    </div>


</div>
<div className='current-weather-footer'  >
    
    <div className="con1">
        <p>Presure: {props.presure} pa</p>
        <p>Humidity:{props.humidity} </p>
        <p>Visibility: {props.visibility}</p>
    </div>
    <div className='con2'>
        <p>4ms degree</p>
    </div>
    <div className='con3'>
        <p>sunrise: {new Date(props.sunrise*1000).toLocaleTimeString()}</p>
        <p>Sunset: {new Date(props.sunset*1000).toLocaleTimeString()}</p>
    </div>
</div>

</div>
      
       
    )
}
export default DashBoardCard;