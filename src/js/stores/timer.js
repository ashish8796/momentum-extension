import setting from "./setting";

// Time related variables
let hourElem = document.querySelector(".hour")
let minuteElem = document.querySelector(".minute");
let secondElem = document.querySelector(".second");
let amPmElem = document.querySelector(".am-pm");

//Date related variables
let dateElem = document.querySelector(".date");
let monthElem = document.querySelector(".month");
let yearElem = document.querySelector(".year");
let dayElem = document.querySelector(".day");


amPmElem.style.display = "none";

const timerState = {
  el: null,
  statePoint: '',
  isAmPmVisible: false
}

// Function for taking new date
const newDate = () => {
  timerState.statePoint = new Date();
}

// Function for changing the time format
export const changeFormat = (hour) => {
  amPmElem.innerText = hour > 11 ? "PM" : "AM";
  hour = hour > 13 ? hour < 10 ? "0" + hour : hour : "0" + hour;
  return hour;
}

// Function for setting time
const setTime = (dateStr) => {
  let hour = String(dateStr).slice(16, 18);

  hourElem.innerText = setting.isChangeHourFormat ? changeFormat(Number(hour)) : String(dateStr).slice(16, 18);
  minuteElem.innerText = String(dateStr).slice(19, 21);
  secondElem.innerText = String(dateStr).slice(22, 24);
}

//Function for setting new date
const setDate = (dateStr) => {
  dateElem.innerText = String(dateStr).slice(8, 10);
  yearElem.innerText = String(dateStr).slice(11, 15);
  monthElem.innerText = String(dateStr).slice(4, 7)
  dayElem.innerText = String(dateStr).slice(0, 3)
}

//Taking new date
newDate()

let dateString = timerState.statePoint
setTime(dateString)
setDate(dateString)

//Time interval for updating every value after every second
setInterval(() => {
  newDate()
  dateString = timerState.statePoint
  setTime(dateString)
  setDate(dateString)
}, 1000)


export default timerState