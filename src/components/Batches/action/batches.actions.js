import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosInstance";

export const getBatches = createAsyncThunk(
  "batch/getBatches",
  async ({ headers }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(`/student-portal/batches`, {
        headers: headers,
      });

      const data = await res.data; // Corrected this line
      console.log(res.data);
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const getSessionsDetails = createAsyncThunk(
  "batchDetails/getSessionsDetails",
  async ({ headers, batchId }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(`student-portal/sessions/${batchId}`, {
        headers: headers,
      });

      const data = await res.data; // Corrected this line
      console.log(res.data);
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const getAbsentLogs = createAsyncThunk(
  "batchDetails/getAbsentLogs",
  async ({ headers, batchId }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(`/student-portal/absentLog/${batchId}`, {
        headers: headers,
      });

      const data = await res.data; // Corrected this line
      console.log(res.data);
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);
