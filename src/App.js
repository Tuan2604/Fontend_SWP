import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./Components/view/partials/HomePage/Home";
import Login from "./Components/view/Login/Login";
import Header from "./Components/view/partials//HomePage/Header";
import Register from "./Components/view/Register/Register";
import "./transitions.css"; // Import the transitions CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostManagementPage from "./features/Saler/page/post-management";
import PostCreate from "./features/Saler/page/post-create";

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    // Perform login logic here...
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here...
    setIsLoggedIn(false);
  };

  const SalerRouter = lazy(() => import("./features/Saler"));

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Suspense fallback={<>Loading</>}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <Home />
                  </>
                }
              />
              {/* Pass onLogin function to the Login component */}
              <Route
                path="/login"
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <Login onLogin={handleLogin} />
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <Register />
                  </>
                }
              />
              {/* <Route
                path="/saler/*"
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <SalerRouter />
                  </>
                }
              /> */}
              <Route
                path={"/saler/post-management"}
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <PostManagementPage />
                  </>
                }
              />
              <Route
                path={"/saler/post-create"}
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                    <PostCreate />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />{" "}
              {/* Catch-all route */}
            </Routes>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
