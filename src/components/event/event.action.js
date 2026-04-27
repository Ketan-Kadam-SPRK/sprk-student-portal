import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance";
import { handleError, handleResponse } from "../../Utils/apiHelpers";

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async ({ headers }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/events`, {
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

export const getEventByUid = createAsyncThunk(
  "events/getEventByUid",
  async ({ headers,eventUid }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axiosInstance.get(`/student-portal/event/${eventUid}`, {
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

export const applyForEvent = createAsyncThunk(
  "events/ApplyForEvent",
  async ({ headers, payload }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.post(
        `/student-portal/event/register`,
        payload,
        {
          headers: headers,
        }
      );

      const data = await res.data;
      
      return handleResponse(data);
    } catch (err) {
      return handleError(err);
    }
  }
);