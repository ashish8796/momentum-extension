/* eslint-disable no-duplicate-case */
/* eslint-disable no-lone-blocks */
import { createStore } from "redux";
import {
  CHANGE_DATE_AND_TIME,
  FETCH_CURRENT_LOCATION,
  GET_WALLPAPER,
  GET_CURRENT_WEATHER,
  GET_QUOTES,
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO,
  ADD_LINK_TO_FOOTER,
  CHANGE_CITY,
  TOGGLE_QUOTE,
  CHANGE_FORMAT,
  START_POMODORO,
  CHANGE_POMODORO_TIME,
} from "./actionTypes";

// TODO:
// Break main reducer to small reducers

const initialState = {
  weatherState: localStorage.hasOwnProperty("weather")
    ? JSON.parse(localStorage.getItem("weather"))
    : {
        query: "",
        currentTemp: "",
        weather: "",
        icon: "",
        cityName: "",
      },

  currentLocation: {
    latitude: "",
    longitude: "",
  },

  clock: {
    date: {
      dateNum: "",
      day: "",
      month: "",
      year: "",
    },
    time: {
      hour: "",
      minute: "",
      second: "",
      amPm: "",
    },
  },

  background: {
    url: "",
  },

  quoteState: {
    quoteUri: "http://quotes.rest/qod.json?category=inspire",
    quote: "",
    showQuote: localStorage.hasOwnProperty("showQuote")
      ? JSON.parse(localStorage.getItem("showQuote"))
      : true,
  },

  todos: {
    todoArr: localStorage.hasOwnProperty("userTodos")
      ? JSON.parse(localStorage.getItem("userTodos")).todoArr
      : [],
  },

  settings: localStorage.hasOwnProperty("settings")
    ? JSON.parse(localStorage.getItem("settings"))
    : {
        linkObj: {},
        format: false,
      },

  pomodoro: localStorage.hasOwnProperty("pomodoro")
    ? JSON.parse(localStorage.getItem("pomodoro"))
    : {
        pomoMinute: "05",
        pomoSecond: "00",
        pomoStart: false,
      },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE_AND_TIME: {
      return { ...state, clock: action.payload };
    }

    case FETCH_CURRENT_LOCATION: {
      return { ...state, currentLocation: action.payload };
    }

    case GET_WALLPAPER: {
      return { ...state, background: action.payload };
    }

    case GET_CURRENT_WEATHER: {
      localStorage.setItem(
        "weather",
        JSON.stringify({ ...state.weatherState, query: "", ...action.payload })
      );
      return {
        ...state,
        weatherState: { ...state.weatherState, ...action.payload },
      };
    }

    case GET_QUOTES: {
      return {
        ...state,
        quoteState: { ...state.quoteState, quote: action.payload },
      };
    }

    case ADD_TODO: {
      const { payload } = action;

      const newTodo = {
        value: payload.todo,
        isCompleted: false,
        id: Date.now(),
      };
      localStorage.setItem(
        "userTodos",
        JSON.stringify({ todoArr: [...state.todos.todoArr, newTodo] })
      );

      return {
        ...state,
        todos: { ...state.todos, todoArr: [...state.todos.todoArr, newTodo] },
      };
    }

    case COMPLETE_TODO: {
      const todoArr = state.todos.todoArr.map((item) => {
        return item.id !== action.payload.id
          ? item
          : {
              value: item.value,
              id: item.id,
              isCompleted: !item.isCompleted,
            };
      });

      localStorage.setItem("userTodos", JSON.stringify({ todoArr }));
      return { ...state, todos: { ...state.todos, todoArr } };
    }

    case DELETE_TODO: {
      const newArr = state.todos.todoArr.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem("userTodos", JSON.stringify({ todoArr: newArr }));
      // console.log(newArr);
      return { ...state, todos: { ...state.todos, todoArr: newArr } };
    }

    case EDIT_TODO: {
      const newArr = [...state.todos.todoArr].map((el) => {
        if (el.id === action.payload.id) {
          return {
            value: action.payload.newValue,
            id: action.payload.id,
            isCompleted: el.isCompleted,
          };
        }
        return el;
      });

      localStorage.setItem("userTodos", JSON.stringify({ todoArr: newArr }));
      return { ...state, todos: { ...state.todos, todoArr: newArr } };
    }

    case ADD_LINK_TO_FOOTER: {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          ...state.settings,
          linkObj: {
            ...state.settings.linkObj,
            [action.payload.siteName]: action.payload,
          },
        })
      );
      return {
        ...state,
        settings: {
          ...state.settings,
          linkObj: {
            ...state.settings.linkObj,
            [action.payload.siteName]: action.payload,
          },
        },
      };
    }

    case CHANGE_CITY: {
      return {
        ...state,
        weatherState: { ...state.weatherState, query: action.payload },
      };
    }

    case TOGGLE_QUOTE: {
      localStorage.setItem("showQuote", JSON.stringify(action.payload));
      return {
        ...state,
        quoteState: { ...state.quoteState, showQuote: action.payload },
      };
    }

    case CHANGE_FORMAT: {
      localStorage.setItem(
        "settings",
        JSON.stringify({ ...state.settings, format: action.payload })
      );
      return {
        ...state,
        settings: { ...state.settings, format: action.payload },
      };
    }

    case START_POMODORO: {
      localStorage.setItem(
        "pomodoro",
        JSON.stringify({ ...state.pomodoro, pomoStart: action.payload })
      );
      return {
        ...state,
        pomodoro: { ...state.pomodoro, pomoStart: action.payload },
      };
    }

    case CHANGE_POMODORO_TIME: {
      // console.log(action.payload);
      localStorage.setItem(
        "pomodoro",
        JSON.stringify({ ...state.pomodoro, ...action.payload })
      );
      return {
        ...state,
        pomodoro: { ...state.pomodoro, ...action.payload },
      };
    }

    default:
      return state;
  }
}

export const store = createStore(reducer);
