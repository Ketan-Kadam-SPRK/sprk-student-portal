import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCourseDetails = createAsyncThunk(
  "course/getCourseDetails",
  async ({ accessToken }) => {
    try {
      // Send a GET request to fetch user details using the access token and user ID
      const res = await axios.get(`https://www.jsondataai.com/api/KV4Vh80`);

      // Extract and return the data from the response
      const data = await res.data;

      // Return the user details
      return data;
    } catch (err) {
      // console.log(err);
      // throw err;  // Throw an error if there's an issue with the request
    }
  }
);
