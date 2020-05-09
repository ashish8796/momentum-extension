// Time related variables
// const timerDiv = document.querySelector(".timer");
// const hour12Div = document.querySelector(".hour12-time");
// const timeDiv = document.querySelector(".time");
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
  statePoint: ''
}

// Function for taking new date
const newDate = () => {
  timerState.statePoint = new Date();
}

// Function for making doble digit value
const makeDoubleDigit = (array) => {
  array.forEach((value,index) => {
      array[index] = value < 10 ? "0" + value : value;
    })

  return array;
}

// Function for changing the time format
const changeFormat = (hour) => {
  if (Number(hour) > 13) {
    hour = hour - 12;
    hour = hour < 10 ? "0" + hour : hour;
  }
  return hour;
}

// Function for setting time
const setTime = (dateStr) => {
  let [hour, minutes, seconds] = makeDoubleDigit([dateStr.getHours(), dateStr.getMinutes(), dateStr.getSeconds()])
  hourElem.innerText = true ? changeFormat(hour) : hour;
  minuteElem.innerText = minutes;
  secondElem.innerText = seconds;
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