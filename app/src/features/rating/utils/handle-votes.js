import { handleVoteApi } from "../api/api";
import { updateVotes } from "./update-votes";

export const handleVotes = async (axios, contentId, dispatch) => {
  try {
    const response = await handleVoteApi(axios, contentId);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
