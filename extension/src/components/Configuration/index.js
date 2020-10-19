import React from "react";
import { changeFormat } from "./timer";
import { fetchUri } from "./quotes";
import { fetchWeather } from "./weather";
import store from ".";

const timer = store.timer;
const setting = store.setting;
const weather = store.weather;

// Setting variables
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
const cityForm = document.querySelector(".city-form");

// Toggling when clicking on the setting button 
function toggleCogOption() {
  cogOption.style.display = !setting.isCogOptionVisible ? "grid" : "none";
  setting.isCogOptionVisible = !setting.isCogOptionVisible;
  localStorage.setItem("userSetting", JSON.stringify(setting));
}

// Changes 24Hr format to 12Hr format or vise-versa
function onOffbtn() {
  setting.isChangeHourFormat = !setting.isChangeHourFormat;
  localStorage.setItem("userSetting", JSON.stringify(setting));
  timer.isAmPmVisible = setting.isChangeHourFormat ? true : false;
  let hour = new Date().getHours();
  hourElem.innerText = setting.isChangeHourFormat ? changeFormat(hour) : hour < 10 ? "0" + hour : hour;
  timer.amPmElemDisplay = timer.isAmPmVisible ? "block" : "none";
  localStorage.setItem("userTimer", JSON.stringify(timer));
  amPmElem.style.display = timer.amPmElemDisplay;
}

export function changeSetting(target) {

  //Click on the setting icon
  if (target.classList.contains("fa-cog")) {
    toggleCogOption()
  }

  // Click on the "On" button
  if (target.classList.contains("on") || target.id === "p-on") {
    let onBtn = document.querySelector(".on");
    setting.changeHourFormatElem = onBtn;
    onBtn.style.cssText = `background-color: ${setting.onBtnColor}`;
    onOffbtn()
    localStorage.setItem("userSetting", JSON.stringify(setting));
  }

  // Click on the  "Off" button
  if (target.classList.contains("off") || target.id === "p-off") {
    let onBtn = document.querySelector(".on");
    onBtn.style.cssText = `background-color: ${setting.offBtnColor}`;
    onOffbtn()
    localStorage.setItem("userSetting", JSON.stringify(setting));
  }

  // Click on the "show-quote" button 
  if (target.classList.contains(".show-quote") || target.id === "p-show-q") {
    let showQuote = document.querySelector(".show-quote");
    setting.showQuoteElem = showQuote;
    localStorage.setItem("userSetting", JSON.stringify(setting));
    setting.showQuoteElem.style.cssText = `background-color: ${setting.onBtnColor}`;
    fetchUri()
  }

  // Click on the "hide-quote" button
  if (target.classList.contains("hide-quote") || target.id === "p-hide-q") {
    quoteElem.innerText = "";
    let showQuote = document.querySelector(".show-quote");
    setting.showQuoteElem = showQuote;
    setting.showQuoteElem.style.cssText = `background-color: ${setting.offBtnColor}`;
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
    weather.query = input.value;
    console.log(weather.query)
    input.value = "";
    localStorage.setItem("userWeather", JSON.stringify(weather))
    localStorage.setItem("userSetting", JSON.stringify(setting));
    fetchWeather(weather.uri)
  })
}

addLinkToFooter(setting.userNameLinks)

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

function Configuration() {
  return (
    <>
      <div className="setting-container">
        <div className="cog-option">
          {/* <!-- Left-side section --> */}
        </div>
        <section className="setting-opt">
          <h1>12 Hour Format</h1>
          <h1>Add Links</h1>
          <h1>Quotes</h1>
          <h1>Change City</h1>
        </section>

        {/* <!-- Right-side section --> */}
        <section className="change-setting">
          {/* <!-- Div for changing the time formate form 24Hr to 12Hr or vice-versa  --> */}
          <div className="change-hour-format">
            <div className="on-off-btn">
              <div className="off"><p id="p-off">OFF</p></div>
              <div className="on"><p id="p-on">ON</p></div>
            </div>
          </div>

          {/* <!-- Div for entering shortcut links --> */}
          <div className="shortcut-links">
            <form className="twitter-Username">
              <input type="text" placeholder="Twitter Username" />
            </form>
            <form className="linkedin-Username">
              <input type="text" placeholder="Linkedin Username" />
            </form>
            <form className="facebook-Username">
              <input type="text" placeholder="Facebook Username" />
            </form>
            <form className="git-hub-Username">
              <input type="text" placeholder="Github Username" />
            </form>
          </div>

          {/* <!-- On-Off div for the quotes --> */}
          <div className="on-off-quotes">
            <div className="show-quotes-btn">
              <div className="off hide-quote"><p id="p-hide-q">OFF</p></div>
              <div className="on show-quote"><p id="p-show-q">ON</p></div>
            </div>
          </div>

          {/* <!-- Form for changing the city --> */}
          <div className="change-city">
            <form className="city-form">
              <input type="text" className="city-input" placeholder="Enter City Name" />
            </form>
          </div>
        </section>
      </div>

      <div className="cog-btn">
        <i className="fas fa-cog" />
      </div>
    </>
  )
}