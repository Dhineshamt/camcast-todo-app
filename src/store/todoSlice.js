import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const appUrl = "https://gorest.co.in/public/v1/users/13/todos";
const todoAppHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization:
    "Bearer 22e745f508990f40c97feccf5cf3397f7fbe0ae96f6b7baf051fccbcbb8267df",
};

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch(appUrl, {
      method: "GET",
      headers: todoAppHeader,
    });
    if (response.ok) {
      const todos = (await response.json()).data;
      return { todos };
    } else {
      console.log("The request to get todos is failed");
      /* error handling logic can be added here*/
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const response = await fetch(appUrl, {
      method: "POST",
      headers: todoAppHeader,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      let todo = (await response.json()).data;
      return { todo };
    } else {
      console.log("The request to add a todo is failed");
      /* error handling logic can be added here*/
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload) => {
    const response = await fetch(appUrl, {
      method: "PUT",
      headers: todoAppHeader,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    } else {
      console.log("The request to update finish status is failed");
      /* error handling logic can be added here*/
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const response = await fetch(appUrl, {
      method: "DELETE",
      headers: todoAppHeader,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { id: payload.id };
    } else {
      console.log("The request to delete the todo is failed");
      /*error handling can be handled here */
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: 1340,
      user_id: 13,
      title: "wake",
      due_on: "2022-07-23T14:59:49.366+05:30",
      status: "pending",
    },
    {
      id: 1341,
      user_id: 13,
      title: "wake",
      due_on: "2022-07-23T14:59:49.366+05:30",
      status: "pending",
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        title: action.payload.title,
        due_on: action.payload.due_on,
        status: action.payload.status,
      };
      state.push(todo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload.id;
        }
      });
      state[index].status = action.payload.status;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    editTodo: (state, action) => {
      const index = state.findIndex((elmt) => elmt.id === action.payload.id);
      state[index].title = action.payload.todo;
    },
  },

  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todo.id
      );
      state[index].status = action.payload.todo.status;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, toggleComplete, deleteTodo, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;

/*Dummy object for ref*/
// let todo = {
//   id: 1340,
//   user_id: 13,
//   title: "wake",
//   due_on: "2022-07-23T14:59:49.366+05:30",
//   status: "pending"
// }
