import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [userInformation, setUserInformation] = useState(
    () => JSON.parse(localStorage.getItem("userInformation")) || {}
  );

  useEffect(() => {
      localStorage.setItem("userInformation", JSON.stringify(userInformation));
  }, [userInformation]);
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLogin);
  }, [isLogin]);
  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, userInformation, setUserInformation }}
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
