import "./scss/reset.scss";
import "./scss/index.scss";
import "./js/stores/fetch";

import state, { setTodoForOptions, generateTodoMarkUp, pushTodo, toggleOption, deletTodo, editTodo } from "./js/stores/todos";

//Todos variable
let newToDo = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
let startTodo = document.querySelector(".start-todo");

newToDo.addEventListener("change", (event) => {
  startTodo.style.display = "none";
  todoList.style.cssText = "margin-top: 6em;"

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

todoList.addEventListener("click", (event) => {
  let target = event.target;
  let targetId = target.dataset.id;

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
    editTodo(targetId)
  }

  if (target.classList.contains("delet")) {
    state.currentActiveTodo = null;
    deletTodo(targetId)
    generateTodoMarkUp(todoList)
  }
})