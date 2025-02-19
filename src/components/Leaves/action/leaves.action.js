import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axiosInstance";
import { handleError, handleResponse } from "../../../Utils/apiHelpers";
import { showAlert } from "../../../Utils/SweatAlertModal";

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
      const res = await axiosInstance.post(
        `/student-portal/leave/apply`,
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return handleResponse(res.data);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const getAllLeaves = createAsyncThunk(
  "getAllLeaves",
  async ({ headers }) => {
    try {
      // Send a POST request to the login API endpoint with user data
      const res = await axiosInstance.get(`/student-portal/leave-req`, {
        headers: headers,
      });

      const data = await res.data; // Corrected this line
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

export const getWithdrawnLeaves = createAsyncThunk(
  "getWithdrawnLeaves",
  async ({ headers, leaveId }) => {
    console.log(headers, leaveId);
    try {
      // Send a POST request to the API endpoint with headers properly set
      const res = await axiosInstance.post(
        `/student-portal/withdraw/${leaveId}`,
        null, // Request body is null since no data is sent
        {
          headers: headers, // Set headers here
        }
      );

      const data = await res.data; // Access response data
      console.log(data);

      return handleResponse(data);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

function extractFilename(contentDisposition) {
  // Regular expression to extract the filename
  const regex = /filename="([^"]+)"/;

  // Apply the regex to the input string to find the filename
  const matches = regex.exec(contentDisposition);

  // Return the filename if found, or a default message
  if (matches && matches[1]) {
    return matches[1]; // Extracted filename
  } else {
    return "file"; // Default message if filename is not found
  }
}

export const handleDownloadFiles = createAsyncThunk(
  "handleDownloadFiles",
  async ({ fileid, rtoken }) => {
    console.log(fileid, rtoken);
    try {
      const res = await axiosInstance.get(
        `/student-portal/download/${fileid}`,
        {
          headers: {
            Authorization: `Bearer ${rtoken}`,
          },
          responseType: "arraybuffer", // Important: Set the response type to arraybuffer
        }
      );

      // Extract filename from response headers (fallback to default name if missing)
      // Extract filename from response headers
      const contentDispositionValue = res?.headers["content-disposition"];
      const fileName = extractFilename(contentDispositionValue);

      // Extract content type from response headers
      const contentTypeValue = res?.headers["content-type"];

      // Create a Blob from the response data
      const blob = new Blob([res?.data], { type: contentTypeValue });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Open the document in a new tab
      window.open(url, "_blank");

      return res?.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.error || "Requested document cannot be found";
      showAlert("Error", errorMessage, "error", "OK", true);
    }
  }
);
