import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Login from './components/Login/Login'

function App() {
    const isAuthenticated = true
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
    </Routes>
  </BrowserRouter>
  )
}

export default App