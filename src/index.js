// Importing scss file
import "./scss/index.scss";


// Importing different js files
import "./js/stores/fetch";
import "./js/stores/quotes";
import "./js/stores/weather";

// importing different function from todos.js file
import state, { setTodoForOptions, generateTodoMarkUp, pushTodo, toggleOption, deletTodo, editTodo, completTodo, selectVisible } from "./js/stores/todos";

// Importing TimerState object from timer.js file
import timerState from "./js/stores/timer";

// Importing setting.js file
import "./js/stores/setting";

//Todos variable
let todosDiv = document.querySelector(".todos");
let newToDo = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
let hint = document.querySelector(".hint");
const dropDown = document.querySelector(".drop-down");


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

// Eventlistener on the Todos div
todosDiv.addEventListener("click", (event) => {
  let target = event.target;
  let targetId = target.dataset.id;
  toggleElement = document.querySelector(`#${state.currentActiveTodo}>.section-2>.select`);


  if (target.classList.contains("start-btn")) {
    hint.style.display = "none";
    target.style.display = "none";
    dropDown.style.cssText = "display: block"
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
    selectVisible.visible = false;
    editTodo(targetId)
  }

  if (target.classList.contains("delet")) {
    state.currentActiveTodo = null;
    deletTodo(targetId)
    generateTodoMarkUp(todoList)
  }

  if (target.classList.contains("ckbox")) {
    completTodo(target, targetId);
    if (selectVisible.visible) {
      toggleOption(toggleElement);
      selectVisible.visible = false;
    }
  }

  if (target.classList.contains("inbox-down-arrow") || target.classList.contains("inbox") || target.classList.contains("icon") || target.classList.contains("fa-caret-down")) {
    if (selectVisible.visible) {
      toggleOption(toggleElement);
      selectVisible.visible = false;
    }
    toggleDropDown();
  }

  if (target.id == "active") {
    if (selectVisible.visible) {
      toggleOption(toggleElement);
      selectVisible.visible = false;
    }
    toggleDropDown();
    let array = state.todos.filter(todo => todo.isCompleted == false);
    generateRequiredMarkUp(array, todoList);
  }

  if (target.id == "completed") {
    if (selectVisible.visible) {
      toggleOption(toggleElement);
      selectVisible.visible = false;
    }
    toggleDropDown();
    let array = state.todos.filter(todo => todo.isCompleted == true);
    generateRequiredMarkUp(array, todoList);
  }

  if (target.id == "all") {
    if (selectVisible.visible) {
      toggleOption(toggleElement);
      selectVisible.visible = false;
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