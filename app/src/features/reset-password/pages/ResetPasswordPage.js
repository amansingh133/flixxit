import useFormContext from "../hooks/useFormContext";
import FormInputs from "../components/FormInputs";
import "../styles/reset-password.css";
import Logo from "../../../components/logo/Logo";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { title, page, message } = useFormContext();
  const content = (
    <div className="reset-page-layout">
      <div style={{ pointerEvents: "none" }} className="reset-logo-container">
        <Logo />
      </div>
      <div className="reset-form-wrapper">
        <div className="reset-form-content">
          <div className="reset-title-wrapper">
            <h1>{title[page]}</h1>
            <AiFillCloseCircle
              className="reset-close-icon"
              size={32}
              color="red"
              onClick={() => navigate("/welcome", { replace: true })}
            />
          </div>
          <p className="success-message">{message}</p>
          <FormInputs />
        </div>
      </div>
    </div>
  );

  return content;
};

export default ResetPasswordPage;
