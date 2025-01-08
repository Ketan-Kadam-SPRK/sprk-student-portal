import {
  Box,
  TextField,
  Typography,
  Button,
  FormHelperText,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Image } from "cloudinary-react";

function ResetPass() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    hcaptcha_response: "",
  });
  const [isHuman, setIsHuman] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    captchaError: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleConfirmPassVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const captchaRef = useRef(null); // Use a ref for better control over the HCaptcha component
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password:
          value.length < 8 ? "Password must be at least 8 characters." : "",
      }));
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== formData.password ? "Passwords do not match." : "",
      }));
    }
  };

  const handleHcaptchaVerification = (token) => {
    if (token) {
      setIsHuman(true);
      setErrors((prev) => ({ ...prev, captchaError: false }));
      setFormData((prev) => ({ ...prev, hcaptcha_response: token }));
    }
  };

  const resetCaptcha = () => {
    setIsHuman(false);
    setErrors((prev) => ({ ...prev, captchaError: false }));
    captchaRef.current.resetCaptcha();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;

    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      valid = false;
    }

    if (!formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm password is required.",
      }));
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      valid = false;
    }

    if (!isHuman) {
      setErrors((prev) => ({ ...prev, captchaError: true }));
      valid = false;
    }

    if (valid) {
      console.log("Form Data Submitted:", formData);
    } else {
      //   resetCaptcha();
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1736342059/Web_security_rawiwv.svg"
          cloudName="dxlzzgbfw"
          width="150"
        />
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            p: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Set new password
          </Typography>
          <Typography variant="h6" maxWidth={"500px"}>
            Your new password must be different to previously used passwords.
          </Typography>
        </Box>
        <Box sx={{ width: "400px" }}>
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            New Password
          </Typography>
          <TextField
            size="small"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password"
            error={Boolean(errors.password)}
            helperText={errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={handlePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
              },
            }}
            fullWidth
          />
        </Box>
        <Box sx={{ width: "400px" }}>
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            Confirm New Password
          </Typography>
          <TextField
            size="small"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            name="confirmPassword"
            autoComplete="current-password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={handleConfirmPassVisibility} edge="end">
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                ),
              },
            }}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            fullWidth
          />
        </Box>

        <Box
          sx={{
            width: "400px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <HCaptcha
            sitekey={import.meta.env.VITE_APP_CAPTCHA_SITE_KEY}
            onVerify={handleHcaptchaVerification}
            ref={captchaRef} // Using ref instead of key for reset
          />
          {errors.captchaError && (
            <FormHelperText error>
              Please complete the hCaptcha challenge.
            </FormHelperText>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ width: "400px" }}
        >
          Submit
        </Button>

        <Typography
          variant="body1"
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#565656",
            "&:hover": {
              color: "#3989B8",
            },
          }}
        >
          <ArrowBackRoundedIcon /> Back to log in
        </Typography>
      </Box>
    </Box>
  );
}

export default ResetPass;
