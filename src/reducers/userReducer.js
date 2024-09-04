// state management for user info

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: 'test',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserId: (state, action) => {
      state.user_id = action.payload;
    },
  },
});

export const { updateUserId } = userSlice.actions;
export default userSlice.reducer;
