import React, { useEffect, useState } from "react";
import _ from "lodash";
import { timeStampToDateTime } from "../utils";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
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

const getIcon = (code) => {
  switch (code) {
    case "cloud":
      return <Clouds />;
    case "rain":
      return <CloudLightningRain />;
    default:
      return <Sun />;
  }
};

const getType = (code) => {
  if (code.includes("cloud")) {
    return "cloud";
  }
  if (code.includes("rain")) {
    return "rain";
  }
  return "sun";
};

export default function Weather() {
  const [state, setState] = useState({});
  const setWeatherReport = () => {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          )
            .then((response) => {
              response
                .json()
                .then((res) => {
                  setState({
                    ...state,
                    city: res.name,
                    temp: res.main.temp.toFixed(0),
                    humidity: res.main.humidity,
                    windSpeed: res.wind.speed.toFixed(0),
                    sunRise: timeStampToDateTime(res.sys.sunrise).format(
                      "h:mm a"
                    ),
                    sunSet: timeStampToDateTime(res.sys.sunset).format(
                      "h:mm a"
                    ),
                    error: false,
                    description: res.weather[0].description,
                    icon: res.weather[0].icon,
                    type: getType(res.weather[0].main.toLowerCase()),
                  });
                })
                .catch((err) => {
                  setState({
                    error: true,
                  });
                });
            })
            .catch((err) => {
              setState({
                error: true,
              });
            });
        },
        (err) => {
          setState({
            error: true,
          });
        }
      );
    }
  };
  useEffect(() => setWeatherReport(), []);

  if (_.isEmpty(state)) {
    return <CircularProgress />;
  }

  if (state.error) {
    return (
      <div className="app-container" id="error-container">
        <div className="center-text service-down">Service Down</div>
        <div className="center-text margin-bottom-10">
          <Button
            variant="contained"
            color="primary"
            onClick={setWeatherReport}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }
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
        <div className="text-center weather-icon margin-bottom-20">
          {getIcon("sun")}
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
