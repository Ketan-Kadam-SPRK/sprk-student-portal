import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import { handleResponse, handleError } from "../../../Utils/apiHelpers";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ updatedFormData }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/auth/stu/login`,
        updatedFormData,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await res.data; // Corrected this line
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);

// Create an asynchronous Redux thunk action to fetch user details
export const getUser = createAsyncThunk(
  "login/getUser", // Action name
  async ({ accessToken }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/auth/stu/profile`,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return data;
    } catch (err) {
      console.log(err);
      // throw err;  // Throw an error if there's an issue with the request
    }
  }
);

export const freshToken = createAsyncThunk(
  "login/freshToken",
  async ({ headers, isLogoutAll = false }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/auth/stu/logout`,
        null,
        {
          headers: {
            ...headers,
            "logout-from-other-devices": isLogoutAll,
          },
        }
      );

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "login/forgotPassword",
  async ({ payload }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/stu/forgot/pass`,
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      return handleResponse(response.data);
    } catch (error) {
      handleError(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "login/resetPassword",
  async ({ payload }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/stu/reset/pass`,
        payload,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      return handleResponse(response?.data);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "login/changePassword",
  async ({ payload, headers }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/stu/change/pass`,
        payload,
        {
          headers: headers,
        }
      );

      const data = await response?.data;

      return handleResponse(data);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }
);

export const uploadUserProfilePic = createAsyncThunk(
  "profile/uploadUserProfilePic",
  async ({ headers, selectedFile }) => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("type", "PROFILE");

      const res = await axiosInstance.post(`/student-portal/upload`, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.data; // Corrected this line
      // console.log(res.data)
      return handleResponse(data);
    } catch (err) {
      handleError(err);
    }
  }
);

export const getUserPic = createAsyncThunk(
  "profile/getUserPic",
  async ({ headers }) => {
    const config = {
      headers,
      responseType: "blob", // Set the response type to 'blob' to receive binary data
    };

    const res = await axiosInstance.get(
      `/student-portal/profile`,
      config // Pass the config object here
    );

    const blob = await res.data;
    const blobUrl = URL.createObjectURL(blob); // Create a Blob URL

    return blobUrl;
  }
);
