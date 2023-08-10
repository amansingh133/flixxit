import InputEmail from "./InputEmail";
import InputOtp from "./InputOtp";
import InputNewPassword from "./InputNewPassword";
import useFormContext from "../hooks/useFormContext";

const FormInputs = () => {
  const { page } = useFormContext();

  const display = {
    0: <InputEmail />,
    1: <InputOtp />,
    2: <InputNewPassword />,
  };

  const content = <>{display[page]}</>;

  return content;
};

export default FormInputs;
