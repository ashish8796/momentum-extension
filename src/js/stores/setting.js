// Setting variables
const settingDiv = document.querySelector(".setting-container");
const cogIcon = document.querySelector(".fa-cog");
const cogOption = document.querySelector(".cog-option");
const hourFormat = document.querySelector(".hour-format");


let cogOptionVisible = false;

// Declaring an object named as Setting
let setting = {

  toggleCogOption () {
    if(!cogOptionVisible) {
      cogOption.style.display = "block";
      cogOptionVisible = true;
    }
    else {
      cogOption.style.display = "none";
      cogOptionVisible = false;
    }
  }
}

// AddEventListener on setting-container div in html
settingDiv.addEventListener("click", (event) => {
  target = event.target;
  console.log(target);

  if(target.classList.contains("fa-cog")) {
    setting.toggleCogOption()
  }

  if(target.classList.contains("change-hour-btn")) {

  }


})


