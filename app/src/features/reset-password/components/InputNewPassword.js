import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useFormContext from "../hooks/useFormContext";
import useLogout from "../../../hooks/useLogout";
import PasswordModal from "../../../components/modal/components/PasswordModal";

const InputNewPassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setMessage } = useFormContext();
  const logout = useLogout();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [err, setErr] = useState("");

  const handleInput = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await axiosPrivate.post("/user/reset-password", {
        newPassword: formData.newPassword,
      });
      setMessage(response.data.message);
      setFormData({ newPassword: "", confirmNewPassword: "" });
      await logout();
    } catch (error) {
      setErr(error.response.data.error || "An error occurred.");
    }
  };

  const isFormValid = formData.newPassword && formData.confirmNewPassword;

  return (
    <>
      <form className="reset-form" onSubmit={handleSubmit} noValidate>
        <input
          type="password"
          name="newPassword"
          placeholder="Password"
          value={formData.newPassword}
          onChange={handleInput}
          autoComplete="off"
        />

        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm Password"
          value={formData.confirmNewPassword}
          onChange={handleInput}
          autoComplete="off"
        />
        <PasswordModal />
        {!passwordMatch && (
          <p className="reset-error">Passwords do not match</p>
        )}
        {err && <p className="error">{err}</p>}
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </>
  );
};

export default InputNewPassword;
