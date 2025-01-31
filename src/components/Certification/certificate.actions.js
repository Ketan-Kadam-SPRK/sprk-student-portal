import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { handleError, handleResponse } from "../../Utils/apiHelpers";

export const getAllCertificates = createAsyncThunk(
  "certificate/getAllCertificates",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(
        `https://vxljwq9k-8888.inc1.devtunnels.ms/api/student-portal/certificates`,
        {
          headers,
        }
      );

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
