export const CHANGE_DATE_AND_TIME = "CHANGE_DATE_AND_TIME";
export const FETCH_CURRENT_LOCATION = "FETCH_CURRENT_LOCATION";
export const GET_WALLPAPER = "GET_WALLPAPER";
export const GET_CURRENT_WEATHER = "GET_CURRENT_WEATHER";
export const GET_QUOTES = "GET_QUOTES";
export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const GET_COMPLETED_ALL_TODO = "GET_COMPLETED_ALL_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const GET_ACTIVE_TODO = "GET_ACTIVE_TODO";
export const ADD_LINK_TO_FOOTER = "ADD_LINK_TO_FOOTER";
export const CHANGE_CITY = "CHANGE_CITY";
export const TOGGLE_QUOTE = "TOGGLE_QUOTE";
export const CHANGE_FORMAT = "CHANGE_FORMAT";
export const START_POMODORO = "START_POMODORO";
export const CHANGE_POMODORO_TIME = "CHANGE_POMODORO_TIME";
// export const

export const actions = {
  changeDateAndTime(newDate) {
    return {
      type: CHANGE_DATE_AND_TIME,
      payload: newDate,
    };
  },

  fetchCurrentLocation(obj) {
    return {
      type: FETCH_CURRENT_LOCATION,
      payload: obj,
    };
  },

  getWallpaper(url) {
    return {
      type: GET_WALLPAPER,
      payload: { url },
    };
  },

  getCurrentWeather(obj) {
    return {
      type: GET_CURRENT_WEATHER,
      payload: obj,
    };
  },

  getQuotes(quote) {
    return {
      type: GET_QUOTES,
      payload: quote,
    };
  },

  addTodo(todo) {
    return {
      type: ADD_TODO,
      payload: {
        todo,
      },
    };
  },

  completeTodo(id) {
    return {
      type: COMPLETE_TODO,
      payload: {
        id: id,
      },
    };
  },

  deleteTodo(id) {
    return {
      type: DELETE_TODO,
      payload: {
        id: id,
      },
    };
  },

  editTodo(id, newValue) {
    return {
      type: EDIT_TODO,
      payload: {
        id,
        newValue,
      },
    };
  },

  getActiveTodo() {
    return {
      type: GET_ACTIVE_TODO,
    };
  },

  getCompletedAllTodo() {
    return {
      type: GET_COMPLETED_ALL_TODO,
    };
  },

  addLinkToFooter(linkObj) {
    return {
      type: ADD_LINK_TO_FOOTER,
      payload: linkObj,
    };
  },

  changeCity(cityName) {
    return {
      type: CHANGE_CITY,
      payload: cityName,
    };
  },

  toggleQuote(showQuote) {
    return {
      type: TOGGLE_QUOTE,
      payload: showQuote,
    };
  },

  timeFormat(format) {
    return {
      type: CHANGE_FORMAT,
      payload: format,
    };
  },

  startPomodoro(status) {
    return {
      type: START_POMODORO,
      payload: status,
    };
  },

  changePomodoroTime(newTime) {
    return {
      type: CHANGE_POMODORO_TIME,
      payload: newTime,
    };
  },
};
