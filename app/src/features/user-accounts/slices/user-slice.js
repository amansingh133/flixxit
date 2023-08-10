import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAndToken: (state, action) => {
      const { email, name, sub } = action.payload.user;
      state.user = { email, name, id: sub };
      state.accessToken = action.payload.accessToken;
    },
    clearUserAndToken: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUserAndToken, clearUserAndToken } = userSlice.actions;

export default userSlice.reducer;
