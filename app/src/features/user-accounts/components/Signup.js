import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/user-api";
import Logo from "../../../components/logo/Logo";
import PasswordModal from "../../../components/modal/PasswordModal";
import "../styles/form.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [err, setErr] = useState("");

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErr("");
    setPasswordMatch(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErr("Invalid email address");
      return;
    }

    try {
      const response = await signup(
        formData.name,
        formData.email,
        formData.password
      );

      if (response.status === 200) {
        navigate("/login", { replace: true });
        setErr("");
      }
    } catch (error) {
      console.log(error);
      setErr(error.response.data.error || "An error occurred during signup.");
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword;

  return (
    <div className="page-layout">
      <div className="logo-container">
        <Logo />
      </div>
      <section className="form-wrapper">
        <form className="form-content" onSubmit={handleSubmit} noValidate>
          <div className="title-container">
            <h1>Sign Up</h1>
            <PasswordModal />
          </div>
          {!passwordMatch && <p className="error">Passwords do not match</p>}
          {err && <p className="error">{err}</p>}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInput}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInput}
            required
          />{" "}
          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid}
          >
            Signup
          </button>
          <h4>
            <span>Already have an account?</span>
            <Link to="/login">Login here</Link>
          </h4>
        </form>
      </section>
    </div>
  );
};
export default Signup;
