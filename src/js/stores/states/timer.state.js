const timerState = localStorage.hasOwnProperty("userTimer") ? JSON.parse(localStorage.getItem("userTimer")) : {
  el: null,
  statePoint: '',
  isAmPmVisible: false,
  amPm: "",
  amPmElemDisplay: "none",
}

export default timerState;