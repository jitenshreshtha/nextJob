import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      const logoutResponse = await axios.post(
        "http://localhost:5000/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (logoutResponse.status === 200) {
        toast.success("Logout successful!");
        navigate("/login");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return null;
  }
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">NextJob</span>
          </Link>

          <nav className="main-nav">
            {user?.accountType === "user" && (
              <Link to="/findJobs" className="nav-link">
                Find Jobs
              </Link>
            )}
            {user?.accountType === "employer" && (
              <>
                <Link to="/postJobs" className="nav-link">
                  Post Job
                </Link>
                <Link to='/myJobs' className="nav-link">Manage Jobs</Link>
              </>
            )}
          </nav>

          <div className="auth-buttons">
            {!user ? (
              <>
                <Link to="/login" className="login-button">
                  Login
                </Link>
                <Link to="/register" className="register-button">
                  Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
