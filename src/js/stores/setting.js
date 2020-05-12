import timerState, { changeFormat } from "./timer";
import { fetchUri } from "./quotes";
import weatherState, {fetchWeather} from "./weather";

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
    this.isChangeHourFormat = !this.isChangeHourFormat;
    timerState.isAmPmVisible = this.isChangeHourFormat ? true : false;
    let hour = new Date().getHours();
    hourElem.innerText = setting.isChangeHourFormat ? changeFormat(hour) : hour < 10 ? "0" + hour : hour;
    amPmElem.style.display = timerState.isAmPmVisible ? "block" : "none";
  }
}


// AddEventListener on setting-container div in html
settingDiv.addEventListener("click", (event) => {
  let target = event.target;
  console.log(target);

  //Click on the setting icon
  if (target.classList.contains("fa-cog")) {
    console.log("I m Working")
    setting.toggleCogOption()
  }

  // Click on the "On" button
  if (target.classList.contains("on") || target.id === "p-on") {
    console.log("I m Working")
    let onBtn = document.querySelector(".on");
    onBtn.style.cssText = "background-color: #05dfd7";
    setting.onOffbtn()
  }

  // Click on the  "Off" button
  if (target.classList.contains("off") || target.id === "p-off") {
    console.log("I m Working")
    let onBtn = document.querySelector(".on");
    onBtn.style.cssText = "background-color: #30475e";
    setting.onOffbtn()
  }

  // Click on the "show-quote" button 
  if (target.classList.contains(".show-quote") || target.id === "p-show-q") {
    console.log("I m Working")
    let showQuote = document.querySelector(".show-quote");
    showQuote.style.cssText = "background-color: #05dfd7";
    fetchUri()
  }

  // Click on the "hide-quote" button
  if (target.classList.contains("hide-quote") || target.id === "p-hide-q") {
    console.log("I m Working")
    quoteElem.innerText = "";
    let showQuote = document.querySelector(".show-quote");
    showQuote.style.cssText = "background-color: #30475e";
  }

  // AddEventListener on the "Twitter Username" form
  twitterForm.addEventListener("submit", (event) => {
    console.log("I m Working")
    event.preventDefault()
    let twitterUsername = target.value;
    setting.userNameLinks.twitter.username = twitterUsername;
    target.value = "";
    addLinkToFooter(setting.userNameLinks)
  })

  // AddEventListener on the "Linkedin Username" form
  linkedinForm.addEventListener("submit", (event) => {
    console.log("I m Working")
    event.preventDefault()
    let linkedinUsername = target.value;
    setting.userNameLinks.linkedin.username = linkedinUsername;
    target.value = "";
    addLinkToFooter(setting.userNameLinks)
  })

  // AddEventListener on the "Facebook Username" form
  facebookForm.addEventListener("submit", (event) => {
    console.log("I m Working")
    event.preventDefault()
    let facebookUsername = target.value;
    setting.userNameLinks.facebook.username = facebookUsername;
    target.value = "";
    addLinkToFooter(setting.userNameLinks)
  })

  // AddEventListener on the "GitHub Username" form
  gitHubForm.addEventListener("submit", (event) => {
    console.log("I m Working")
    event.preventDefault()
    let gitHubUsername = target.value;
    setting.userNameLinks.github.username = gitHubUsername;
    target.value = "";
    addLinkToFooter(setting.userNameLinks)
  
  })

  // AddEventListener on the "Change city form"
  cityForm.addEventListener("submit", (event) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    console.log("cityForm m Working")
    weatherState.query = target.value;
    console.log(weatherState.query)
    target.value = "";

    fetchWeather(weatherState.uri)
    // event.stopPropagation()
  })

})

function addLinkToFooter(linkObj) {
  let markUpString = "";
  for (let key in linkObj) {
    console.log(key)
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