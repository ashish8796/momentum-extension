export const unsplashURI = "https://source.unsplash.com/1600x900/?nature";

const weatherAccessKey = "c3ac998f040786cd10514604dc002d0e";

export const getWeatherURI = (lat = 0, long = 0) => {
  return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAccessKey}`;
};

export const getWeatherByQuery = (query = "") => {
  return `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${weatherAccessKey}`;
};

export const getIconURI = (icon = "") => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};
