import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAndToken: (state, action) => {
      const { email, name, sub } = action.payload.user;
      state.user = { email, name, id: sub };
      state.accessToken = action.payload.accessToken;
      state.userData = action.payload.userData;
    },
    clearUserAndToken: (state) => {
      state.user = null;
      state.accessToken = null;
      state.userData = null;
    },
  },
});

export const { setUserAndToken, clearUserAndToken } = userSlice.actions;

export default userSlice.reducer;
