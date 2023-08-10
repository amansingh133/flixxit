import ResetPasswordPage from "./pages/ResetPasswordPage";
import { FormProvider } from "./context/FormContext";

const ResetPassword = () => {
  return (
    <FormProvider>
      <ResetPasswordPage />
    </FormProvider>
  );
};

export default ResetPassword;
