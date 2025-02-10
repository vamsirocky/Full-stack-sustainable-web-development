import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import Logo from "../assets/PACE_Logo.png";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Please enter a valid email.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://localhost:5001/login", formData);

      // Login successful
      console.log("Login successful:", response.data);
      alert("Login successful!");
      localStorage.setItem("token", response.data.token); // Store the JWT token
      setLoading(false);
      onLogin(); // Call the onLogin function passed as a prop
      navigate("/"); // Redirect to the home/dashboard page
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <img src={Logo} alt="PACE Logo" className="login-logo" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
