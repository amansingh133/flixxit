import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  menuOptions: [
    { name: "Preferences", path: "/preferences", button: "Update" },
    { name: "Subscription Details", path: "/subscription", button: "View" },
    { name: "Watch List", path: "/watchlist", button: "View" },
  ],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
