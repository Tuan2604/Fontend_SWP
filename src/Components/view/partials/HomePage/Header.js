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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../../Hook/useAuth";

const Header = () => {
  const { isLogin, userInformation } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false); // State for account menu
  const [searchQuery, setSearchQuery] = useState("");
  const [fullname, setFullname] = useState("");
  const isLoggedIn = !!localStorage.getItem("email");

  useEffect(() => {
    if (isLogin) {
      setFullname(localStorage.getItem("fullname"));
    }
  }, [isLoggedIn]);

  const logout = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleWelcomeClick = () => {
    setShowAccountMenu(!showAccountMenu); // Toggle account menu visibility
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
            {!isLoggedIn && (
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
            {isLoggedIn && (
              <>
                <li className="welcome" onClick={handleWelcomeClick}>
                  Welcome {fullname} {/* Hiển thị tên người dùng */}
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
