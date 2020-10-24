import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { actions } from "./../../store/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "./TodoList";

function Todos() {
  const dispatch = useDispatch();
  const { todoArr } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");
  const [isAddTodoVisible, setIsAddTodoVisible] = useState(
    localStorage.hasOwnProperty("isAddTodoVisible")
      ? JSON.parse(localStorage.getItem("isAddTodoVisible")).isAddTodoVisible
      : true
  );
  const [isDropDownBtnVisivle, setIsDropDownBtnVisivle] = useState(false);
  const currentSelect = useState("");
  const checkToggleSelect = useState(false);
  let [toggleSelect, setToggleSelect] = useState({});
  const [tab, setTabs] = useState("all");

  const toggleDropDownBtn = () => {
    setIsDropDownBtnVisivle(!isDropDownBtnVisivle);
  };

  let sortArr;
  if (tab === "all") {
    sortArr = todoArr;
  }
  if (tab === "active") sortArr = todoArr.filter((el) => !el.isCompleted);
  if (tab === "completed") sortArr = todoArr.filter((el) => el.isCompleted);

  localStorage.setItem(
    "isAddTodoVisible",
    JSON.stringify({ isAddTodoVisible })
  );

  return (
    <>
      <div
        className="todos-overlay"
        onClick={(event) => {
          checkToggleSelect[1](false);
          setIsDropDownBtnVisivle(false);
          todoArr.length === 0 && setIsAddTodoVisible(true);
        }}
      ></div>
      <div
        className="todos"
        onClick={() => {
          checkToggleSelect[0] && checkToggleSelect[1](false);
          isDropDownBtnVisivle && setIsDropDownBtnVisivle(false);
        }}
      >
        <div className="start-todo">
          <p
            className="hint"
            style={{ display: isAddTodoVisible ? "block" : "none" }}
          >
            Add a todo to get started
          </p>

          <button
            className="start-btn"
            style={{ display: isAddTodoVisible ? "block" : "none" }}
            onClick={(event) => {
              setIsAddTodoVisible(!isAddTodoVisible);
            }}
          >
            +Add Todo
          </button>

          <div
            className="drop-down"
            style={{ display: isAddTodoVisible ? "none" : "block" }}
          >
            <div className="inbox-down-arrow">
              <p className="inbox">Today</p>
              <div
                className="icon"
                onClick={() => {
                  toggleDropDownBtn();
                }}
              >
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </div>
            <div
              className="drop-down-btn"
              style={{ display: isDropDownBtnVisivle ? "block" : "none" }}
            >
              <button
                className="op-btn"
                id="active"
                onClick={() => {
                  setTabs("active");
                  setIsDropDownBtnVisivle(!isDropDownBtnVisivle);
                }}
              >
                Active
              </button>
              <button
                className="op-btn"
                id="completed"
                onClick={() => {
                  setTabs("completed");
                  setIsDropDownBtnVisivle(!isDropDownBtnVisivle);
                }}
              >
                Completed
              </button>
              <button
                className="op-btn"
                id="all"
                onClick={() => {
                  setTabs("all");
                  setIsDropDownBtnVisivle(!isDropDownBtnVisivle);
                }}
              >
                All
              </button>
            </div>
          </div>
        </div>
        <div className="todo-list">
          {sortArr.map((item, i) => {
            return (
              <TodoList
                key={i}
                todo={item}
                toggleSelect={toggleSelect}
                setToggleSelect={setToggleSelect}
                currentSelect={currentSelect}
                checkToggleSelect={checkToggleSelect}
                isAddTodoVisible={isAddTodoVisible}
                setIsAddTodoVisible={setIsAddTodoVisible}
                setIsDropDownBtnVisivle={setIsDropDownBtnVisivle}
              />
            );
          })}
        </div>
        {!isAddTodoVisible && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              newTodo && dispatch(actions.addTodo(newTodo));
              setNewTodo("");
            }}
          >
            <input
              type="text"
              placeholder="New Todo"
              className="new-todo"
              value={newTodo}
              autoFocus={true}
              onChange={(event) => {
                setNewTodo(event.target.value);
              }}
            />
          </form>
        )}
      </div>
    </>
  );
}

export default Todos;
