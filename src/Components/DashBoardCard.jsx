import "../Styles/DashBoardCard.css";
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
    <div className="currentWeather" style={{ backgroundColor: colors }}>
      <CloseButton className="closeCard" onClick={props.deleteCard} />

      <div onClick={props.toggle}>
        <div className="top-leftside">
          <div className="timeNcountry">
            <div className="cityName">
              {props.name}, {props.country}
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
          <div className="weather-type">
            <p className="type">{props.description}</p>

            <img
              src={`${process.env.REACT_APP_ICON_URL}${props.icon}.png`}
              className="wether-icon"
              alt="weather icon"
              onClick={props.toggle}
            />
          </div>
        </div>

        <div className="weather-maxmincel">
          <div className="celcius">{Math.round(props.temp)}°c</div>
          <div className="tempmin">Temp min:{Math.round(props.temp_min)}°c</div>
          <div className="tempmax">Temp max:{Math.round(props.temp_max)}°c</div>
        </div>

        <div className="current-weather-footer" onClick={props.toggle}>
          <div className="con1">
            <div className="pressure">Presure: {props.pressure} pa</div>
            <div className="humidity">Humidity:{props.humidity}% </div>
            <div className="visibility">
              Visibility: {props.visibility / 1000}Km
            </div>
          </div>
          <div className="con2">
            <img src="../Assests/VectorSmartObject.png" className="smart-obj" />
            <div className="degree">
              {props.speed}m/s {props.degree}Degree
            </div>
          </div>
          <div className="con3">
            <div className="sunrise">
              sunrise: {new Date(props.sunrise * 1000).toLocaleTimeString()}
            </div>
            <div className="sunset">
              Sunset: {new Date(props.sunset * 1000).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashBoardCard;
