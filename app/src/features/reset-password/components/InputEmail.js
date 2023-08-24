import React, { useState } from "react";
import axios from "../../../api/axios";
import useFormContext from "../hooks/useFormContext";
import { setUserAndToken } from "../../../features/user-accounts/index";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

const InputEmail = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const { setMessage, setPage } = useFormContext();

  const isFormValid = email !== "" && err === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/reset-password-request", {
        email,
      });
      const accessToken = response.data.accessToken;
      const user = jwtDecode(accessToken);
      dispatch(setUserAndToken({ user, accessToken }));
      setMessage(response.data.message);
      setPage((prev) => prev + 1);
      setEmail("");
    } catch (error) {
      if (error.response.status === 429) {
        setErr(
          "Security First! For your safety, you can only generate 1 OTP per minute. Your protection is our priority."
        );
      } else {
        setErr(error.response.data.error || "An error occurred.");
      }
    }
  };

  return (
    <>
      <form className="reset-form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Registered Email"
          required
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setErr("");
            setMessage("");
            setEmail(e.target.value);
          }}
        />
        {err && <p className="reset-error">{err}</p>}
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </>
  );
};

export default InputEmail;
