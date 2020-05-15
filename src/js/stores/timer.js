import store from ".";
let setting = store.setting;

const timerState = store.timer;
console.log(timerState)
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


// Function for taking new date
export const newDate = () => {
  timerState.statePoint = new Date();
  localStorage.setItem("userTimer", JSON.stringify(timerState));
}

// Function for changing the time format
export const changeFormat = (hour) => {
  timerState.amPm = hour > 11 ? "PM" : "AM";
  localStorage.setItem("userTimer", JSON.stringify(timerState));
  amPmElem.innerText = timerState.amPm;
  hour = hour >= 13 ? hour - 12 < 10 ? "0" + (hour - 12) : (hour - 12) : hour < 10 ? "0" + hour : hour;
  return hour;
}

// Function for setting time
export const setTime = (dateStr) => {
  let hour = String(dateStr).slice(16, 18);

  hourElem.innerText = setting.isChangeHourFormat ? changeFormat(Number(hour)) : String(dateStr).slice(16, 18);
  minuteElem.innerText = String(dateStr).slice(19, 21);
  secondElem.innerText = String(dateStr).slice(22, 24);
}

//Function for setting new date
export const setDate = (dateStr) => {
  dateElem.innerText = String(dateStr).slice(8, 10);
  yearElem.innerText = String(dateStr).slice(11, 15);
  monthElem.innerText = String(dateStr).slice(4, 7)
  dayElem.innerText = String(dateStr).slice(0, 3)
}
