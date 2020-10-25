import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./../../store/actionTypes";

function Weather() {
  const dispatch = useDispatch();
  const { weatherState, currentLocation } = useSelector(state => state);
  const { accessKey, baseUrl, query, currentTemp, weather, icon, cityName } = weatherState;

  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let uri = baseUrl + `lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=` + accessKey;

  const fetchWeather = (uri) => {
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        let currentTemp = Math.round(data.main.temp - 275)
        let weather = data.weather[0].description;
        let icon = data.weather[0].icon;
        let cityName = data.name;
        dispatch(actions.getCurrentWeather({ currentTemp, weather, icon, cityName }))
      })
      .catch((error) => {
        window.location.reload()
      })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;

      !cityName&&dispatch(actions.fetchCurrentLocation({ latitude, longitude }))
    });
  }, [])

  useEffect(()=> {
    const uri = baseUrl+`q=${query}&appid=` + accessKey;
    query && fetchWeather(uri)
  },[query])

  useEffect(() => {
    currentLocation.longitude && fetchWeather(uri);
  }, [currentLocation.longitude]);

  return (
    <div className="weather">
      <div className="city-temprature">
        <div className="city">
          <h1>{cityName}</h1>
        </div>
        <div className="temperature">
          <p>{currentTemp}&deg;C</p>
        </div>
      </div>
      <div className="clouds">
        <img src={iconUrl} alt={weather} title={weather} />
      </div>
    </div>
  )
}

export default Weather;