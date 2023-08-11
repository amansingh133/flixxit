import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { setUserAndToken } from "../slices/user-slice";
import { login } from "../api/user-api";
import "../styles/form.css";
import Logo from "../../../components/logo/Logo";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address");
      return;
    }

    try {
      const { accessToken } = await login(formData.email, formData.password);
      const user = jwtDecode(accessToken);
      dispatch(setUserAndToken({ user, accessToken }));
      setFormData({ email: "", password: "" });
      setError("");
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.response.data.error || "An error occurred during login.");
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="page-layout">
      <div className="logo-container">
        <Logo />
      </div>
      <section className="form-wrapper">
        <form className="form-content" onSubmit={handleSubmit} noValidate>
          <div className="title-container">
            <h1>Log In</h1>
          </div>
          {error && <p className="error">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />

          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid}
          >
            Login
          </button>
          <h4>
            <span>Forgot or Change Password? </span>
            <Link to="/reset-password">Click here</Link>
          </h4>
          <h4>
            <span>Need an account? </span>{" "}
            <Link to="/signup">Sign up here</Link>
          </h4>
        </form>
      </section>
    </div>
  );
};

export default Login;
