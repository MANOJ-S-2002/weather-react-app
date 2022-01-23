import React, { useState } from "react";
import moment from "moment";
import {
  CloudLightningRain,
  Clouds,
  Moisture,
  Sun,
  Sunrise,
  Sunset,
  Wind,
} from "react-bootstrap-icons";
import CloudIcon from "../assets/images/cloud.png";

export default function Weather() {
  const [state, setState] = useState({
    city: "Namakkal",
    temp: 100,
    humidity: 20,
    windSpeed: 15,
    sunRise: "10:15 AM",
    sunSet: "6:00 PM",
    description: "Cloudy",
    icon: CloudIcon,
    type: "cloud",
  });

  return (
    <div className={`wrapper  ${state.type}`}>
      <div className="app-container">
        <div className="date color-white text-center font-size-17 margin-bottom-10">
          {moment().format("dddd, Do MMMM")}
        </div>
        <div className="color-white text-center font-size-25 margin-bottom-15">
          {moment().format("h:mm a")}
        </div>
        <div className="city text-center margin-bottom-20 font-size-17">
          {state.city}
        </div>
        <div className="text-center weather-icon">
          {state.type === "sun" && <Sun />}
          {state.type === "cloud" && <Clouds />}
          {state.type === "rain" && <CloudLightningRain />}
        </div>
        <div className="text-center temperature">{`${state.temp}\u00B0`}</div>

        <div className="text-center day margin-bottom-10">
          {moment().format("dddd")}
        </div>

        <hr className="horizontal-bar" />

        <div className="inner-container">
          <div className="row-container">
            <div className="font-size-25 text-center">
              <Sunrise />
              <div className="value">{state.sunRise}</div>
            </div>

            <div className="font-size-25 text-center">
              <Sunset />
              <div className="value">{state.sunSet}</div>
            </div>
            <div className="font-size-25 text-center">
              <Moisture />
              <div className="value">{state.humidity}</div>
            </div>
            <div className="font-size-25 text-center">
              <Wind />
              <div className="value">{`${state.windSpeed} kmph`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
