const state = localStorage.hasOwnProperty("userTodos") ? JSON.parse(localStorage.getItem("userTodos")) : {
  todos: [],
  currentActiveTodo: null,
  lastActiveTodo: null,
  isSelectVisible: false
}

export default state;