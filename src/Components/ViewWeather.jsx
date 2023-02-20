import "../Styles/viewWeather.css";
import React, { useState, useEffect } from "react";

function ViewWeather(setView) {
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="viewcurrentWeather" key={setView.cityId}>
      <button className="viewarrow-button">
        <span className="viewarrow-symbol" onClick={setView(false)}>
          ←
        </span>
      </button>
      <div>
        <h2 className="viewcityName">{setView.currentDateTime}</h2>
        <p className="timeNdate">
          {" "}
          {new Intl.DateTimeFormat("default", {
            hour: "numeric",
            minute: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(currentDateTime))}
        </p>
      </div>

      <div className="viewweather-description">
        <div className="viewweather-type">
          <p className="viewtype">{setView.description}</p>
          <img src="../Assests/iconcloud.png" className="wether-icon" />
        </div>
        <div className="viewweather-maxmincel">
          <h2 className="celcicus">c</h2>
          <p className="maxtem">Temp min:{Math.round(setView.temp_min)}c</p>
          <p className="tempmin">Temp max:{Math.round(setView.temp_max)}c</p>
        </div>
      </div>
      <div className="viewcurrent-weather-footer">
        <div className="con1">
          <p>Presure:{setView.presure}pa</p>
          <p>Huminity: {setView.humidity}%</p>
          <p>Visibility: {setView.visibility} Km</p>
        </div>
        <div className="con2">
          <p>{setView.speed}ms degree</p>
        </div>
        <div className="con3">
          <p>
            sunrise: {new Date(setView.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>Sunset: {new Date(setView.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewWeather;
