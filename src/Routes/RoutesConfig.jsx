import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Batches from "../components/Batches/Batches";
import Courses from "../components/Courses/Courses";
import BatchDetails from "../components/Batches/BatchDetails/BatchDetails";
import CoureseDetails from "../components/Courses/CourseDetails/CoureseDetails";
import Leaves from "../components/Leaves/Leaves";
import Profile from "../components/Profile/Profile";
import Exams from "../components/Exams/Exams";
import Payments from "../components/Booking Details/Payments";
import PaymentDetails from "../components/Booking Details/PaymentDetails";
import JobOpportunities from "../components/Jobs/JobOpportunities";
import Certificates from "../components/Certification/Certificates";
import JobDetails from "../components/Jobs/child/JobDetails";

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
      <Route path="Course_Groups" element={<Outlet />}>
        <Route index element={<Courses />} />
        <Route path=":courseId" element={<CoureseDetails />} />
      </Route>
      <Route path="Exams" element={<Exams />} />
      <Route path="Leaves" element={<Leaves />} />
      <Route path="Payments" element={<Outlet />}>
        <Route index element={<Payments />} />
        <Route path=":paymentId" element={<PaymentDetails />} />
      </Route>
      <Route path="Certificates" element={<Certificates />} />
      <Route path="Job_Opportunities" element={<Outlet />}>
        <Route index element={<JobOpportunities />} />
        <Route path=":jobid" element={<JobDetails />} />
      </Route>
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
}

export default RoutesConfig;
