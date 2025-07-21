import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">NextJob</span>
          </Link>

          <nav className="main-nav">
            <Link to="/" className="nav-link">
              Find Jobs
            </Link>
            <Link to="/post-job" className="nav-link">
              Post Job
            </Link>
          </nav>

          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="login-button">
                  Login
                </Link>
                <Link to="/register" className="register-button">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="logout-button"
              >
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