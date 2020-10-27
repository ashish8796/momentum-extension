import { ADD_TODO, COMPLETE_TODO, DELETE_TODO, EDIT_TODO } from "./../types";

const initialState = {
  todoArr: localStorage.hasOwnProperty("userTodos")
    ? JSON.parse(localStorage.getItem("userTodos")).todoArr
    : [],
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { payload } = action;

      const newTodo = {
        value: payload.todo,
        isCompleted: false,
        id: Date.now(),
      };
      localStorage.setItem(
        "userTodos",
        JSON.stringify({ todoArr: [...state.todos.todoArr, newTodo] })
      );

      return {
        todos: { todoArr: [...state.todos.todoArr, newTodo] },
      };
    }

    case COMPLETE_TODO: {
      const todoArr = state.todos.todoArr.map((item) => {
        return item.id !== action.payload.id
          ? item
          : {
              value: item.value,
              id: item.id,
              isCompleted: !item.isCompleted,
            };
      });

      localStorage.setItem("userTodos", JSON.stringify({ todoArr }));
      return { todos: { ...state.todos, todoArr } };
    }

    case DELETE_TODO: {
      const newArr = state.todos.todoArr.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem("userTodos", JSON.stringify({ todoArr: newArr }));
      return { todos: { ...state.todos, todoArr: newArr } };
    }

    case EDIT_TODO: {
      const newArr = [...state.todos.todoArr].map((el) => {
        if (el.id === action.payload.id) {
          return {
            value: action.payload.newValue,
            id: action.payload.id,
            isCompleted: el.isCompleted,
          };
        }
        return el;
      });

      localStorage.setItem("userTodos", JSON.stringify({ todoArr: newArr }));
      return { todos: { ...state.todos, todoArr: newArr } };
    }

    default:
      return state;
  }
}
