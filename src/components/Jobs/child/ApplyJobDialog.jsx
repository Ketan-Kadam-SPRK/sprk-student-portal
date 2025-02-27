import { Close } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Box,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import { applyJob } from "../jobs.actions";

function ApplyJobDialog({ handleClose, getJobsDetailsById, jobData = {} }) {
  const headers = useAuthHeaders();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.authSlice.userDetails) || {};

  const [doc, setDoc] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  /**
   * Handles file selection. Checks if the file is PDF and less than 1MB.
   * If valid, sets the file in the state and clears the error.
   * If invalid, shows an error message using swal.
   * @param {Event} e The event object.
   */
  const hadleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check if file type is PDF
      if (file.type !== "application/pdf") {
        swal({
          icon: "error",
          title: "Invalid File Type",
          text: "Please upload a file in PDF format.",
          dangerMode: true,
        });
        return;
      }

      // Check if file size is less than 1 MB
      if (file.size > 1024 * 1024) {
        swal({
          icon: "error",
          title: "File Too Large",
          text: "File size should be less than 1 MB.",
          dangerMode: true,
        });
        return;
      }

      // Set the file if validations pass
      setDoc(file);
      setError("");
    }
  };

  /**
   * Submits the job application with the selected PDF file.
   * @throws {Error} If the file is invalid or the API call fails.
   */
  const submit = async () => {
    if (!doc) {
      setError("Please select a file.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await dispatch(
        applyJob({ headers, doc, id: jobData?.jobID })
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
          <CheckCircleRoundedIcon
            color="primary"
            sx={{ fontSize: "30px !important" }}
          />{" "}
          {`You are applying to ${jobData?.title} position at ${jobData?.comp}.`}
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
          Note: Applying to this job and not showing up may result in excluding
          you from future job opportunities.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography> Attach Latest Resume</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              size="small"
              fullWidth
              value={doc?.name}
              placeholder="Choose File"
              inputProps={{
                readOnly: true,
                sx: {
                  minWidth: "200px",
                },
              }}
              error={!!error}
              helperText={error}
            />{" "}
            <label htmlFor="resume-input">
              <Button
                variant="contained"
                component="span"
                sx={{ width: "150px" }}
              >
                Choose File
              </Button>
            </label>
            <input
              id="resume-input"
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={hadleFileSelect}
            />
          </Box>
          <Typography
            sx={{
              color: "gray",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
            }}
          >
            Please upload a PDF file less than 1 MB.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid #D8D8D8",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: 500,
              color: "#085186",
            }}
          >
            TERM AND CONDITIONS
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
            }}
          >
            <Checkbox
              value={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />{" "}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{ color: "#464646", fontSize: "var(--font-size-small)  " }}
              >
                {`I, ${userDetails?.name}, give ${jobData?.comp} permission to collect,
                  verify, and use my personal information for recruitment
                  purposes. I understand my information will be kept
                  confidential. If not selected, my data may be retained for
                  future roles or securely deleted.`}
              </Typography>
              <Typography
                sx={{
                  color: "#06375B",
                  fontWeight: "bold",
                  fontSize: "var(--font-size-small)",
                }}
              >
                {`Date: ${new Date().toLocaleDateString("en-GB")}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          disabled={isSubmitting || !isChecked}
          onClick={submit}
        >
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

export default ApplyJobDialog;
