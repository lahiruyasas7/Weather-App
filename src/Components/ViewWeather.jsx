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
    <div className="viewcurrentWeather" key={viewData.cityId}>
      <button className="viewarrow-button">
        <span className="viewarrow-symbol" onClick={closeView}>
          ←
        </span>
      </button>
      <div className="view-top">
        <div className="cityName">
          {viewData.name}, {viewData.country}
        </div>

        <div className="timeNdate">
          {new Intl.DateTimeFormat("default", {
            hour: "numeric",
            minute: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(currentDateTime))}
        </div>
      </div>

      <div className="viewweather-description">
        <div className="viewweather-type">
          <img
            src={`${process.env.REACT_APP_ICON_URL}${viewData.icon}.png`}
            className="wether-icon"
            alt="weather-icon"
          />
          <div className="weather-type">{viewData.description}</div>
        </div>
        <div className="viewweather-maxmincel">
          <h1 className="celcicus">{Math.round(viewData.temp)}°c</h1>
          <div className="maxtemp">
            Temp min:{Math.round(viewData.temp_min)}°c
          </div>
          <div className="tempmin">
            Temp max:{Math.round(viewData.temp_max)}°c
          </div>
        </div>
      </div>

      <div className="viewcurrent-weather-footer">
        <div className="con1">
          <div className="view-pressure">Presure:{viewData.pressure}pa</div>
          <div className="view-humidity">Huminity: {viewData.humidity}%</div>
          <div className="view-visibility">
            Visibility: {viewData.visibility} Km
          </div>
        </div>
        <div className="con2">
          <div className="view-degree">
            <img src="../Assests/vectorArrow.png" className="smart-obj" />
            {viewData.speed}ms {viewData.degree}degree
          </div>
        </div>
        <div className="con3">
          <div className="view-sunrise">
            sunrise: {new Date(viewData.sunrise * 1000).toLocaleTimeString()}
          </div>
          <div className="view-sunset">
            Sunset: {new Date(viewData.sunset * 1000).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewWeather;
