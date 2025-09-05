import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";
import ForgotPass from "./components/Forgot Password/ForgotPass";
import ResetPass from "./components/Forgot Password/ResetPass";
import useCheckTokenExpiration from "./Hooks/useCheckTokenExpiration";
import { ThemeProvider } from "./context/ThemeContextProvider";

function App() {
  const { checkTokenExpiration } = useCheckTokenExpiration(); // Token expiration handling

  const token = useSelector((state) => state.authSlice.token);
  const isAuthenticated = token ? true : false;

  useEffect(() => {
    if (checkTokenExpiration) {
      checkTokenExpiration();
    }
  }, [checkTokenExpiration, token]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <ThemeProvider>
                <Sidebar />
              </ThemeProvider>
            ) : (
              <Navigate to="/Login" />
            )
          }
        />
        <Route
          path="/Login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
