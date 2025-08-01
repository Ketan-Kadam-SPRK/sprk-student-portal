import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import swal from "sweetalert";

const FeedbackDialog = ({ open, handleClose }) => {
  const initialState = {
    name: "",
    Feedback_type: "",
    Feedback_desc: "",
  };
  const [proofFiles, setProofFiles] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

const handleFormInputs = (e) => {
  const { name, value } = e.target;

  // Update form data
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Validate individual field
  let errorMsg = "";

  if (name === "Feedback_type" && value.trim() === "") {
    errorMsg = "Feedback type is required";
  }

  if (name === "Feedback_desc") {
    if (value.trim() === "") {
      errorMsg = "Feedback description is required";
    } else if (value.trim().length < 10) {
      errorMsg = "Feedback description should be at least 10 characters long";
    } else if (value.length > 500) {
      errorMsg = "Feedback description should be at most 500 characters long";
    }
  }

  // Update errors
  setErrors((prev) => ({
    ...prev,
    [name]: errorMsg,
  }));
};


  const handleProofFile = (event) => {
    const files = Array.from(event.target.files);

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        swal({
          title: "Invalid File Type",
          text: `${file.name} is not a supported file type.`,
          icon: "error",
        });
        return false;
      }

      if (file.size > maxSize) {
        swal({
          title: "File Too Large",
          text: `${file.name} exceeds 1MB limit.`,
          icon: "error",
        });
        return false;
      }

      return true;
    });

    setProofFiles(validFiles);
  };

  const handleClearFile = () => {
    setProofFiles([]);
    document.getElementById("proof-file-input").value = null;
  };

  const handleDialogClose = () => {
    setFormData(initialState);
    setProofFiles([]);
    setErrors({});
    handleClose();
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.Feedback_type) {
      newErrors.Feedback_type = "Feedback type is required";
    }
    if (!formData.Feedback_desc || formData.Feedback_desc.trim().length < 10) {
      newErrors.Feedback_desc =
        "Feedback description should be at least 10 characters long";
    } else if (formData.Feedback_desc.length > 500) {
      newErrors.Feedback_desc =
        "Feedback description should be at most 500 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit logic here
    console.log("Submitted:", formData, proofFiles);

    handleDialogClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Feedback</Typography>
          <CloseIcon onClick={handleDialogClose} sx={{ cursor: "pointer" }} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <FormControl
              fullWidth
              sx={{ marginRight: 2 }}
              size="small"
              error={!!errors.Feedback_type}
            >
              <Typography id="feedback_type" sx={{ mb: 1 }}>
                What would you like to give feedback on :
              </Typography>
              <Select
                labelId="feedback_type"
                id="feedback_type"
                name="Feedback_type"
                value={formData.Feedback_type}
                onChange={handleFormInputs}
              >
                <MenuItem value="Technical_Issue">Technical Issue</MenuItem>
                <MenuItem value="Center_Experience">Center Experience</MenuItem>
                <MenuItem value="Faculty_Feedback">Faculty Feedback</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.Feedback_type && (
                <FormHelperText>{errors.Feedback_type}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <Typography sx={{ mb: 1 }}>
              Describe your issue or feedback :
            </Typography>
            <TextField
              name="Feedback_desc"
              fullWidth
              size="small"
              multiline
              rows={4}
              value={formData.Feedback_desc}
              onChange={handleFormInputs}
              error={!!errors.Feedback_desc}
              helperText={errors.Feedback_desc}
            />
          </Box>
          <Box>
            <Typography sx={{ mb: 1 }}>
              Upload Screenshots (if any) :
            </Typography>
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
                    proofFiles.length === 0
                      ? "No file chosen"
                      : proofFiles.map((f) => f.name).join(", ")
                  }
                  name="proof_file"
                  InputProps={{
                    endAdornment: proofFiles?.length > 0 && (
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
                  accept=".pdf,.png,.jpeg,.jpg"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleProofFile}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mr: 2,
            mb: 2,
          }}
        >
          <Button variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
