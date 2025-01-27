import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";

export const getAllJobs = createAsyncThunk(
  "job/getAllJobs",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/job-posts`, {
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

export const getJobDetais = createAsyncThunk(
  "job/getJobDetais",
  async ({ headers, id }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/job-post/${id}`, {
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
