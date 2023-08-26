import { callApi } from "../../../api/callApi";

export const handleVoteApi = async (axios, contentId) => {
  const response = await callApi(axios, `/content/vote/${contentId}`, "post");
  return response;
};
