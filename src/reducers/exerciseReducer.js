// state management for user's saved exercises

import { createSlice } from "@reduxjs/toolkit";
import exercisePhoto from '../assets/exercise.jpg';

const initialState = {
  bodypart: 'Cardio',
  workouts: [
    {
      url: exercisePhoto,
      title: 'Exercise #1',
      text: 'This is an example workout',
      link: '/search',
      width: '30%',
    },
  ],
};

export const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    updateExercises: (state, action) => {
      state.bodypart = action.payload;
    },
    updateWorkouts: (state, action) => {
      state.workouts = action.payload;
    }
  },
});

export const { updateExercises, updateWorkouts } = exerciseSlice.actions;
export default exerciseSlice.reducer;
