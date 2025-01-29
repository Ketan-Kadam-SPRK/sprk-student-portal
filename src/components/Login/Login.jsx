import { Backdrop, FormHelperText, Grid2 } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Image } from "cloudinary-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Lottie, { LottiePlayer } from "lottie-react";
import SprkLoader from "../../Lottie/SprkLoading.json";
import { setLogin, setUserDetails } from "./store/authSlice";
import { Checkbox } from "@mui/material";
import { getUser, loginUser } from "./store/login.actions";
import TrimmedString from "../../Utils/TrimmedString";
import batchesLottie from "./batchesLottie.json";
import examLottie from "./examLottie.json";
import jobOpportunityLottie from "./job-opportunityLottie.json";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State to manage form data
  const [formData, setFormData] = useState({
    eid: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    isLoginIdValid: false,
    isPasswordValid: false,
    captchaError: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isHuman, setIsHuman] = useState(false);

  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  // State for managing password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [captchaKey, setCaptchaKey] = useState(Date.now());

  const [activeAnimation, setActiveAnimation] = useState(0);

  const animations = [
    { data: batchesLottie, label: "Batches Animation" },
    { data: examLottie, label: "Exam Animation" },
    { data: jobOpportunityLottie, label: "Job Opportunities Animation" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnimation((prev) => (prev + 1) % animations.length);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, [animations.length]);

  const handleHcaptchaVerification = (token) => {
    if (token) {
      setIsHuman(true);
      setErrors((prev) => ({
        ...prev,
        captchaError: false,
      }));

      setFormData((prev) => {
        return {
          ...prev,
          hcaptcha_response: token,
        };
      });
    }
  };

  const handleFormInputs = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setErrors((prev) => ({
      ...prev,
      isLoginIdValid: name === "eid" && value?.length > 0 ? "" : "",
      isPasswordValid: name === "password" && value?.length > 0 ? "" : "",
    }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const resetCaptcha = () => {
    setIsHuman(false); // Reset the isHuman state

    setErrors((prev) => ({
      ...prev,
      captchaError: false,
    }));
    setCaptchaKey(Date.now()); // Re-render the HCaptcha component to reset the challenge
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors((prev) => ({
      ...prev,
      isLoginIdValid: !formData.eid,
      isPasswordValid: !formData.password,
    }));

    console.log(formData);
    // If either is invalid, reset captcha and exit
    if (!formData.eid || !formData.password) {
      resetCaptcha();

      return;
    }

    // Trim string values in the form data
    const updatedFormData = TrimmedString(formData);

    if (isHuman) {
      try {
        console.log("Form Data:", formData);
        setIsLoading(true);

        const response = await dispatch(loginUser({ updatedFormData })); // console
        console.log("response:", response);

        const data = response?.payload?.data;
        const status = response?.payload?.status;
        setStatus(status);
        // setErrorMsg(error);
        console.log("data.token:", data?.token);

        if (data?.token) {
          console.log("data.token:", data?.token);
          const accessToken = data?.token;

          const decodedToken = jwtDecode(accessToken);
          const userId = decodedToken.sub;
          const userResponse = await dispatch(getUser({ accessToken }));
          const userDetails = userResponse?.payload?.data || null;

          dispatch(
            setLogin({
              user: formData.eid,
              token: accessToken,
              userId,
            })
          );

          dispatch(
            setUserDetails({
              userDetails: userDetails,
            })
          );

          navigate(`/Dashboard`);
        } else {
          resetCaptcha();
        }
      } catch (error) {
        console.error("Login Failed:", error);
        // setIsSubmitError(true);
        resetCaptcha(); // Reset the CAPTCHA state
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        captchaError: true,
      }));
    }
  };

  return (
    <Grid2 container component="main" sx={{ minHeight: "100vh" }}>
      {/* Left side panel */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(255, 255, 255, 0.8)", // White with opacity
        }}
        open={isLoading}
      >
        <Lottie
          animationData={SprkLoader}
          loop={isLoading}
          style={{ width: "200px", height: "200px" }}
        />
      </Backdrop>
      <Grid2
        size={{
          xs: 0,
          sm: 0,
          md: 6,
        }}
        sx={{
          position: "relative",
          display: { xs: "none", sm: "none", md: "flex" },
          backgroundColor: "#0F488C",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo and Welcome Section */}
        <Box sx={{ position: "absolute", top: "10px", left: "10px" }}>
          <Image
            style={{ width: "150px" }}
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1690809251/sprk-logoRR_isa0xp.svg"
            cloudName="dxlzzgbfw"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lottie
            animationData={animations[activeAnimation].data}
            loop
            style={{ width: "800px", height: "auto" }}
          />

          {/* Label for Current Animation */}
          <Typography variant="h6">
            {animations[activeAnimation].label}
          </Typography>

          {/* Indicators */}
          <Box display="flex" gap={1} marginTop={2}>
            {animations.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor:
                    activeAnimation === index ? "blue" : "lightgray",
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </Box>
        </Box>
      </Grid2>

      {/* Right side panel */}
      <Grid2
        size={{
          xs: 12,
          sm: 12,
          md: 6,
        }}
        // component={Paper}
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        // square
      >
        <Box sx={{ width: "300px", maxWidth: "90%" }}>
          {/* Login Form */}
          <form noValidate onSubmit={handleSubmit}>
            <Typography sx={{ fontSize: "28px", fontWeight: "600" }}>
              Log in to your account
            </Typography>

            {/* Display error alert if submission fails */}
            {status === 403 || status === 500 ? (
              <Alert severity="error"> {errorMsg} </Alert>
            ) : (
              status === 401 && (
                <Alert severity="error"> Incorrect Username Or Password </Alert>
              )
            )}

            {/* Username or eid Input */}
            <Typography
              component="p"
              sx={{ mt: 2, fontSize: "15px", fontWeight: "600" }}
            >
              Student ID or Email
            </Typography>
            <TextField
              aria-required
              fullWidth
              size="small"
              placeholder="name@example.com"
              id="eid"
              name="eid"
              autoComplete="eid"
              autoFocus
              onChange={handleFormInputs}
              value={formData.eid}
              error={!!errors.isLoginIdValid}
              helperText={errors.isLoginIdValid && "Login id is required"}
            />

            {/* Password Input */}
            <Typography
              component="h1"
              sx={{ mt: 3, fontSize: "15px", fontWeight: "600" }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              required
              size="small"
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              onChange={handleFormInputs}
              value={formData.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={handlePasswordVisibility} edge="end">
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                  autoComplete: "new-password",
                },
              }}
              error={!!errors.isPasswordValid}
              helperText={errors.isPasswordValid && "Password is required"}
            />

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
              <Typography variant="body2"> Remember me</Typography>
            </Box>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <HCaptcha
                sitekey={import.meta.env.VITE_APP_CAPTCHA_SITE_KEY}
                onVerify={handleHcaptchaVerification}
                key={captchaKey}
              />
            </Box>
            {errors.captchaError && (
              <FormHelperText error>
                Please complete the hCaptcha challenge.
              </FormHelperText>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Log In"}
            </Button>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="body2">
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "none",
                    color: "#0074BD",
                    fontWeight: "bold",
                  }}
                >
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default Login;
