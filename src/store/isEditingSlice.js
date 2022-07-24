import { createSlice } from "@reduxjs/toolkit";

export const isEditingSlice = createSlice({
  name: "isEditing",
  initialState: {
    isEditing: false,
  },
  reducers: {
    isEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
});

export const { isEditing } = isEditingSlice.actions;

export default isEditingSlice.reducer;
