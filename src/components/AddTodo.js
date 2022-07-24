import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDateAndTime from "../utils/getDate";
import { addTodoAsync, addTodo } from "../store/todoSlice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    todo: "",
    error: null,
  });

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      error: null,
    });
  };

  const onAdd = () => {
    if (!todo) {
      setState({ ...state, error: "Please write something to add" });
      return;
    }

    let todoItem = {
      title: todo,
      due_on: getDateAndTime(),
      status: "pending",
    };
    dispatch(addTodoAsync(todoItem));
    // dispatch(addTodo(todoItem))
    setState({ ...state, todo: "" });
  };

  const { todo, error } = state;

  return (
    <div>
      <input
        type="text"
        value={todo}
        className="addtodo-align"
        placeholder="Add todo..."
        name="todo"
        onChange={onChange}
      ></input>
      <button type="button" className="button" onClick={onAdd}>
        Add
      </button>
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
};

export default AddTodo;
