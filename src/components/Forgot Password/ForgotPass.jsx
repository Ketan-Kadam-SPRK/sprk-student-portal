import {
  Box,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import React, { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Image } from "cloudinary-react";

function ForgotPass() {
  const [formData, setFormData] = useState({});
  const [isHuman, setIsHuman] = useState(false);
  const [errors, setErrors] = useState({
    isLoginIdValid: false,
    captchaError: false,
  });

  const captchaRef = useRef(null); // Use a ref for better control over the HCaptcha component

  const handleHcaptchaVerification = (token) => {
    if (token) {
      setIsHuman(true);
      setErrors((prev) => ({
        ...prev,
        captchaError: false,
      }));

      setFormData((prev) => ({
        ...prev,
        hcaptcha_response: token,
      }));
    }
  };

  const resetCaptcha = () => {
    setIsHuman(false);
    setErrors((prev) => ({
      ...prev,
      captchaError: false,
    }));
    captchaRef.current.resetCaptcha(); // Properly reset the HCaptcha challenge
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors((prev) => ({
      ...prev,
      isLoginIdValid: !formData.eid,
    }));

    if (!formData.eid) {
      resetCaptcha();
      return;
    }

    if (isHuman) {
      try {
        console.log("Form Data:", formData);
      } catch (err) {
        console.log(err);
        resetCaptcha();
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        captchaError: true,
      }));
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
          publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1736319189/Problem_solving_and_critical_thinking_g7wkpu.svg"
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
            Forgot Your Password?
          </Typography>
          <Typography variant="h6">
            No worries, we’ll send you reset instructions.
          </Typography>
        </Box>
        <Box sx={{ width: "400px" }}>
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            Student ID or Email
          </Typography>
          <TextField
            size="small"
            variant="outlined"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, eid: e.target.value }))
            }
            error={errors.isLoginIdValid}
            helperText={
              errors.isLoginIdValid && "Student ID or Email is required"
            }
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

export default ForgotPass;
