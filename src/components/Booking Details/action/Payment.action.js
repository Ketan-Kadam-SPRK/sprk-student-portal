import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosInstance";

export const getBookingDetails = createAsyncThunk(
  "payment/getBookingDetails",
  async ({ headers }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(`/student-portal/bookings`, {
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