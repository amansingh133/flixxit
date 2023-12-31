import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  menuOptions: [
    { name: "Consumption History", path: "/history", button: "View" },
    { name: "Preferences", path: "/preferences", button: "Update" },
    {
      name: "Subscription Details",
      path: "/subscription/details",
      button: "View",
    },
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
