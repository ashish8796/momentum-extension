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
    // let fragment = new DocumentFragment();
    return `
    <div class="city">
      <h1>${this.cityName}</h1>
    </div>
    <div class="temperature">
      <p>${this.currentTemp}&degc</p>
    </div>
    <div class="clouds">
      <img src="${this.iconUrl}"
    </div>`
  }
}


export const fetchWeather = (uri) => {
  console.log(uri);

  fetch(uri)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      weatherState.currentTemp = Math.round(data.main.temp - 275)
      weatherState.weather = data.weather[0].description;
      weatherState.icon = data.weather[0].icon;
      weatherState.cityName = data.name;
      console.log(weatherState)
      weatherElem.innerHTML = weatherState.wetherMarkup;
    })
}

// fetchWeather(weatherState.uri)

export default weatherState;