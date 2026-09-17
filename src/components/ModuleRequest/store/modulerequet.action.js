import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosInstance";

export const modulerequest = createAsyncThunk(
  "modulerequest",
  async ({ headers }) => {
    try {
      const res = await axiosInstance.get(
        `/student-portal/batch-reassign-requests`,
        {
          headers,
        }
      );

      return {
        data: res.data,
        status: res.status,
      };
    } catch (err) {
      console.error("Module Request API Error:", err);

      return {
        status: err.response?.status,
        error: err.response?.data?.error,
      };
    }
  }
);
