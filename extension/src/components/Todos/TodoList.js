import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./../../store/actionTypes";

const TodoList = ({
  todo,
  toggleSelect,
  setToggleSelect,
  currentSelect,
  checkToggleSelect,
  isAddTodoVisible,
  setIsAddTodoVisible,
  setIsDropDownBtnVisivle,
}) => {
  const [currentVisible, setCurrentVisible] = currentSelect;
  const { todoArr } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [visibleSelect, setVisibleSelect] = checkToggleSelect;
  const [editTodo, setEditTodo] = useState(false);
  const [newValue, setNewValue] = useState("");

  const handleOptionClick = (event) => {
    let newToggleSelect;
    todoArr.forEach((el) => {
      newToggleSelect = { ...newToggleSelect, [el.id]: true };
    });

    todo.id === currentVisible && visibleSelect
      ? setToggleSelect(newToggleSelect)
      : setToggleSelect({
          ...newToggleSelect,
          [todo.id]: !newToggleSelect[todo.id],
        });

    setCurrentVisible(todo.id);
    setVisibleSelect(todo.id === currentVisible ? !visibleSelect : true);
    setIsDropDownBtnVisivle(false);
    event.stopPropagation();
    // console.log(visibleSelect);
  };

  const handleEdit = () => {
    setEditTodo(!editTodo);
    setVisibleSelect(false);
  };

  const handleDelete = () => {
    dispatch(actions.deleteTodo(todo.id));
    todoArr.length <= 1 && setIsAddTodoVisible(!isAddTodoVisible);
    setVisibleSelect(false);
  };

  useEffect(() => {
    todoArr.forEach((el) => {
      toggleSelect = { ...toggleSelect, [el.id]: true };
    });
    setToggleSelect(toggleSelect);
  }, [todoArr]);

  // console.log(visibleSelect);

  return (
    <div className="todo">
      <section className="section-1">
        <input
          type="checkbox"
          className="ckbox"
          checked={todo.isCompleted}
          onChange={(event) => {
            dispatch(actions.completeTodo(todo.id));
          }}
        />
        {!editTodo && (
          <p style={{ color: todo.isCompleted && "gray" }}>{todo.value}</p>
        )}
        {editTodo && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              dispatch(actions.editTodo(todo.id, newValue));
              setEditTodo(false);
            }}
          >
            <input
              type="text"
              defaultValue={`${todo.value}`}
              className="edit-todo"
              autoFocus={true}
              onChange={(event) => {
                setNewValue(event.target.value);
              }}
            />
          </form>
        )}
      </section>
      <section className="section-2">
        {visibleSelect && (
          <div
            className="select"
            style={{ display: toggleSelect[todo.id] ? "none" : "flex" }}
          >
            <button className="edit" onClick={handleEdit}>
              Edit
            </button>
            <button className="delet" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
        <div className="option">
          <p>...</p>
          <button className="button" onClick={handleOptionClick}></button>
        </div>
      </section>
    </div>
  );
};

export default TodoList;
