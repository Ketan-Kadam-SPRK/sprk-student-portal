import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const getTheoryExams = createAsyncThunk(
  "exam/getTheoryExams",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/exams/theory`, {
        headers,
      });

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return data;
    } catch (err) {
      console.log(err);
      throw err; // Throw an error if there's an issue with the request
    }
  }
);

export const getPracticalExams = createAsyncThunk(
  "exam/getPracticalExams",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/exams/practical`, {
        headers,
      });

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return data;
    } catch (err) {
      console.log(err);
      throw err; // Throw an error if there's an issue with the request
    }
  }
);

export const getProjectExams = createAsyncThunk(
  "exam/getProjectExams",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/exams/projects`, {
        headers,
      });

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return data;
    } catch (err) {
      console.log(err);
      throw err; // Throw an error if there's an issue with the request
    }
  }
);
