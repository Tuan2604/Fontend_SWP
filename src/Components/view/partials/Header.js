// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear(); // Clears all data from localStorage
      window.location.href = '/login'; // Redirects to login page
    }
  };

  return (
    <header className="header">
      <nav>
        <div className="li">
          <ul>
            <li>
              <Link to="/">Homepage</Link> {/* Link to Home page */}
            </li>
            <li>
              <Link to="/login">Login</Link> {/* Link to Login page */}
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <a href="/logout" onClick={logout}>Logout</a> {/* Logout link */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
