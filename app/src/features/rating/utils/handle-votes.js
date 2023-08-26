import { handleVoteApi } from "../api/api";
import { updateVotes } from "./update-votes";
import { setError } from "../slice/rating-slice";

export const handleVotes = async (axios, contentId, dispatch, type) => {
  try {
    const response = await handleVoteApi(axios, contentId, type);
    updateVotes(
      dispatch,
      response.data.upvotes,
      response.data.downvotes,
      response.data.voteStatus
    );
  } catch (error) {
    console.log(error);
    dispatch(setError("Something went wrong! Please try again later"));
  }
};
