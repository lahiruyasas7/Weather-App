import "../Styles/viewWeather.css";
import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
      <div className="viewarrow-button" onClick={closeView}>
        <ArrowBackIcon />
      </div>

      <div className="view-top">
        <div className="cityName">
          {viewData.name}, {viewData.country}
        </div>

        <div className="timeNdate">
          {new Intl.DateTimeFormat("default", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
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
          <div className="viewweather-desp">{viewData.description}</div>
        </div>
        <img src="../Assests/majorLine.png" className="majorLine-img" alt="major-line"/>
        <div className="viewweather-maxmincel">
          <div className="view-celcius">{Math.round(viewData.temp)}°c</div>
          <div className="maxtemp">
            Temp min:{Math.round(viewData.temp_min)}°c
          </div>
          <div className="mintemp">
            Temp max:{Math.round(viewData.temp_max)}°c
          </div>
        </div>
      </div>

      <div className="viewcurrent-weather-footer">
        <div className="viewcon1">
          <div className="view-pressure">Presure:{viewData.pressure}pa</div>
          <div className="view-humidity">Huminity: {viewData.humidity}%</div>
          <div className="view-visibility">
            Visibility: {viewData.visibility} Km
          </div>
        </div>
        <img src="../Assests/line.png" className="viewcon1-img" alt="line"/>
        <div className="viewcon2">
          <img src="../Assests/vectorArrow.png" className="smart-obj" alt="vectorArrow"/>
          <div className="view-degree">
            {viewData.speed}m/s {viewData.degree} Degree
          </div>
        </div>
        <img src="../Assests/line.png" className="viewcon2-img" alt="line"/>
        <div className="viewcon3">
          <div className="view-sunrise">
            Sunrise: {new Date(viewData.sunrise * 1000).toLocaleTimeString()}
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
