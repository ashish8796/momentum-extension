import "./scss/reset.scss";

import "./scss/index.scss";

let wrapper = document.querySelector(".wrapper");

//Todos variable
let todosDiv = document.querySelector(".todos");
let newToDo = document.querySelector(".new-todo");
let todoList = document.querySelector(".todo-list");
let startTodo = document.querySelector(".start-todo");
// let select = document.querySelector(".select");

let accessKey = "MQ5C-bR-XwJfxJWu5arGKUYGbNp35eojUf1pKyLHGQc";
let api = "https://api.unsplash.com/photos/random/?client_id=";

let uri = api + accessKey;

fetchUri(uri)

function fetchUri(uri) {
  fetch(uri)
    .then(response => response.json())
    .then(data => {
      let image = data;
      console.log(image)
      let img = document.createElement("img");
      img.setAttribute("src", `${image.urls.regular}`)
      wrapper.style.cssText = `background-image: url(${image.urls.regular})`;
    })
}

let todos = {
  todoArr: [],

  push(obj) {
    this.todoArr.push(obj)
  },

  generateTodoMarkUp(array) {
    todoList.innerHTML = "";
    let markupString = this.todoArr.map(todo => {
      return `
      <div class="todo" data-id="${todo.id}">
        <section class="section-1">
          <input type="checkbox">
          <p data-id="${todo.id}">${todo.value}</p>
          <input type="text" value="${todo.value}" class="edit-todo" data-id="${todo.id}">
        </section>
        <section class="section-2" data-id="${todo.id}">
          <div class="select hide" data-id="${todo.id}">
            <button class="edit" data-id="${todo.id}">Edit</button>
            <button class="delet" data-id="${todo.id}">Delet</button>
          </div>
          <div class="option">
            <p>...</p>
            <button class="button" data-id="${todo.id}"></button>
          </div>
        </section>
        
      </div>
      `
    }).join("")
    todoList.innerHTML = markupString;
  },

  toggleOption(element) {

    if (element.classList.contains("hide")) {
      element.classList.remove("hide")
    }
    else {
      element.classList.add("hide")
    }
  },

  deletTodo(todoId) {
    this.todoArr = this.todoArr.filter(todo => todo.id != todoId)
    this.generateTodoMarkUp(this.todoArr)
  },

  editTodo(todoId) {
    let pTags = document.querySelectorAll(".section-1>p")
    let pTag = Array.from(pTags).find(p => p.dataset.id == todoId);

    pTag.style.display = "none";

    let inputTags = document.querySelectorAll(".section-1>.edit-todo")
    let editPTag = Array.from(inputTags).find(input => input.dataset.id == todoId)
    editPTag.style.display = "block";

    editPTag.addEventListener("change", (event) => {
      let newValue = editPTag.value;
      this.todoArr.forEach(todo => {
        if (todo.id == todoId) {
          todo.value = newValue;
        }
      })

      editPTag.style.display = "none";
      this.generateTodoMarkUp(this.todoArr);
    })
  }
}

newToDo.addEventListener("change", (event) => {
  startTodo.style.display = "none";
  todoList.style.cssText = "margin-top: 6em;"

  let value = newToDo.value;
  let obj = {
    value: value,
    id: Date.now(),
    isCompleted: false
  }

  todos.push(obj)
  newToDo.value = "";

  todos.generateTodoMarkUp(todos.todoArr)
})

let toggleElement;

todoList.addEventListener("click", (event) => {
  let target = event.target;
  let targetId = target.dataset.id;

  if (target.classList.contains("button")) {
    let options = document.querySelectorAll(".select");
    let nodeArr = Array.from(options)

    nodeArr.filter(div => div.dataset.id != targetId).forEach(elem => elem.classList.add("hide"))

    toggleElement = nodeArr.find(div => div.dataset.id == targetId);
    todos.toggleOption(toggleElement);
  }

  if (target.classList.contains("edit")) {
    todos.toggleOption(toggleElement)
    todos.editTodo(targetId)

  }

  if (target.classList.contains("delet")) {
    todos.deletTodo(targetId)
  }
})


