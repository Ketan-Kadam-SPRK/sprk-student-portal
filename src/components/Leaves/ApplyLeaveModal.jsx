import React from "react";
import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import swal from "sweetalert";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { applyForLeave, editStudentLeave } from "./action/leaves.action";


function ApplyLeaveModal({
  handleClose,
  formData,
  setFormData,
  initialState,
  proofFile,
  setProofFile,
  leaveId,
  getAllLeavesData
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
    const errors = {};
    const startDate = new Date(data?.start);
    const endDate = new Date(data?.end);
    const sixMonthsLater = new Date(data?.start);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    if (!data?.start) {
      errors.start = "Please enter a valid start date";
    } else if (data.end && startDate > endDate) {
      errors.start = "Start date cannot be after end date";
    }

    if (!data?.end) {
      errors.end = "Please enter a valid end date";
    } else if (data.start && endDate < startDate) {
      errors.end = "End date cannot be start date";
    }

    if (!data?.reason) {
      errors.reason = "Reason is required";
    } else if (data?.reason?.length > 500) {
      errors.reason = "Reason should be less than 500 characters";
    } else if (data?.reason?.length < 10) {
      errors.reason = "Reason must be at least 10 characters long";
    }

    if (data.start && data.end) {
      if (endDate > sixMonthsLater) {
        errors.start =
          "The difference between start and end date cannot be greater than six months";
        errors.end =
          "The difference between start and end date cannot be greater than six months";
      }
    }

    return { ...validationErrors, ...errors };
  };

  /**
   * Handles input changes in the leave form. Validates the input based on the
   * field name and updates the formErrors state accordingly.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleFormInputs = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    if (name === "start" || name === "end") {
      if (value) {
        updatedValue = value;
      } else {
        updatedValue = "";
      }
    }

    const updatedFormData = { ...formData, [name]: updatedValue };

    setFormData(updatedFormData);
    const newErrors = { ...validationErrors, [name]: null };

    if (name === "start" || name === "end") {
      const startDate = updatedFormData?.start;
      const endDate = updatedFormData?.end;

      if (isNaN(new Date(endDate).getTime())) {
        newErrors.end = "Please enter a valid end date";
      }
      if (isNaN(new Date(startDate).getTime())) {
        newErrors.start = "Please enter a valid start date";
      }
      if (startDate && endDate) {
        if (startDate > endDate) {
          newErrors.start = "Start date cannot be after end date";
          newErrors.end = "End date cannot be before start date";
        } else {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const sixMonthsLater = new Date(start);
          sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

          if (end > sixMonthsLater) {
            newErrors.start =
              "The difference between start and end date cannot be greater than six months";
            newErrors.end =
              "The difference between start and end date cannot be greater than six months";
          } else {
            newErrors.start = null;
            newErrors.end = null;
          }
        }
      }
    }
    if (name === "reason") {
      if (!updatedFormData?.reason.trim()) {
        newErrors.reason = "Reason is required";
      } else if (updatedFormData?.reason?.length >= 500) {
        newErrors.reason = "Reason should be less than 500 characters";
      } else if (updatedFormData?.reason?.trim().length < 10) {
        newErrors.reason = "Reason must be at least 10 characters long";
      }
    }
    setValidationErrors(newErrors);
  };


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


  const handleClearFile = () => {
    setProofFile(null); // Clear the file in the state
    if (formData?.file?.id) {
      setProofFile(formData?.file);
    }
    document.getElementById("proof-file-input").value = null;
    // Clear the input field
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

  console.log(initialState, "initialState");

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
          console.log(res, "res");
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

  console.log(formData,"formData");
  console.log(proofFile,"proofFile");

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
          <Typography sx={{ fontSize: "20px" }}>Apply Leave</Typography>
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
                  : proofFile
              }
              name="proof_file"
              InputProps={{
                endAdornment: proofFile && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearFile} edge="end">
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


export default ApplyLeaveModal