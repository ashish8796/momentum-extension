import {
  ADD_LINK_TO_FOOTER,
  ADD_TODO,
  CHANGE_CITY,
  CHANGE_DATE_AND_TIME,
  CHANGE_FORMAT,
  CHANGE_POMODORO_TIME,
  COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  GET_ACTIVE_TODO,
  GET_COMPLETED_ALL_TODO,
  SET_CURRENT_WEATHER,
  GET_QUOTES,
  SET_WALLPAPER,
  SET_CURRENT_LOCATION,
  START_POMODORO,
  TOGGLE_QUOTE,
} from "./types";

// TODO:
// 1 - Move actions to seperate file
// 2 - Export individual function instead of whole object

export const setWallpaper = (uri) => async (dispatch) => {
  try {
    const response = await fetch(uri);
    dispatch({
      type: SET_WALLPAPER,
      payload: { url: response.url },
    });
  } catch (e) {
    window.location.reload();
  }
};

export const changeDateAndTime = (newDate) => {
  return {
    type: CHANGE_DATE_AND_TIME,
    payload: newDate,
  };
};

export const setCurrentLocation = (obj) => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: obj,
  };
};

// TODO:
// Change getWallpaper to setWallpaper
// export const setWallpaper = (url) => {

// TODO:
// Change getCurrentWeather to setCurrentWeather
export const setCurrentWeather = (uri) => async (dispatch) => {
  try {
    const response = await (await fetch(uri)).json();
    let currentTemp = Math.round(response.main.temp - 275);
    let weather = response.weather[0].description;
    let icon = response.weather[0].icon;
    let cityName = response.name;
    let obj = { currentTemp, weather, icon, cityName };
    console.log(obj);
    dispatch({
      type: SET_CURRENT_WEATHER,
      payload: obj,
    });
  } catch (error) {
    window.location.reload();
  }
};

export const getQuotes = (uri) => async (dispatch) => {
  try {
    const response = await (await fetch(uri)).json();
    let quote = response.contents.quotes[0].quote;
    dispatch({
      type: GET_QUOTES,
      payload: quote,
    });
  } catch (e) {}
};

export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: {
      todo,
    },
  };
};

export const completeTodo = (id) => {
  return {
    type: COMPLETE_TODO,
    payload: {
      id: id,
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: {
      id: id,
    },
  };
};

export const editTodo = (id, newValue) => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      newValue,
    },
  };
};

export const getActiveTodo = () => {
  return {
    type: GET_ACTIVE_TODO,
  };
};

export const getCompletedAllTodo = () => {
  return {
    type: GET_COMPLETED_ALL_TODO,
  };
};

export const addLinkToFooter = (linkObj) => {
  return {
    type: ADD_LINK_TO_FOOTER,
    payload: linkObj,
  };
};

export const changeCity = (cityName) => {
  return {
    type: CHANGE_CITY,
    payload: cityName,
  };
};

export const toggleQuote = (showQuote) => {
  return {
    type: TOGGLE_QUOTE,
    payload: showQuote,
  };
};

export const timeFormat = (format) => {
  return {
    type: CHANGE_FORMAT,
    payload: format,
  };
};

export const startPomodoro = (status) => {
  return {
    type: START_POMODORO,
    payload: status,
  };
};

export const changePomodoroTime = (newTime) => {
  return {
    type: CHANGE_POMODORO_TIME,
    payload: newTime,
  };
};
