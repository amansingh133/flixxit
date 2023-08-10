import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../features/user-accounts/index";
import { contentReducer, tmdbReducer } from "../features/browse/index";
import { profileReducer } from "../features/user-profile";

const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
  tmdb: tmdbReducer,
  profile: profileReducer,
});

export default rootReducer;
