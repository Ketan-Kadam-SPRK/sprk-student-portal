import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ updatedFormData }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/stu/login`,
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
      // console.log(res.data)
      return { data: data, status: res.status };
    } catch (err) {
      return { status: err.response.status, error: err.response.data.error };
    }
  }
);
