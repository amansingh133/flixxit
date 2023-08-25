import { callApi } from "../../../api/callApi";
import { storeConsumption, setError } from "../slice/consumption-slice";

export const getConsumption = async (axios, dispatch) => {
  try {
    const response = await callApi(axios, "/content/consumption", "get");
    dispatch(storeConsumption(response.data.consumptionHistory.items));
    dispatch(setError(null));
  } catch (error) {
    console.log(error);
    setError("Failed to fetch consumption history.");
  }
};