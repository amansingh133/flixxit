import { logContentConsumption } from "../../consumption/index";

export const handleLogging = async (axios, contentId) => {
  try {
    const response = await logContentConsumption(axios, contentId);
    return response.data.message;
  } catch (error) {
    return error.response;
  }
};
