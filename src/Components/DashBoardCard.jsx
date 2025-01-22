import "../Styles/DashBoardCard.css";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

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
      <div className="closeCard" onClick={props.deleteCard}>
        <CloseIcon />
      </div>
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
            <img
              src={`${process.env.REACT_APP_ICON_URL}${props.icon}.png`}
              className="wether-icon"
              alt="weather icon"
              onClick={props.toggle}
            />
            <div className="type">{props.description}</div>
          </div>
        </div>

        <div className="weather-maxmincel">
          <div className="celcius">{Math.round(props.temp)}°c</div>
          <div className="tempmin">Temp min:{Math.round(props.temp_min)}°c</div>
          <div className="tempmax">Temp max:{Math.round(props.temp_max)}°c</div>
        </div>

        <div className="current-weather-footer" onClick={props.toggle}>
          <div className="footer-text">
            <div className="con1">
              <div className="pressure">Presure: {props.pressure} pa</div>
              <div className="humidity">Humidity: {props.humidity}% </div>
              <div className="visibility">
                Visibility: {props.visibility / 1000}Km
              </div>
            </div>
            <img src="../Assests/line.png" className="con1-img" alt="line"/>
            <div className="con2">
              <img src="../Assests/vectorArrow.png" className="smart-obj" alt="vectorArrow"/>
              <div className="degree">
                {props.speed}m/s {props.degree}Degree
              </div>
            </div>
            <img src="../Assests/line.png" className="con2-img" alt="line"/>
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
    </div>
  );
}
export default DashBoardCard;
