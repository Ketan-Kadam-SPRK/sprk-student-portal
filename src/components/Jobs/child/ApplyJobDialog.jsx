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
} from "@mui/material";
import React, { useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
function ApplyJobDialog({ handleClose }) {
  const data = {};
  const [doc, setDoc] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  //   const submit = async () => {
  //     if (!doc) {
  //       setError("Please select a file.");
  //       return;
  //     }
  //     setIsSubmitting(true);
  //     try {
  //       const res = await dispatch(applyToJob({ token, doc }));
  //       if (res.payload) {
  //         setSubmited(true);
  //       }
  //       setIsSubmitting(false);
  //     } catch (err) {
  //       console.error(err);
  //       setIsSubmitting(false);
  //     }
  //   };

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
          You are applying to UI/UX Designer position at McKinsey Company.
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
              // sx={{ width: "100%", minWidth: "200px" }}
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
              fontSize: "var(--font-size-medium)",
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
                {`I, ${data?.studentName}, give ${data?.company} permission to collect,
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
        <Button variant="contained">Submit</Button>
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
