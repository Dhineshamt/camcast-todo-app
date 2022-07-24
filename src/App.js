import React, { useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <div className="App">
      <h1>Add your todos</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
