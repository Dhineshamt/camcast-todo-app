import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAsync } from "../store/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <table>
      <tbody>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
