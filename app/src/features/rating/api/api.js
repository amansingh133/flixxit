import { callApi } from "../../../api/callApi";

export const handleVoteApi = async (axios, contentId, type) => {
  const response = await callApi(axios, `/content/vote/${contentId}`, "post", {
    type: type,
  });
  return response;
};
