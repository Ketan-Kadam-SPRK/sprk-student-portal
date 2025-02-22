import {
  Box,
  Typography,
  Button,
  FormHelperText,
  IconButton,
  CircularProgress,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState, useRef, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Image } from "cloudinary-react";
import { resetPassword } from "../Login/store/login.actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../Login/store/authSlice";

function ResetPass() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("id");

  useEffect(() => {
    dispatch(setLogout());
  }, []);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    hcaptcha_response: "",
  });
  const [isHuman, setIsHuman] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      resetCaptcha();
      return;
    }

    if (!formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Confirm password is required.",
      }));
      resetCaptcha();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      resetCaptcha();
      return;
    }

    if (isHuman) {
      try {
        setIsLoading(true);
        const res = await dispatch(
          resetPassword({
            payload: {
              password: formData.password,
              token: token,
            },
          })
        );

        if (res.payload) {
          navigate("/Login");
          setFormData({});
        }
        resetCaptcha();

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        resetCaptcha();
        setIsLoading(false);
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        captchaError: true,
      }));
      resetCaptcha();
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
          <Typography
            sx={{ fontWeight: "bold", fontSize: "var(--font-size-large)" }}
          >
            Set new password
          </Typography>
          <Typography
            sx={{
              fontSize: "var(--font-size-medium)",
              width: { xs: "320px", sm: "400px" },
              maxWidth: "100%",
            }}
          >
            Your new password must be different to previously used passwords.
          </Typography>
        </Box>

        <FormControl
          sx={{ width: { xs: "320px", sm: "400px" }, maxWidth: "100%" }}
        >
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            New Password
          </Typography>
          <OutlinedInput
            size="small"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password"
            error={Boolean(errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
            fullWidth
          />
          <FormHelperText id="password-helper-text" error>
            {errors.password}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{ width: { xs: "320px", sm: "400px" }, maxWidth: "100%" }}
        >
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            Confirm New Password
          </Typography>

          <OutlinedInput
            id="confirm-new-password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            autoComplete="current-password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleConfirmPassVisibility} edge="end">
                  {showConfirmPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
            error={Boolean(errors.confirmPassword)}
            fullWidth
            size="small"
          />
          <FormHelperText id="confirm-password-helper-text" error>
            {errors.confirmPassword}
          </FormHelperText>
        </FormControl>

        <Box
          sx={{
            width: { xs: "320px", sm: "400px" },
            maxWidth: "100%",
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
          disabled={isLoading}
          sx={{ width: { xs: "320px", sm: "400px" }, maxWidth: "100%" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Submit"}
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
          onClick={() => {
            navigate("/Login");
          }}
        >
          <ArrowBackRoundedIcon /> Back to log in
        </Typography>
      </Box>
    </Box>
  );
}

export default ResetPass;
