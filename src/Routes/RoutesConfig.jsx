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
import ExploreCourses from "../components/Explore Courses/ExploreCourses";
import Receipts from "../components/Booking Details/child/Receipts";

import ProtectedRoute from "./ProtectedRoute";

function RoutesConfig() {
  // 🔐 permissions from API / state
  const allowedTabs = [
    "Dashboard",
    "Course_Groups",
    "Batches",
    "Exams",
    "Leaves",
    "Bookings",
    "Receipts",
    "Certificates",
    "Job_Opportunities",
    "Explore_Courses",
  ];

  return (
    <Routes>
      {/* 🔐 Protected Routes Wrapper */}
      <Route element={<ProtectedRoute allowedTabs={allowedTabs} />}>
        <Route path="/" element={<Navigate to={`/${allowedTabs[0]}`} />} />

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

        <Route path="Bookings" element={<Outlet />}>
          <Route index element={<Payments />} />
          <Route path=":booking_uid" element={<PaymentDetails />} />
        </Route>

        <Route path="Receipts" element={<Receipts />} />
        <Route path="Certificates" element={<Certificates />} />

        <Route path="Job_Opportunities" element={<Outlet />}>
          <Route index element={<JobOpportunities />} />
          <Route path=":jobid" element={<JobDetails />} />
        </Route>

        <Route path="Explore_Courses" element={<ExploreCourses />} />
        <Route path="Profile" element={<Profile />} />
      </Route>

      {/* ❌ fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesConfig;
