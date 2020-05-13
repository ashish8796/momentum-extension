// Weather varialbles
const weatherElem = document.querySelector(".weather");


const weatherState = {
  accessKey: "c3ac998f040786cd10514604dc002d0e",
  baseUrl: "http://api.openweathermap.org/data/2.5/weather?",
  query: "",
  currentTemp: "",
  weather: "",
  icon: "",
  cityName: "",

  get uri() {
    return this.baseUrl + `q=${this.query}&appid=` + this.accessKey;
  },

  get iconUrl() {
    return `http://openweathermap.org/img/wn/${this.icon}@2x.png`
  },

  get wetherMarkup() {

    return `
    <div class="city">
      <h1>${this.cityName}</h1>
    </div>
    <div class="temperature">
      <p>${this.currentTemp}&degc</p>
    </div>
    <div class="clouds">
      <img src="${this.iconUrl}" alt="${this.weather}" title="${this.weather}">
    </div>`
  }
}


export const fetchWeather = (uri) => {

  fetch(uri)
    .then(response => response.json())
    .then(data => {
      weatherState.currentTemp = Math.round(data.main.temp - 275)
      weatherState.weather = data.weather[0].description;
      weatherState.icon = data.weather[0].icon;
      weatherState.cityName = data.name;
      weatherElem.innerHTML = weatherState.wetherMarkup;
      console.log(weatherState)
    })
}

function getCurrentPlace (location) {
  console.log(location)
}
navigator.geolocation.getCurrentPosition((location)=>{
  getCurrentPlace(location)
});
// console.log(currentPlace)

export default weatherState;