import React, { use, useEffect, useState } from "react";
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
  FormHelperText,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { Feedback } from "@mui/icons-material";

const FeedbackDialog = ({ open, handleClose }) => {
  const initialState = {
    name: "",
    Feedback_type: "",
    Feedback_desc: "",
  };
  const [proofFile, setProofFile] = useState(null);
  const [formData, setFormData] = useState({});
  const userDetails = useSelector((state) => state.authSlice.userDetails);

  //   console.log(userDetails.name, "userDetails");

  useEffect(() => {
    if (userDetails) {
      setFormData((pre) => {
        return {
          ...pre,
          name: userDetails?.name,
        };
      });
    }
  }, [userDetails]);

  const handleFormInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formData, "formData");

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
    // if (proofFile?.id) {
    //   dispatch(deleteLeaveDoc({ headers, leaveId })).then((res) => {
    //     setProofFile(null); // Clear the file in the state
    //     document.getElementById("proof-file-input").value = null;
    //   });
    // }
    // setProofFile(null); // Clear the file in the state
    // if (formData?.file?.id) {
    //   setProofFile(formData?.file);
    // }
    // document.getElementById("proof-file-input").value = null;
    // Clear the input field
  };

  const handleDialogClose = () => {
  setFormData(initialState);
  setProofFile(null);
  handleClose();
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
            <Typography sx={{ mb: 1 }}>Full Name:</Typography>
            <TextField
              name="name"
              fullWidth
              size="small"
              value={formData.name}
              InputProps={{ readOnly: true }} // ✅ makes it read-only
            />
          </Box>
          <Box>
            <FormControl fullWidth sx={{ marginRight: 2 }} size="small">
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
              {/* <FormHelperText error>{errors.type}</FormHelperText> */}
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
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
              // You can add feedback submit logic here
            }}
          >
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
