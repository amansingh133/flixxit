import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../features/user-accounts/index";
import { contentReducer, tmdbReducer } from "../features/browse/index";
import { profileReducer } from "../features/user-profile/index";
import { watchlistReducer } from "../features/watchlist/index";
import { searchReducer } from "../features/search";

const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
  tmdb: tmdbReducer,
  profile: profileReducer,
  watchlist: watchlistReducer,
  search: searchReducer,
});

export default rootReducer;
