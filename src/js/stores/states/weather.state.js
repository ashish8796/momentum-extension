const weatherState = localStorage.hasOwnProperty("userWeather") ? JSON.parse(localStorage.getItem("userWeather")) : {
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

export default weatherState;