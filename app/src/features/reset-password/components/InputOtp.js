import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useFormContext from "../hooks/useFormContext";

const InputOtp = () => {
  const axiosPrivate = useAxiosPrivate();
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const { setMessage, setPage } = useFormContext();

  const isFormValid = otp !== "" && /^\d{6}$/.test(otp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post("/user/validate-otp", {
        otp,
      });
      setMessage(response.data.message);
      setPage((prev) => prev + 1);
      setOtp("");
    } catch (error) {
      setErr(error.response.data.error || "An error occurred.");
    }
  };

  return (
    <>
      <form className="reset-form" onSubmit={handleSubmit} noValidate>
        <input
          type="number"
          id="otp"
          name="otp"
          placeholder="Enter 6 digit OTP"
          value={otp}
          onChange={(e) => {
            setErr("");
            setMessage("");
            setOtp(e.target.value);
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

export default InputOtp;
