// Weather varialbles
const weatherElem = document.querySelector(".weather");

import store from "."

const weatherState = store.weather;

export const fetchWeather = (uri) => {
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      weatherState.currentTemp = Math.round(data.main.temp - 275)
      weatherState.weather = data.weather[0].description;
      weatherState.icon = data.weather[0].icon;
      weatherState.cityName = data.name;
      weatherElem.innerHTML = weatherState.wetherMarkup;
      localStorage.setItem("userWeather", JSON.stringify(weatherState))
    })
}

export function getCurrentWeather() {
  let promise = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((location) => {
      resolve(location)
    })
  })

  promise.then(location => {
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude;
    let uri = weatherState.baseUrl + `lat=${latitude}&lon=${longitude}&appid=` + weatherState.accessKey
    fetchWeather(uri)
  })
}
