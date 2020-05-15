let settingState = localStorage.hasOwnProperty("userSetting") ? JSON.parse(localStorage.getItem("userSetting")) : {
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
  }
}

export default settingState