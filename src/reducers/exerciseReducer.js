// state management for user's saved exercises

import { createSlice } from "@reduxjs/toolkit";
import exercisePhoto from '../assets/exercise.jpg';

const initialState = {
  bodypart: 'Cardio',
  workouts: [
    {
      bodyPart: 'string',
      equipment: 'string',
      gifUrl: exercisePhoto,
      id: 'string',
      name: 'string',
      target: 'string',
      secondaryMuscles: ['string'],
      instructions: ['string'],
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
