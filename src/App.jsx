import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import "./style.css";
import { useSelector } from "react-redux";
import ForgotPass from "./components/Forgot Password/ForgotPass";

function App() {
  const token = useSelector((state) => state.authSlice.token);
  const isAuthenticated = token ? true : false;
  console.log(isAuthenticated);
  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={isAuthenticated ? <Sidebar /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
