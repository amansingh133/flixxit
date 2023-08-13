export const callApi = async (axios, url, methodType, data = null) => {
  const axiosMethod = axios[methodType];

  if (!axiosMethod) {
    throw new Error("Unsupported method type");
  }

  let response;

  if (data !== null) {
    response = await axiosMethod(url, data);
  } else {
    response = await axiosMethod(url);
  }

  return response;
};
