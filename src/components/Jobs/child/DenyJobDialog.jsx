import { Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import { denyJob } from "../jobs.actions";

function DenyJobDialog({ handleClose, getJobsDetailsById, jobID }) {
  const headers = useAuthHeaders();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  
  /**
   * Handles changes in the reason input field, validates that the input is within
   * the required length and updates the reason state accordingly
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
   */
  const handleReasonChange = (event) => {
    const value = event.target.value;

    const newValue = value.trim();

    if (newValue.length > 200 || newValue.length < 10) {
      setReasonError("Reason should be between 10 and 200 characters");
    } else {
      setReasonError("");
    }
    setReason(value);
  };

  /**
   * Submits the job deny request with the selected reason.
   * @throws {Error} If the reason is invalid or the API call fails.
   */
  const submit = async () => {
    let newReason = reason?.trim();
    if (newReason.length < 10 || newReason.length > 200) {
      setReasonError("Reason should be between 10 and 200 characters");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await dispatch(
        denyJob({ headers, reason: newReason, id: jobID })
      );
      if (res.payload) {
        handleClose();
        getJobsDetailsById();
      }

      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "var(--font-size-medium)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CancelRoundedIcon
            color="error"
            sx={{ fontSize: "30px !important" }}
          />{" "}
          You are about to decline this job opportunity.
        </Typography>
        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Typography>
          Please let us know why you're declining this opportunity. Your input
          helps us match you with better opportunities in the future
        </Typography>

        <Typography>Reason for denying job application*</Typography>

        <TextField
          multiline
          rows={6}
          placeholder="Type your reason here...."
          value={reason}
          onChange={handleReasonChange}
          fullWidth
          error={Boolean(reasonError)}
          helperText={reasonError}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button variant="contained" disabled={isSubmitting} onClick={submit}>
          {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </Button>{" "}
      </DialogActions>
    </>
  );
}

export default DenyJobDialog;
