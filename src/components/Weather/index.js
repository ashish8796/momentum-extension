import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIconURI, getWeatherByQuery, getWeatherURI } from "../../config";
import { setCurrentLocation, setCurrentWeather } from "../../store/actions";

function Weather() {
  const dispatch = useDispatch();
  const weatherState = useSelector((state) => state.weatherState);

  const { currentLocation } = weatherState;
  const { query, currentTemp, weather, icon, cityName } = weatherState;

  let iconUrl = getIconURI(icon);

  let uri = getWeatherURI(currentLocation.latitude, currentLocation.longitude);

  // TODO:
  // Move fetch weather to redux thunk
  const fetchWeather = (uri) => {
    dispatch(setCurrentWeather(uri));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;

      // TODO:
      // Rename fetchCurrentLocation to setCurrentLocation
      !cityName && dispatch(setCurrentLocation({ latitude, longitude }));
    });
  }, []);
  useEffect(() => {
    const uri = getWeatherByQuery(query);
    // console.log(query, uri);
    query && fetchWeather(uri);
  }, [query]);

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
  );
}

export default Weather;
