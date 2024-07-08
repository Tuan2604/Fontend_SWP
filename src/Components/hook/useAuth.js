import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLogin);
  }, [isLogin]);
  return (
    <UserContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => {
  const userContext = useContext(UserContext);
  console.log(userContext);
  return userContext;
};
export { useAuth };
export default UserProvider;
