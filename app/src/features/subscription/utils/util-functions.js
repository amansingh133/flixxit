import { format } from "date-fns";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  const formattedDateTime = format(date, "dd/MM/yyyy 'at' HH:mm aaa");
  return formattedDateTime;
};
