import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Batches from "../components/Batches/Batches";
import Courses from "../components/Courses/Courses";
import BatchDetails from "../components/Batches/BatchDetails/BatchDetails";
import CoureseDetails from "../components/Courses/CourseDetails/CoureseDetails";

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
      <Route path="Batches" element={<Outlet />}>
        <Route index element={<Batches />} />
        <Route path=":batchId" element={<BatchDetails />} />
      </Route>
      <Route path="Courses" element={<Outlet />}>
        <Route index element={<Courses />} />
        <Route path=":courseId" element={<CoureseDetails />} />
      </Route>
      <Route path="Exam" element={<Dashboard />} />
      <Route path="Payments" element={<Dashboard />} />
      <Route path="Certificates" element={<Dashboard />} />
      <Route path="Job_Opportunities" element={<Dashboard />} />
    </Routes>
  );
}

export default RoutesConfig;
