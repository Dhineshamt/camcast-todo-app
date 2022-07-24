import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodoAsync,
  toggleCompleteAsync,
  deleteTodo,
  toggleComplete,
  editTodo,
} from "../store/todoSlice";
import { isEditing } from "../store/isEditingSlice";

const TodoItem = ({ id, title, status }) => {
  const dispatch = useDispatch();
  const [editingToggle, setEditingToggle] = useState(false);
  const [todo, setTodo] = useState(title);
  const [error, setError] = useState(null);

  const onComplete = () => {
    // dispatch(toggleCompleteAsync({ id, status: "complete" }));
    dispatch(toggleComplete({ id, status: "complete" }));
  };
  const onDelete = () => {
    // dispatch(deleteTodoAsync({ id }));
    dispatch(deleteTodo({ id }));
  };

  useEffect(() => {
    dispatch(isEditing(editingToggle));
  }, [editingToggle]);

  const onEdit = (todo) => {
    setEditingToggle(true);
    setTodo(todo);
  };

  const onChange = (event) => {
    setTodo(event.target.value);
  };

  const onSave = () => {
    if (todo === "") {
      setError("Please write something");
      return;
    }
    setEditingToggle(false);
    // dispatch(isEditing(false));
    dispatch(editTodo({ id, todo }));
  };

  const onCancel = () => {
    setEditingToggle(false);
  };

  return (
    <Fragment>
      <tr>
        <td>
          <input
            type="checkbox"
            className="checkbox-align"
            defaultChecked={status === "completed"}
            onClick={onComplete}
          ></input>
        </td>

        <td>
          {editingToggle ? (
            <input
              type="text"
              className="todo-align"
              value={todo}
              name="title"
              onChange={onChange}
            ></input>
          ) : (
            <div className="todo-align">{title}</div>
          )}
        </td>
        <td>
          {editingToggle ? (
            <Fragment>
              <button onClick={onSave}>Save</button>
              <button onClick={onCancel}>Cancel</button>
            </Fragment>
          ) : (
            <button onClick={() => onEdit(title)}>Edit</button>
          )}
        </td>
        <td>
          <button onClick={onDelete}>Delete</button>
        </td>
      </tr>
    </Fragment>
  );
};

export default TodoItem;
