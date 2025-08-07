import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosInstance";
import { handleError, handleResponse } from "../../../Utils/apiHelpers";

export const sentFeedback = createAsyncThunk(
  "sentFeedback",
  async ({ headers, formData, proofFiles }) => {
    const payload = new FormData();

    // Dynamically append all fields from formData
    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    }

    // Append each file (if any)
if (proofFiles && Array.isArray(proofFiles)) {
  proofFiles.forEach((file) => {
    payload.append("images", file);
  });
}


    try {
      const res = await axiosInstance.post(
        `/student-portal/feedback`,
        payload,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return handleResponse(res?.data);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);
