import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { handleError, handleResponse } from "../../Utils/apiHelpers";

export const getAllCertificates = createAsyncThunk(
  "certificate/getAllCertificates",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/certificates`, {
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

export const getPreviewCertificate = createAsyncThunk(
  "certificate/getPreviewCertificate",
  async ({ headers, id }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(
        `/student-portal/certificate/preview/${id}`,
        {
          headers,
        }
      );

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details

      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

export const downloadCertificate = createAsyncThunk(
  "certificate/downloadCertificate",
  async ({ headers, id }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(
        `/student-portal/certificate/download/${id}`,
        {
          headers,
        }
      );

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details

      return handleResponse(data);
    } catch (err) {
      return handleError(err);
    }
  }
);
