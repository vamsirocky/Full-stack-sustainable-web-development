import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import Logo from "../assets/PACE_Logo.png";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    onLogin();
    navigate("/");
  };

  return (
    <div className="auth-container">
      <img src={Logo} alt="PACE Logo" className="login-logo" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Email:</label>
        <input type="email" name="email" required />
        <label>Password:</label>
        <input type="password" name="password" required />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
