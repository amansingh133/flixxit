import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "../features/user-accounts/index";
import { contentReducer, suggestionsReducer } from "../features/browse/index";
import { profileReducer } from "../features/user-profile/index";
import { watchlistReducer } from "../features/watchlist/index";
import { searchReducer } from "../features/search";
import { consumptionReducer } from "../features/consumption";
import { ratingReducer } from "../features/rating";

const rootReducer = combineReducers({
  user: userReducer,
  content: contentReducer,
  profile: profileReducer,
  watchlist: watchlistReducer,
  search: searchReducer,
  consumption: consumptionReducer,
  suggestions: suggestionsReducer,
  rating: ratingReducer,
});

export default rootReducer;
