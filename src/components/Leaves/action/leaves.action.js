
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosInstance";
import { handleError, handleResponse } from "../../../Utils/apiHelpers";

export const applyForLeave = createAsyncThunk(
    "applyForLeave",
    async ({ headers, leaveData }) => {
      const formData = new FormData();
      // const {...leaveDataWithoutFile,file} = leaveData;
      for (let item in leaveData) {
        formData.append(item, leaveData[item]);
      }
  
      try {
        // Send a GET request to the API to fetch course enrollment data for a specific student
        const res = await axiosInstance.post(`/student/apply-leave`, formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        });
  
        return handleResponse(res.data);
      } catch (error) {
        handleError(error);
        throw error;
      }
    }
  );