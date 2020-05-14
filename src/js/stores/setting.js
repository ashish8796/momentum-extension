import timerState, { changeFormat } from "./timer";
import { fetchUri } from "./quotes";
import weatherState, { fetchWeather } from "./weather";

// Setting variables
const settingDiv = document.querySelector(".setting-container");
const cogOption = document.querySelector(".cog-option");


// Time Variable
const hourElem = document.querySelector(".hour");
const amPmElem = document.querySelector(".am-pm");

// Links related variable
const twitterForm = document.querySelector(".twitter-Username");
const linkedinForm = document.querySelector(".linkedin-Username");
const facebookForm = document.querySelector(".facebook-Username");
const gitHubForm = document.querySelector(".git-hub-Username");

// Footer varibale
const navElem = document.querySelector("nav");

// Quote variable
const quoteElem = document.querySelector(".quote");

// weather variables
const weatherElem = document.querySelector(".weather");
const cityForm = document.querySelector(".city-form");


// Declaring an object named as Setting
let setting = {
  isCogOptionVisible: false,
  isChangeHourFormat: false,
  onBtnColor: "#05dfd7",
  offBtnColor: "#30475e",
  changeHourFormatElem: null,
  showQuoteElem: null,

  userNameLinks: {
    "twitter": { username: "", iconClass: "fab fa-twitter" },
    "facebook": { username: "", iconClass: "fab fa-facebook-f" },
    "linkedin": { username: "", iconClass: "fab fa-linkedin-in" },
    "github": { username: "", iconClass: "fab fa-github" }
  },

  // Toggling when clicking on the setting button 
  toggleCogOption() {
    cogOption.style.display = !this.isCogOptionVisible ? "grid" : "none";
    this.isCogOptionVisible = !this.isCogOptionVisible;
  },


  // Changes 24Hr format to 12Hr format or vise-versa
  onOffbtn() {
    this.changeHourFormatElem.style.cssText = `background-color: ${this.changeHourFormatElem.classList.contains("on") ? this.onBtnColor : this.offBtnColor}`;
    this.isChangeHourFormat = !this.isChangeHourFormat;
    timerState.isAmPmVisible = this.isChangeHourFormat ? true : false;
    let hour = new Date().getHours();
    hourElem.innerText = setting.isChangeHourFormat ? changeFormat(hour) : hour < 10 ? "0" + hour : hour;
    amPmElem.style.display = timerState.isAmPmVisible ? "block" : "none";
  }
}

// LocalStorage for getting the setting
localStorage.setItem("userSetting", JSON.stringify(setting));

// AddEventListener on setting-container div in html
settingDiv.addEventListener("click", (event) => {
  let target = event.target;
  console.log(target);

  //Click on the setting icon
  if (target.classList.contains("fa-cog")) {
    setting.toggleCogOption()
    localStorage.setItem("userSetting", JSON.stringify(setting));
    console.log(setting)
  }

  // Click on the "On" button
  if (target.classList.contains("on") || target.id === "p-on") {
    setting.onBtnColor = "#05dfd7";
    let onBtn = document.querySelector(".on");
    setting.changeHourFormatElem = onBtn;
    setting.onOffbtn()
    localStorage.setItem("userSetting", JSON.stringify(setting));
    console.log(setting)
  }

  // Click on the  "Off" button
  if (target.classList.contains("off") || target.id === "p-off") {
    setting.onBtnColor = "#30475e";
    setting.onOffbtn()
    localStorage.setItem("userSetting", JSON.stringify(setting));
    console.log(setting)
  }

  // Click on the "show-quote" button 
  if (target.classList.contains(".show-quote") || target.id === "p-show-q") {
    let showQuote = document.querySelector(".show-quote");
    setting.showQuoteElem = showQuote;
    setting.showQuoteElem.style.cssText = "background-color: #05dfd7";
    fetchUri()
  }

  // Click on the "hide-quote" button
  if (target.classList.contains("hide-quote") || target.id === "p-hide-q") {
    quoteElem.innerText = "";
    let showQuote = document.querySelector(".show-quote");
    showQuote.style.cssText = "background-color: #30475e";
  }

  // AddEventListener on the "Twitter Username" form
  twitterForm.addEventListener("submit", (event) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    let input = document.querySelector(".twitter-Username > input");
    let twitterUsername = input.value;
    setting.userNameLinks.twitter.username = twitterUsername;
    input.value = "";
    addLinkToFooter(setting.userNameLinks)
    localStorage.setItem("userSetting", JSON.stringify(setting));
  })

  // AddEventListener on the "Linkedin Username" form
  linkedinForm.addEventListener("submit", (event) => {

    event.preventDefault()
    event.stopImmediatePropagation()
    let input = document.querySelector(".linkedin-Username > input");
    let linkedinUsername = input.value;
    setting.userNameLinks.linkedin.username = linkedinUsername;
    input.value = "";
    addLinkToFooter(setting.userNameLinks)
    localStorage.setItem("userSetting", JSON.stringify(setting));
  })

  // AddEventListener on the "Facebook Username" form
  facebookForm.addEventListener("submit", (event) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    let input = document.querySelector(".facebook-Username > input");
    let facebookUsername = input.value;
    setting.userNameLinks.facebook.username = facebookUsername;
    input.value = "";
    addLinkToFooter(setting.userNameLinks)
    localStorage.setItem("userSetting", JSON.stringify(setting));
  })

  // AddEventListener on the "GitHub Username" form
  gitHubForm.addEventListener("submit", (event) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    let input = document.querySelector(".git-hub-Username > input");
    let gitHubUsername = input.value;
    input.value = "";
    setting.userNameLinks.github.username = gitHubUsername;
    addLinkToFooter(setting.userNameLinks)
    localStorage.setItem("userSetting", JSON.stringify(setting));

  })

  // AddEventListener on the "Change city form"
  cityForm.addEventListener("submit", (event) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    let input = document.querySelector(".city-form > input");
    weatherState.query = input.value;
    input.value = "";
    localStorage.setItem("userSetting", JSON.stringify(setting));
    fetchWeather(weatherState.uri)
  })

})

function addLinkToFooter(linkObj) {
  let markUpString = "";
  for (let key in linkObj) {
    // console.log(key)
    let username = linkObj[key].username;
    if (username) {
      let liElem = `<li>
      <a href="https://www.${key}.com/${key === "linkedin" ? "in/" + username : username}" target="_blank"
        ><i class="fab ${linkObj[key].iconClass}"></i
      ></a>
    </li>`
      markUpString += liElem
    }
  }
  navElem.innerHTML = "";
  navElem.innerHTML = markUpString;
}


export default setting;