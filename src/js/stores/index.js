// import settingState from"./setting";
import weatherState from "./states/weather.state";
import todoState from './todos';
import quoteState from "./quotes";
import timerState from "./states/timer.state";
import settingState from "./states/settings.state";

export default {
  setting: settingState,
  timer: timerState,
  weather: weatherState,
  quote: quoteState,
  todos: todoState,
};