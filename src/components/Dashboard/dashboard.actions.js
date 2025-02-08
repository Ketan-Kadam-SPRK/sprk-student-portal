import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const getTodaysBatches = createAsyncThunk(
  "dah/getTodaysBatches",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/sessions/today`, {
        headers,
      });

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const getDashExams = createAsyncThunk(
  "dash/getDashExams",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/dash/exams`, {
        headers,
      });

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const getDashJobs = createAsyncThunk(
  "dash/getDashJobs",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/dash/jobs`, {
        headers,
      });

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);
