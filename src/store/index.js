import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import isEditingReducer from "./isEditingSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    isEditing: isEditingReducer,
  },
});
