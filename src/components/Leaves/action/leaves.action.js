
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
        const res = await axiosInstance.post(`/student-portal/leave/apply`, formData, {
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

  export const getAllLeaves = createAsyncThunk(
    "getAllLeaves",
    async ({ headers}) => {
      try {
        // Send a POST request to the login API endpoint with user data
        const res = await axiosInstance.get(`/student-portal/leave-req`, {
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

  export const editStudentLeave = createAsyncThunk(
    "editStudentLeave",
    async ({ headers, leaveId, leaveData }) => {
      const formData = new FormData();
      // const {...leaveDataWithoutFile,file} = leaveData;
  
      for (let item in leaveData) {
        formData.append(item, leaveData[item]);
      }
      try {
        // Make a PATCH request to resume the batch
        const res = await axiosInstance.patch(
          `/student-portal/edit/${leaveId}`,
          formData,
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