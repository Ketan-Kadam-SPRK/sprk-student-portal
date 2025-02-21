import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosInstance";
import { handleError, handleResponse } from "../../../Utils/apiHelpers";

export const getBookingDetails = createAsyncThunk(
  "payment/getBookingDetails",
  async ({ headers }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(`/student-portal/bookings`, {
        headers: headers,
      });

      const data = await res.data; // Corrected this line

      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const getBookingInstallments = createAsyncThunk(
  "payment/getBookingInstallments",
  async ({ headers, booking_uid }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(
        `/student-portal/booking/${booking_uid}`,
        {
          headers: headers,
        }
      );

      const data = await res.data; // Corrected this line

      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const getBookingConfirmation = createAsyncThunk(
  "payment/getBookingConfirmation",
  async ({ headers, booking_uid }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(
        `/student-portal/bcn-receipt/${booking_uid}`,
        {
          headers: headers,
        }
      );

      const data = await res.data; // Corrected this line

      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const getReceiptData = createAsyncThunk(
  "payment/getReceiptData",
  async ({ headers, id }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(`/student-portal/receipt/${id}`, {
        headers: headers,
      });

      const data = await res.data; // Corrected this line

      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const printReceipt = createAsyncThunk(
  "payment/printReceipt",
  async ({ headers, id }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.post(
        `/student-portal/print/rec/${id}`,
        null,
        {
          headers: headers,
        }
      );

      const data = await res.data; // Corrected this line
      return data;
    } catch (err) {
      return handleError(err);
    }
  }
);

export const getAllReceipts = createAsyncThunk(
  "payment/getAllReceipts",
  async ({ headers }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(`student-portal/receipts`, {
        headers: headers,
      });

      const data = await res.data; // Corrected this line

      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);
