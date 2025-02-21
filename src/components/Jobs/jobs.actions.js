import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { handleError, handleResponse } from "../../Utils/apiHelpers";

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
      return { data: data, status: res.status };
    } catch (err) {
      console.log(err);
      return { status: err.response.status, error: err.response.data.error };
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
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const applyJob = createAsyncThunk(
  "job/applyJob",
  async ({ headers, doc, id }) => {
    try {
      const formData = new FormData();

      formData.append("resume", doc);
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.post(`/placement/apply/${id}`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return handleResponse(data);
    } catch (err) {
      return handleError(err);
    }
  }
);

export const denyJob = createAsyncThunk(
  "job/denyJob",
  async ({ headers, reason, id }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.post(`/placement/deny/${id}`, reason, {
        headers,
      });

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return handleResponse(data);
    } catch (err) {
      return handleError(err);
    }
  }
);
