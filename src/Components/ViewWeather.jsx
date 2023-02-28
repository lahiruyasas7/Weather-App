import "../Styles/ViewWeather.css";
import React, { useState, useEffect } from "react";

function ViewWeather({ viewData, closeView }) {
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
    <div className="viewcurrentWeather" key={viewData.cityId} style={{}}>
      <button className="viewarrow-button">
        <span className="viewarrow-symbol" onClick={closeView}>
          ←
        </span>
      </button>

      <h2 className="cityName">
        {viewData.name}, {viewData.country}
      </h2>
      <div>
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
          <p className="viewtype">{viewData.description}</p>

          <img
            src={`${process.env.REACT_APP_ICON_URL}${viewData.icon}.png`}
            className="wether-icon"
            alt="weather-icon"
          />
        </div>
        <div className="viewweather-maxmincel">
          <h1 className="celcicus">{Math.round(viewData.temp)}°c</h1>
          <p className="maxtem">Temp min:{Math.round(viewData.temp_min)}°c</p>
          <p className="tempmin">Temp max:{Math.round(viewData.temp_max)}°c</p>
        </div>
      </div>
      <div className="viewcurrent-weather-footer">
        <div className="con1">
          <p>Presure:{viewData.pressure}pa</p>
          <p>Huminity: {viewData.humidity}%</p>
          <p>Visibility: {viewData.visibility} Km</p>
        </div>
        <div className="con2">
          <p>
            {viewData.speed}ms {viewData.degree}degree
          </p>
        </div>
        <div className="con3">
          <p>
            sunrise: {new Date(viewData.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>Sunset: {new Date(viewData.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewWeather;
