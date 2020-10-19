/* eslint-disable no-duplicate-case */
/* eslint-disable no-lone-blocks */
import { createStore } from "redux";
import { CHANGE_DATE_AND_TIME, FETCH_CURRENT_LOCATION, GET_WALLPAPER, GET_CURRENT_WEATHER, GET_QUOTES, ADD_TODO, COMPLETE_TODO, DELETE_TODO, EDIT_TODO, } from "./actionTypes";

const initialState = {
  weatherState: {
    "accessKey": "c3ac998f040786cd10514604dc002d0e",
    "baseUrl": "http://api.openweathermap.org/data/2.5/weather?",
    "query": "",
    "currentTemp": "",
    "weather": "",
    "icon": "",
    "cityName": ""
  },

  currentLocation: {
    latitude: "",
    longitude: ""
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
      second: ""
    }
  },

  background: {
    url: ""
  },

  quoteState: {
    quoteUri: "http://quotes.rest/qod.json?category=inspire",
    quote: ""
  },

  todos: {
    todoArr: localStorage.hasOwnProperty("userTodos") ? JSON.parse(localStorage.getItem("userTodos")).todoArr : [],
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {

    case CHANGE_DATE_AND_TIME: {
      return { ...state, clock: action.payload }
    }

    case FETCH_CURRENT_LOCATION: {
      return { ...state, currentLocation: action.payload }
    }

    case GET_WALLPAPER: {
      return { ...state, background: action.payload }
    }

    case GET_CURRENT_WEATHER: {
      return { ...state, weatherState: { ...state.weatherState, ...action.payload } }
    }

    case GET_QUOTES: {
      return { ...state, quoteState: { ...state.quoteState, quote: action.payload } }
    }

    case ADD_TODO: {
      const { payload } = action;

      const newTodo = {
        value: payload.todo,
        isCompleted: false,
        id: Date.now()
      };
      localStorage.setItem("userTodos", JSON.stringify({ todoArr: [...state.todos.todoArr, newTodo] }));

      return { ...state, todos: { ...state.todos, todoArr: [...state.todos.todoArr, newTodo] } };
    }

    case COMPLETE_TODO: {
      const todoArr = state.todos.todoArr.map(item => {
        return item.id !== action.payload.id ? item : {
          value: item.value,
          id: item.id,
          isCompleted: !item.isCompleted
        }
      })

      localStorage.setItem("userTodos", JSON.stringify({ todoArr }));
      return { ...state, todos: { ...state.todos, todoArr } };
    }

    case DELETE_TODO: {
      const newArr = state.todos.todoArr.filter(item => item.id !== action.payload.id)

      localStorage.setItem("userTodos", JSON.stringify({ todoArr: newArr }));
      console.log(newArr)
      return { ...state, todos: { ...state.todos, todoArr: newArr } };
    }

    case EDIT_TODO: {
      const newArr = [...state.todos.todoArr].map((el) => {
        if (el.id === action.payload.id) {
          return {
            value: action.payload.newValue,
            id: action.payload.id,
            isCompleted: el.isCompleted
          }
        }
        return el
      })

      localStorage.setItem("userTodos", JSON.stringify({ todoArr: newArr }));
      return { ...state, todos: { ...state.todos, todoArr: newArr } }
    }

    default: return state;
  }
}

export const store = createStore(reducer);