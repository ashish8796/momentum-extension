import timerState,{changeFormat} from "./timer";

// Setting variables
const settingDiv = document.querySelector(".setting-container");
const cogIcon = document.querySelector(".fa-cog");
const cogOption = document.querySelector(".cog-option");
const hourFormat = document.querySelector(".hour-format");

// Time Variable
const hourElem = document.querySelector(".hour");
const amPmElem = document.querySelector(".am-pm");


// Declaring an object named as Setting
let setting = {
  isCogOptionVisible: false,
  isChangeHourFormat: false,

  toggleCogOption () {
    cogOption.style.display = !this.isCogOptionVisible ? "block" : "none";
    this.isCogOptionVisible = !this.isCogOptionVisible;
  }
}

// AddEventListener on setting-container div in html
settingDiv.addEventListener("click", (event) => {
  let target = event.target;
  console.log(target);

  if(target.classList.contains("fa-cog")) {
    setting.toggleCogOption()
  }

  if(target.classList.contains("change-format-btn")) {
    hourFormat.innerText = hourFormat.innerText == 12 ? 24 : 12;
    setting.isChangeHourFormat = !setting.isChangeHourFormat;
    timerState.isAmPmVisible = setting.isChangeHourFormat ? true : false;
    console.log("ampmVisible: " + timerState.isAmPmVisible);
    let hour = new Date().getHours();
    hourElem.innerText = setting.isChangeHourFormat ? changeFormat(hour) : hour < 10 ? "0" + hour : hour;
    amPmElem.style.display = timerState.isAmPmVisible ? "block" : "none";
  }
})


export default setting;