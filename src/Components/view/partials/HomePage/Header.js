import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
  faUserCircle,
  faSearch,
  faList,
  faHistory,
  faCheckCircle,
  faClipboardList,
  faCaretDown,
  faBell,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { useAuth } from "../../../Hook/useAuth";

const Header = () => {
  const { isLogin, userInformation, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNewsMenu, setShowNewsMenu] = useState(false);
  const [showBuyerMenu, setShowBuyerMenu] = useState(false);
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

  const handleMouseEnter = (menuType) => {
    switch (menuType) {
      case "news":
        setShowNewsMenu(true);
        break;
      case "buyer":
        setShowBuyerMenu(true);
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (menuType) => {
    switch (menuType) {
      case "news":
        setShowNewsMenu(false);
        break;
      case "buyer":
        setShowBuyerMenu(false);
        break;
      default:
        break;
    }
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
                <li className="welcome" onMouseEnter={handleWelcomeClick}>
                  Welcome {fullname}
                  {showAccountMenu && (
                    <ul className="dropdown-menu show">
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

                <li
                  className="dropdown"
                  onMouseEnter={() => handleMouseEnter("news")}
                  onMouseLeave={() => handleMouseLeave("news")}
                >
                  <a href="#news-management">
                    <FontAwesomeIcon icon={faBars} /> News Management
                    <FontAwesomeIcon icon={faCaretDown} />
                  </a>
                  {showNewsMenu && (
                    <ul className="dropdown-menu show">
                      <li>
                        <Link to="/list-seller">
                          <FontAwesomeIcon icon={faList} /> List News
                        </Link>
                      </li>
                      <li>
                        <Link to="/seller-history">
                          <FontAwesomeIcon icon={faHistory} /> News History
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className="dropdown"
                  onMouseEnter={() => handleMouseEnter("buyer")}
                  onMouseLeave={() => handleMouseLeave("buyer")}
                >
                  <a href="#buyer">
                    <FontAwesomeIcon icon={faClipboardList} /> Manage Posts
                    <FontAwesomeIcon icon={faCaretDown} />
                  </a>
                  {showBuyerMenu && (
                    <ul className="dropdown-menu show">
                      <li>
                        <Link to="/purchased-list">
                          <FontAwesomeIcon icon={faClipboardList} /> Purchased
                          List
                        </Link>
                      </li>
                      <li>
                        <Link to="/buyer-success">
                          <FontAwesomeIcon icon={faCheckCircle} /> Buyer Success
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            <li>
              <Link to="/notifications">
                <FontAwesomeIcon icon={faBell} /> Notifications
              </Link>
            </li>
            <li>
              <Link to="/purchased-list">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </Link>
            </li>
            <li>
              <Link to="/post-create" className="post-ad">
                Create Post
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
