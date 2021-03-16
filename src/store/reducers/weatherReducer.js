import {
  SET_CURRENT_LOCATION,
  CHANGE_CITY,
  SET_CURRENT_WEATHER,
} from "./../types";

const initialState = {
  ...(localStorage.hasOwnProperty("weather")
    ? JSON.parse(localStorage.getItem("weather"))
    : {
        query: "",
        currentTemp: "",
        weather: "",
        icon: "",
        cityName: "",
      }),

  currentLocation: {
    latitude: "",
    longitude: "",
  },
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_WEATHER: {
      localStorage.setItem(
        "weather",
        JSON.stringify({ ...state, query: "", ...action.payload })
      );
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_CURRENT_LOCATION: {
      return { ...state, currentLocation: action.payload };
    }

    case CHANGE_CITY: {
      return {
        ...state,
        query: action.payload,
      };
    }

    default:
      return state;
  }
}
