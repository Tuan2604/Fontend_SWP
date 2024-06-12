import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faSignOutAlt, faBook, faPen, faBox, faTools } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Ensure the correct import statement for CSS

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/640px-FPT_logo_2010.svg.png" alt="Home" className="home-icon" />
          </Link>
        </div>
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
              placeholder="Search..."
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
        <div className="menu">
          <ul>
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
