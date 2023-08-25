import { callApi } from "../../../api/callApi";

export const logContentConsumption = async (axios, contentId) => {
  const response = await callApi(axios, "/content/consumption", "post", {
    contentId,
  });
  return response;
};
