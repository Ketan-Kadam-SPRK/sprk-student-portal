import React from "react";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { changePassword } from "../store/authSlice";

function ChangePassword({ handleClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    const payload = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };
    // dispatch(changePassword(payload));

    handleClose();
  };
  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={() => {
          handleClose();
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setErrors({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }}
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <CloseIcon sx={{ color: "grey" }} fontSize="medium" />
      </IconButton>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Grid2
          sx={{ pt: 2 }}
          container
          columnSpacing={{ xs: 2, sm: 3, md: 5 }}
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid2 size={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ fontSize: "24px" }}>
                Change Your Password
              </Typography>
            </Box>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 4,
            }}
          >
            <Typography>Current Password :</Typography>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 4,
            }}
          >
            <TextField
              type={currentPasswordVisible ? "text" : "password"}
              fullWidth
              size="small"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setCurrentPasswordVisible(!currentPasswordVisible)
                      }
                    >
                      {currentPasswordVisible ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                autoComplete: "new-password",
              }}
              error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword}
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 4,
            }}
          >
            <Typography>New Password :</Typography>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 4,
            }}
          >
            <TextField
              type={newPasswordVisible ? "text" : "password"}
              fullWidth
              size="small"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setNewPasswordVisible(!newPasswordVisible)
                        }
                      >
                        {newPasswordVisible ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  autoComplete: "new-password",
                },
              }}
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword}
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 4,
            }}
          >
            <Typography>Confirm Password :</Typography>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 4,
            }}
          >
            <TextField
              type={confirmPasswordVisible ? "text" : "password"}
              fullWidth
              size="small"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                      >
                        {confirmPasswordVisible ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  autoComplete: "new-password",
                },
              }}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />
          </Grid2>
          <Grid2 size={12}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button type="submit" variant="contained">
                Change Password
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
}

export default ChangePassword;
