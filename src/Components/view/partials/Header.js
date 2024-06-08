import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear(); // Clears all data from localStorage
      navigate('/login'); // Redirects to login page using react-router-dom
    }
  };

  return (
    <header className="header">
      <nav>
        <div className="li">
          <ul>
            <li>
              <Link to="/">Home</Link> {/* Link to Home page */}
            </li>
            <li>
              <Link to="/login">Login</Link> {/* Link to Login page */}
            </li>
            <li>
              <Link to="/register">Register</Link> {/* Link to Register page */}
            </li>
            <li>
              <a href="#logout" onClick={logout}>Logout</a> {/* Logout link */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
