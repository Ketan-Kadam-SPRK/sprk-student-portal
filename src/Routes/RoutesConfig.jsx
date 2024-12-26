import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Batches from "../components/Batches/Batches";

function RoutesConfig() {
  return (
    <Routes>
      {/* <Route
      path="/*"
      element={
        mainTabName?.length > 0 ? (
          <Navigate to={capitalizedTabNames[0]} />
        ) : (
          <Navigate to="" />
        )
      }
    /> */}
      <Route path="/" element={<Navigate to="Dashboard" />} />
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="Batches" element={<Batches />} />
      <Route path="Exam" element={<Dashboard />} />
      <Route path="Payments" element={<Dashboard />} />
      <Route path="Certificates" element={<Dashboard />} />
      <Route path="Job_Opportunities" element={<Dashboard />} />
    </Routes>
  );
}

export default RoutesConfig;
