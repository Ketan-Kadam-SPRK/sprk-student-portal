import React, { forwardRef } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Grid2 from "@mui/material/Grid2";
import { changePassword } from "../../Login/store/login.actions";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
// import { changePassword } from "../store/authSlice";

const ChangePassword = forwardRef(({ handleClose }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
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
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await dispatch(
        changePassword({
          payload: {
            current_password: formData.currentPassword,
            new_password: formData.newPassword,
          },
          headers,
        })
      );
      setLoading(false);
      if (res.payload) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", p: 3 }}>
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
        <Grid2 sx={{ pt: 2 }} container spacing={2}>
          <Grid2 size={12}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "var(--font-size-medium)",
                  fontWeight: "bold",
                }}
              >
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
            <Typography
              sx={{
                fontSize: "var(--font-size-small)",
                fontWeight: "600",
              }}
            >
              Current Password :
            </Typography>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 8,
            }}
          >
            <TextField
              type={passwordVisibility.currentPassword ? "text" : "password"}
              fullWidth
              size="small"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setPasswordVisibility((prev) => ({
                            ...prev,
                            currentPassword: !prev.currentPassword,
                          }))
                        }
                      >
                        {passwordVisibility?.currentPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  autoComplete: "new-password",
                },
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
            <Typography
              sx={{
                fontSize: "var(--font-size-small)",
                fontWeight: "600",
              }}
            >
              New Password :
            </Typography>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 8,
            }}
          >
            <TextField
              type={passwordVisibility.newPassword ? "text" : "password"}
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
                          setPasswordVisibility((prev) => ({
                            ...prev,
                            newPassword: !prev.newPassword,
                          }))
                        }
                      >
                        {passwordVisibility?.newPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
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
            <Typography
              sx={{
                fontSize: "var(--font-size-small)",
                fontWeight: "600",
              }}
            >
              Confirm Password :
            </Typography>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 12,
              md: 8,
            }}
          >
            <TextField
              type={passwordVisibility.confirmPassword ? "text" : "password"}
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
                          setPasswordVisibility((prev) => ({
                            ...prev,
                            confirmPassword: !prev.confirmPassword,
                          }))
                        }
                      >
                        {passwordVisibility?.confirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
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
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={20} /> : "Change Password"}
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
});

export default ChangePassword;
