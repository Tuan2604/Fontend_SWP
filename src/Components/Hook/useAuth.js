import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [userInformation, setUserInformation] = useState(
    () => JSON.parse(localStorage.getItem("userInformation")) || {}
  );
  const handleLogout = () => {
    setIsLogin(false);
    setUserInformation({});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInformation");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("userInformation", JSON.stringify(userInformation));
  }, [userInformation]);
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLogin);
  }, [isLogin]);
  return (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userInformation,
        setUserInformation,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => {
  const userContext = useContext(UserContext);
  return userContext;
};
export { useAuth };
export default UserProvider;
