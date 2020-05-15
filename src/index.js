// Importing scss file
import "./scss/index.scss";

// Importing stor from index.js in stores
import store from "./js/stores";

const timer = store.timer;
const setting = store.setting;
const weather = store.weather;
const state = store.todos;

// Importing different js files
import "./js/stores/fetch";
import { setTodoForOptions, generateTodoMarkUp, pushTodo, toggleOption, deletTodo, editTodo, completTodo } from "./js/stores/todos";
import { changeSetting } from "./js/stores/setting";
import { newDate, setDate, setTime } from "./js/stores/timer";
import { getCurrentWeather } from "./js/stores/weather";



//Todos variable
let todosDiv = document.querySelector(".todos");
let newToDo = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
let hint = document.querySelector(".hint");
const dropDown = document.querySelector(".drop-down");
const overlay = document.querySelector(".overlay");
const startTodo = document.querySelector(".start-todo");
const startBtn = document.querySelector(".start-btn");

// Setting variable
const settingDiv = document.querySelector(".setting-container");
const cogOption = document.querySelector(".cog-option");

// Timer Variable
const amPmElem = document.querySelector(".am-pm");

// Weather Variable
const weatherElem = document.querySelector(".weather");

// Add New todo here
newToDo.addEventListener("change", (event) => {
  let value = newToDo.value;
  let obj = {
    value: value,
    id: Date.now(),
    isCompleted: false
  }

  pushTodo(obj)
  newToDo.value = "";

  generateTodoMarkUp(todoList);
})

let toggleElement;
let dropDownVisible = false;

function initTodo() {
  hint.style.display = state.todos.length > 0 ? "none" : "block";
  startBtn.style.display = state.todos.length > 0 ? "none" : "block";
  dropDown.style.display = state.todos.length > 0 ? "block" : "none";
  newToDo.style.display = state.todos.length > 0 ? "block" : "none";
}
// Eventlistener on overlay to display "hind" and "start-btn"
overlay.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay")) {
    initTodo()
    newToDo.focus()
    toggleOption(toggleElement)
  }
})

if (localStorage.hasOwnProperty("userTodos")) {
  if (state.todos.length > 0) {
    initTodo()
  }
  state.isSelectVisible = false;
  localStorage.setItem("userTodos", JSON.stringify(state));
  generateTodoMarkUp(todoList)
}
// Eventlistener on the Todos div
todosDiv.addEventListener("click", (event) => {
  let target = event.target;
  let targetId = target.dataset.id;
  toggleElement = document.querySelector(`#${state.currentActiveTodo}>.section-2>.select`);

  if (target.classList.contains("start-btn")) {
    hint.style.display = "none";
    startBtn.style.display = "none";
    dropDown.style.display = "block";
    newToDo.style.display = "block";
    newToDo.focus()
  }


  if (target.classList.contains("button")) {
    setTodoForOptions(targetId, state.currentActiveTodo);
    if (targetId !== state.lastActiveTodo) {
      if (state.lastActiveTodo) {
        let lastElement = document.querySelector(`#${state.lastActiveTodo}>.section-2>.select`);
        lastElement.classList.add("hide");
      }
    }
    toggleElement = document.querySelector(`#${state.currentActiveTodo}>.section-2>.select`);
    toggleOption(toggleElement);
  }

  if (target.classList.contains("edit")) {
    toggleOption(toggleElement)
    state.isSelectVisible = false;
    localStorage.setItem("userTodos", JSON.stringify(state));
    editTodo(targetId)
  }

  if (target.classList.contains("delet")) {
    state.currentActiveTodo = null;
    localStorage.setItem("userTodos", JSON.stringify(state));
    deletTodo(targetId)
    initTodo()
    generateTodoMarkUp(todoList)

  }

  if (target.classList.contains("ckbox")) {
    completTodo(target, targetId);
    if (state.isSelectVisible) {
      toggleOption(toggleElement);
      state.isSelectVisible = false;
      localStorage.setItem("userTodos", JSON.stringify(state));
    }
  }

  if (target.classList.contains("inbox-down-arrow") || target.classList.contains("inbox") || target.classList.contains("icon") || target.classList.contains("fa-caret-down")) {
    if (state.isSelectVisible) {
      toggleOption(toggleElement);
      state.isSelectVisible = false;
      localStorage.setItem("userTodos", JSON.stringify(state));
    }
    toggleDropDown();
  }

  if (target.id == "active") {
    if (state.isSelectVisible) {
      toggleOption(toggleElement);
      state.isSelectVisible = false;
      localStorage.setItem("userTodos", JSON.stringify(state));
    }
    toggleDropDown();
    let array = state.todos.filter(todo => todo.isCompleted == false);
    generateRequiredMarkUp(array, todoList);
  }

  if (target.id == "completed") {
    if (state.isSelectVisible) {
      toggleOption(toggleElement);
      state.isSelectVisible = false;
      localStorage.setItem("userTodos", JSON.stringify(state));
    }
    toggleDropDown();
    let array = state.todos.filter(todo => todo.isCompleted == true);
    generateRequiredMarkUp(array, todoList);
  }

  if (target.id == "all") {
    if (state.isSelectVisible) {
      toggleOption(toggleElement);
      state.isSelectVisible = false;
      localStorage.setItem("userTodos", JSON.stringify(state));
    }
    toggleDropDown();
    generateTodoMarkUp(todoList);
  }
})

