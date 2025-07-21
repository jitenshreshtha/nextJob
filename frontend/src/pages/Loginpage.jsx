import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Loginpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Loginpage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/user/userLogin",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 404) {
        toast.error("User not found! Please register.");
        return;
      }
      if (response.status === 400) {
        toast.error("Invalid credentials! Please try again.");
        return;
      }
      if (response.status === 201) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
    }
  };
  return (
    <div className="login-container">
      <main className="login-main">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your NextJob account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" className="remember-checkbox" />
                <span className="remember-text">Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>

          <div className="signup-redirect">
            <p className="redirect-text">
              Don't have an account?{" "}
              <Link to="/register" className="redirect-link">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Loginpage;
