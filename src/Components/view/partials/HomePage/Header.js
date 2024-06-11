import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faSignOutAlt, faBook, faPen, faBox, faTools } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Ensure the correct import statement for CSS

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn = !!localStorage.getItem('email'); // Check if user is logged in

  const logout = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear(); // Clears all data from localStorage
      navigate('/login'); // Redirects to login page using react-router-dom
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <nav>
        <div className="li">
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            {!isLoggedIn && ( // Show login and register links if not logged in
              <>
                <li>
                  <Link to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <FontAwesomeIcon icon={faUserPlus} /> Register
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && ( // Show logout link if logged in
              <>
                <li className="dropdown">
                  <a href="#danh-muc" onClick={toggleMenu}>Danh mục</a>
                  {showMenu && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/tai-lieu">
                          <FontAwesomeIcon icon={faBook} /> Tài liệu
                        </Link>
                      </li>
                      <li>
                        <Link to="/dung-cu-hoc-tap">
                          <FontAwesomeIcon icon={faPen} /> Dụng cụ học tập
                        </Link>
                      </li>
                      <li>
                        <Link to="/vat-pham">
                          <FontAwesomeIcon icon={faBox} /> Vật phẩm
                        </Link>
                      </li>
                      <li>
                        <Link to="/thiet-bi-hoc-tap">
                          <FontAwesomeIcon icon={faTools} /> Thiết bị học tập
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <a href="#logout" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
  