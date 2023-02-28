import "../Styles/DashBoardCard.css";
import ViewWeather from "./ViewWeather";
import React, { useState, useEffect } from "react";
import CloseButton from "react-bootstrap/CloseButton";

function DashBoardCard(props) {
  const [colors, setColors] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    setColors(randomColor);
  }, []);

  return (
    <div
      className="currentWeather"
      key={props.cityId}
      style={{ backgroundColor: colors }}
    >
      <CloseButton className="closeCard" onClick={props.deleteCard} />
      <div className="timeNcountry">
        <h2 className="cityName">
          {props.name}, {props.country}
        </h2>
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

      <div className="weather-description" onClick={props.toggle}>
        <div className="weather-type">
          <p className="type">{props.description}</p>

          <img
            src={`${process.env.REACT_APP_ICON_URL}${props.icon}.png`}
            className="wether-icon"
            alt="weather icon"
          />
        </div>
        <div className="weather-maxmincel">
          <h2 className="celcius">{Math.round(props.temp)}°c</h2>
          <p className="tempmin">Temp min:{Math.round(props.temp_min)}°c</p>
          <p className="tempmax">Temp max:{Math.round(props.temp_max)}°c</p>
        </div>
      </div>
      <div className="current-weather-footer">
        <div className="con1">
          <p>Presure: {props.pressure} pa</p>
          <p>Humidity:{props.humidity}% </p>
          <p>Visibility: {props.visibility / 1000}Km</p>
        </div>
        <div className="con2">
          <img src="../Assests/VectorSmartObject.png" className="smart-obj" />
          <p>
            {props.speed}m/s {props.degree}Degree
          </p>
        </div>
        <div className="con3">
          <p>sunrise: {new Date(props.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(props.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}
export default DashBoardCard;
