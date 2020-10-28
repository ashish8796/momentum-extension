import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import clockReducer from "./clockReducer";
import settingsReducer from "./settingsReducer";
import pomodoroReducer from "./pomodoroReducer";
import quoteReducer from "./quoteReducer";
import wallwaperReducer from "./wallwaperReducer";
import weatherReducer from "./weatherReducer";

export default combineReducers({
  todos: todosReducer,
  clock: clockReducer,
  settings: settingsReducer,
  pomodoro: pomodoroReducer,
  quoteState: quoteReducer,
  background: wallwaperReducer,
  weatherState: weatherReducer,
});
