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

  const isFormValid = email !== "";

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
      setErr(error.response.data.error || "An error occurred.");
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
