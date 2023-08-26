import {
  updateUpvote,
  updateDownvote,
  updateUserVote,
  setError,
} from "../slice/rating-slice";

export const updateVotes = (dispatch, upvote, downvote, userVote) => {
  dispatch(updateUpvote(upvote));
  dispatch(updateDownvote(downvote));
  dispatch(updateUserVote(userVote));
  dispatch(setError(null));
};
