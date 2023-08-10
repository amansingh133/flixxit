import { createContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const title = {
    0: "Enter Email",
    1: "Enter OTP",
    2: "New Password",
  };

  const [page, setPage] = useState(0);

  const [message, setMessage] = useState("");

  return (
    <FormContext.Provider value={{ title, page, setPage, message, setMessage }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
