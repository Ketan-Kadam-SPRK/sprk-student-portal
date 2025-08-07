import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

//mui icons
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

//common component, hooks,actions
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { applyForLeave, editStudentLeave } from "./action/leaves.action";
import { leaveFormValidation } from "../../Utils/leaveFormValidation";

function ApplyLeaveModal({
  handleClose,
  formData,
  setFormData,
  initialState,
  proofFile,
  setProofFile,
  leaveId,
  getAllLeavesData,
}) {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [days, setDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    start: "",
    end: "",
    reason: "",
  });

  // Calculate the number of days of leave
  useEffect(() => {
    if (formData) {
      const { start: formStart, end: formEnd } = formData;
      if (formStart && formEnd) {
        const start = new Date(formStart);
        const end = new Date(formEnd);
        if (start <= end) {
          const timeDiff = end.getTime() - start.getTime();
          const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24) + 1);
          setDays(dayDiff);
        } else {
          setDays(0);
        }
      } else {
        setDays(0);
      }
    } else {
      setDays(0);
    }
  }, [formData]);

  /**
   * Validate the form inputs
   * @param {Object} data - Form data to be validated
   * @returns {Object} - Object with error messages
   */
  const validateForm = (data) => {
    return leaveFormValidation(data);
  };

  /**
   * Handles input changes in the leave form. Validates the input based on the
   * field name and updates the formErrors state accordingly.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleFormInputs = (e) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Validate the entire form using shared function
    const errors = leaveFormValidation(updatedFormData);

    // Only update the relevant field's error
    setValidationErrors(errors);
  };

  /**
   * Handles file selection for proof file. Checks if the file size exceeds 1MB
   * and if the file type is valid. If the file size exceeds 1MB, it will show an
   * error message and reset the file input to null. If the file type is invalid,
   * it will also show an error message and reset the file input to null.
   * @param {Event} event The event object from the file input.
   */
  const handleProofFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file size exceeds maxSize
      if (file.size > 1024 * 1024) {
        // Update error message for size exceeding
        swal({
          title: "Failed",
          text: "File size exceeds 1MB. Please choose a smaller file.",
          icon: "error",
          dangerMode: true,
        });
        event.target.value = null;
        setProofFile(null);
        if (formData?.file?.id) {
          setProofFile(formData?.file);
        }
        return;
      }
      // Check if file type is valid
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        // Update error message for invalid file type
        swal({
          title: "Failed",
          text: "Invalid file type. Please choose a file of type: .pdf, .png, .jpeg, .jpg",
          icon: "error",
          dangerMode: true,
        });
        event.target.value = null;
        setProofFile(null);
        if (formData?.file?.id) {
          setProofFile(formData?.file);
        }

        return;
      }
      setProofFile(file);
    }
  };

  /**
   * Clears the proof file from the state and resets the file input field.
   * If the file data in formData is a string, it resets the proof file after clearing.
   * Ensures the state update flow is maintained by using a timeout.
   */

  const handleClearFile = () => {
    setProofFile(null); // Clear the file in the state

    // Check if formData.file is a string and reset proofFile after clearing
    if (formData?.file && typeof formData.file === "string") {
      setTimeout(() => {
        setProofFile(formData.file);
      }, 0); // Use a timeout to ensure state update flow is maintained
    }

    // Clear the input field
    const fileInput = document.getElementById("proof-file-input");
    if (fileInput) {
      fileInput.value = null;
    }
  };

  function formatDateToISOString(dateString, addDays = 0) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + addDays); // Add the specified number of days
    const timezoneOffset = -date.getTimezoneOffset();
    const formattedDate = new Date(
      date.getTime() - timezoneOffset * 60000
    ).toISOString();
    return formattedDate;
  }

  /**
   * Handles form submission by validating the form data and calling
   * the appropriate Redux action (applyForLeave or editStudentLeave)
   * based on whether the leave ID is null or not.
   *
   * @param {Event} event - The form submission event
   * @returns {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm(formData);
    if (Object.values(errors).some((res) => res !== "" && res !== null)) {
      setValidationErrors(errors);
      return;
    }

    const newData = {
      ...formData,
      reason: formData.reason.trim(),
      start: formatDateToISOString(formData.start),
      end: formatDateToISOString(formData.end, 1),
      file: proofFile,
    };

    setIsLoading(true);
    const action =
      leaveId !== null
        ? editStudentLeave({ headers, leaveId, leaveData: newData })
        : applyForLeave({ headers, leaveData: newData });

    dispatch(action)
      .then((res) => {
        if (res.payload !== undefined) {
          setFormData(initialState);
          handleClearFile();
          setProofFile(null);
          setValidationErrors({});
          handleClose();
          getAllLeavesData();
        }
      })
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 12);

  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 12);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          color: "#4E4E4E",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "20px" }}>
            {leaveId === null ? "Apply Leave" : "Edit Leave"}
          </Typography>
        </Box>
        <CloseIcon
          onClick={() => {
            handleClose();
            setProofFile(null);
          }}
          sx={{ cursor: "pointer" }}
        />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            mt: 1,
            flexDirection: { md: "row", sm: "row", xs: "column" },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography>Start Date</Typography>
            <TextField
              fullWidth
              size="small"
              type="date"
              name="start"
              value={formData?.start}
              onChange={handleFormInputs}
              error={!!validationErrors.start}
              helperText={validationErrors.start}
              inputProps={{
                min: sixMonthsAgo.toISOString().split("T")[0],
                max: sixMonthsFromNow.toISOString().split("T")[0],
                pattern: "\\d{4}-\\d{2}-\\d{2}",
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>End Date</Typography>
            <TextField
              fullWidth
              size="small"
              type="date"
              name="end"
              value={formData?.end}
              onChange={handleFormInputs}
              error={!!validationErrors.end}
              helperText={validationErrors.end}
              inputProps={{
                min: sixMonthsAgo.toISOString().split("T")[0], // Minimum date
                max: sixMonthsFromNow.toISOString().split("T")[0], // Maximum date
                pattern: "\\d{4}-\\d{2}-\\d{2}",
              }}
            />
          </Box>
        </Box>
        <Typography mt={1}>Reason</Typography>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          size="small"
          name="reason"
          value={formData?.reason || ""}
          onChange={handleFormInputs}
          error={!!validationErrors.reason}
          helperText={validationErrors.reason}
        />
        <Typography mt={1}>Document (Optional)</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", sm: "row", xs: "column" },
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              size="small"
              fullWidth
              value={
                proofFile === null
                  ? "No file chosen"
                  : proofFile?.name
                  ? proofFile?.name
                  : typeof proofFile === "string"
                  ? proofFile.substring(proofFile.lastIndexOf("/") + 1)
                  : "No file chosen"
              }
              name="proof_file"
              InputProps={{
                endAdornment: proofFile && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClearFile}
                      edge="end"
                      disabled={typeof proofFile === "string"}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <label htmlFor="proof-file-input">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
            <input
              id="proof-file-input"
              type="file"
              accept=".pdf,.png,.jpeg,.jpg" // Set accepted file types as needed
              style={{ display: "none" }}
              onChange={handleProofFile}
            />
          </Box>
        </Box>
      </Box>
      {days > 0 && (
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#E4E4E4",
            mt: 1,
            p: 1,
            gap: "10px",
          }}
        >
          <InfoOutlinedIcon />
          <Typography>Leave of {days} days would be applied </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          gap: "20px",
        }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            handleClose();
            handleClearFile();
          }}
        >
          cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : leaveId !== null ? (
            "Update"
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default ApplyLeaveModal;
