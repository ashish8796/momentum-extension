import { InputHandler } from "./../utils";
const todoList = document.querySelector(".todo-list");

const state = {
  todos: [],
  currentActiveTodo: null,
  lastActiveTodo: null,
}

export const setTodoForOptions = (current, last) => {
  state.currentActiveTodo = current;
  state.lastActiveTodo = last;
}

export const pushTodo = (todo) => {
  state.todos.push(todo);
}

export const generateTodoMarkUp = (el) => {
  el.innerHTML = "";
  let markupString = state.todos.map(todo => {
    return `
      <div class="todo" id="t-${todo.id}" data-id="t-${todo.id}">
        <section class="section-1">
          <input type="checkbox">
          <p data-id="t-${todo.id}">${todo.value}</p>
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

export const toggleOption = (element) => {

  if (element.classList.contains("hide")) {
    element.classList.remove("hide")
  }
  else {
    element.classList.add("hide")
  }
}

export const deletTodo = (todoId) => {
  state.todos = state.todos.filter(todo => "t-"+todo.id != todoId)
}

export const editTodo = (todoId) => {
  let hidePTag = document.querySelector(`#${todoId}>.section-1>p`);
  hidePTag.style.display = "none";

  let editValue = document.querySelector(`#${todoId}>.section-1>.edit-todo`);
  editValue.style.display = "block";
  new InputHandler(editValue, (newValue) => {
    state.todos.forEach(todo => {
      if ("t-" + todo.id == todoId) {
        todo.value = newValue;
      }
    })
    editValue.style.display = "none";
    generateTodoMarkUp(todoList);
  })
}
export default state;