// toggleing the drop-down class in html
const toggleDropDown = () => {
  if (!dropDownVisible) {
    dropDown.children[1].style.display = "flex";
    dropDownVisible = !dropDownVisible;
  }
  else {
    dropDown.children[1].style.display = "none";
    dropDownVisible = !dropDownVisible;
  }
}

// Setting functionality
if (setting.isCogOptionVisible) {
  cogOption.style.display = "grid";
}
if (timer.isAmPmVisible) {
  cogOption.style.display = "grid";
  let onBtn = document.querySelector(".on");
  onBtn.style.cssText = `background-color: ${setting.onBtnColor}`;
  cogOption.style.display = setting.isCogOptionVisible ? "grid" : "none";
}

settingDiv.addEventListener("click", (event) => {
  let target = event.target;
  changeSetting(target)
})

// Timer functionality
amPmElem.style.display = timer.amPmElemDisplay;
if (timer.isAmPmVisible) {
  amPmElem.innerText = timer.amPm
}
newDate()
let dateString = timer.statePoint

setTime(dateString)
setDate(dateString)

setInterval(() => {
  newDate()
  dateString = timer.statePoint
  setTime(dateString)
  setDate(dateString)
}, 1000)

// Weather functionality
if (localStorage.hasOwnProperty("userWeather")) {
  weatherElem.innerHTML = weather.wetherMarkup;
}
else {
  getCurrentWeather()
}

const generateRequiredMarkUp = (array, el) => {
  el.innerHTML = "";
  let markupString = array.map(todo => {
    return `
      <div class="todo" id="t-${todo.id}" data-id="t-${todo.id}">
        <section class="section-1">
          <input type="checkbox" class="ckbox" data-id="t-${todo.id}" ${todo.isCompleted && "checked"}>
            <p data-id="t-${todo.id}" style="text-decoration:  ${todo.isCompleted && 'line-through'};">${todo.value}</p>
          <input type="text" value="${todo.value}" class="edit-todo" data-id="t-${todo.id}">
        </section>
        <section class="section-2" data-id="t-${todo.id}">
          <div class="select hide" data-id="t-${todo.id}">
            <button class="edit" data-id="t-${todo.id}">Edit</button>
            <button class="delet" data-id="t-${todo.id}">Delet</button>
          </div>
          <div class="option">
            <p>...</p>
            <button class="button" data-id="t-${todo.id}"></button>
          </div>
        </section>
        
      </div>
      `
  }).join("")
  el.innerHTML = markupString;
}