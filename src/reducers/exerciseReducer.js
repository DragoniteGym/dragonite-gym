// state management for user's saved exercises

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bodypart: 'Cardio',
};

export const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    updateExercises: (state, action) => {
      state.bodypart = action.payload;
    },
  },
});

export const { updateExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer;
