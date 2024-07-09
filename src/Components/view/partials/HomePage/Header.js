import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBook,
  faBox,
  faFile,
  faPen,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faTools,
  faUserPlus,
  faUserCircle,
  faListAlt, // Import the ListAlt icon for ListBuyer
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useAuth } from "../../../Hook/useAuth";

const Header = () => {
  const { isLogin, userInformation, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    if (isLogin) {
      setFullname(localStorage.getItem("fullname"));
    }
  }, [isLogin]);

  const logout = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      handleLogout();
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleWelcomeClick = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  if (userInformation?.userInfo?.role === "Admin") return null;

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/640px-FPT_logo_2010.svg.png"
              alt="Home"
              className="home-icon"
            />
          </Link>
        </div>
        <div className="search-container">
          <form
            onSubmit={handleSearchSubmit}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
              placeholder="Search..."
            />
            <button type="submit" className="search-button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="menu">
          <ul>
            {!isLogin && (
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
            {isLogin && (
              <>
                <li className="welcome" onClick={handleWelcomeClick}>
                  Welcome {fullname}
                  {showAccountMenu && (
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/account">
                          <FontAwesomeIcon icon={faUserCircle} /> Account
                        </Link>
                      </li>
                      <li>
                        <a href="#logout" onClick={logout}>
                          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="dropdown">
                  <a href="#danh-muc" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} /> Menu
                  </a>
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
                      <li>
                        <Link to="/post-create">
                          <FontAwesomeIcon icon={faFile} /> Create Post
                        </Link>
                      </li>
                      <li>
                        <Link to="/list-buyer">
                          <FontAwesomeIcon icon={faListAlt} /> ListBuyer
                        </Link>
                      </li>
                    </ul>
                  )}
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
