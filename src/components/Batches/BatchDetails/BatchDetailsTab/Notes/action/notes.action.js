import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../../axios/axiosInstance";
import { handleError, handleResponse } from "../../../../../../Utils/apiHelpers";
import { showAlert } from "../../../../../../Utils/SweatAlertModal";

export const getBAtchNoteByBatchId = createAsyncThunk(
  "getBAtchNoteByBatchId",
  async ({ headers, batchId}) => {
    try {
      const res = await axiosInstance.get(`/student-portal/batch/${batchId}/notes`, {
        headers,
      });

      // Extract data and status from the response
      const { data, status } = res;
      if (data?.error !== null) {
        showAlert("Failed", data?.error, "error", "OK", true);
      }

      return { data, status };
    } catch (err) {
      // Use rejectWithValue to handle errors and provide additional information
      handleError(err);
      return { status: err.response?.status };
    }
  }
);

export const getCommentsByNoteId = createAsyncThunk(
  "getCommentsByNoteId",
  async ({ headers, noteId }) => {
    try {
      const res = await axiosInstance.get(`/student-portal/batch/notes/${noteId}/comments`, {
        headers,
      });

      // Extract data and status from the response
      const { data, status } = res;
      if (data?.error !== null) {
        showAlert("Failed", data?.error, "error", "OK", true);
      }

      return { data, status };
    } catch (err) {
      // Use rejectWithValue to handle errors and provide additional information
      handleError(err);
      return { status: err.response?.status };
    }
  }
);

export const addCommentToNote = createAsyncThunk(
  "addCommentToNote",
  async ({ headers, editNoteId, commentText }) => {
    try {
      // Make a PATCH request to resume the batch
      const res = await axiosInstance.post(
        `/student-portal/batch/notes/${editNoteId}/comments`,
        commentText,
        {
          headers,
        }
      );

      return handleResponse(res?.data);
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);