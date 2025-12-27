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
import {
  setEntitleMents,
  setLogin,
  setOrgDetails,
  setUserDetails,
} from "./store/authSlice";
import { getUser, loginUser } from "./store/login.actions";
import TrimmedString from "../../Utils/TrimmedString";
import batchesLottie from "./batchesLottie.json";
import examLottie from "./examLottie.json";
import jobOpportunityLottie from "./job-opportunityLottie.json";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";
import rearrengePermission from "../../Utils/rearrengePermission";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State to manage form data
  const [formData, setFormData] = useState({
    eid: "",
    password: "",
    orgId: "",
  });

  const [errors, setErrors] = useState({
    isLoginIdValid: false,
    isPasswordValid: false,
    isOrgIdValid: false,
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
    }, 6000); // 7 seconds

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
      isOrgIdValid: name === "orgId" && value?.length > 0 ? "" : "",
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
      isOrgIdValid: !formData.orgId,
    }));

    // If either is invalid, reset captcha and exit
    if (!formData.eid || !formData.password || !formData.orgId) {
      resetCaptcha();

      return;
    }

    // Trim string values in the form data
    const updatedFormData = TrimmedString(formData);

    if (isHuman) {
      try {
        setIsLoading(true);

        const response = await dispatch(loginUser({ updatedFormData })); // console

        const data = response?.payload?.data;
        const status = response?.payload?.status;
        setStatus(status);
        setErrorMsg(response?.payload?.error);

        if (data?.token) {
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
          let newEntitlements = rearrengePermission(userDetails?.entitlements);
          console.log(newEntitlements);
          dispatch(setEntitleMents(newEntitlements));

          dispatch(
            setOrgDetails({
              orgDetails: {
                orgName: userDetails?.org_name,
                orgLogo: userDetails?.org_logo,
                orgAddress: userDetails?.org_address,
                orgWeb: userDetails?.org_web,
                orgCertificate: userDetails?.org_certificate,
                orgCode: userDetails?.org_code,
              },
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
      <Helmet>
        <title>{meta.login.title}</title>
        <meta name="description" content={meta.login.description} />
        <meta property="og:title" content={meta.login.title} />
        <meta property="og:description" content={meta.login.description} />
        <meta property="og:image" content={meta.login.ogImage} />
        <meta
          property="og:url"
          content={`https://student.sprktechnologies.in${meta.dashboard.url}`}
        />
      </Helmet>
      <Grid2
        size={{
          xs: 0,
          sm: 0,
          md: 6,
        }}
        sx={{
          position: "relative",
          display: { xs: "none", sm: "none", md: "flex" },
          backgroundColor: "#295DC5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo and Welcome Section */}
        <Box sx={{ position: "absolute", top: "10px", left: "10px" }}>
          <Image
            style={{ width: "180px" }}
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1738220565/sprk_logo_White_1_vajsin.png"
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
            style={{ width: "auto", height: "auto", objectFit: "contain" }}
          />
          {/* Indicators */}
          <Box
            display="flex"
            gap={1}
            marginTop={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {animations.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: activeAnimation === index ? 30 : 20,
                  height: 4,
                  borderRadius: "20px",
                  backgroundColor:
                    activeAnimation === index ? "white" : "#bdcef1",
                  transition: "width 0.3s ease, background-color 0.3s ease",
                  // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
                <Alert severity="error">Invalid Credentials !</Alert>
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
              sx={{ mt: 2, fontSize: "15px", fontWeight: "600" }}
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

            <Typography
              component="p"
              sx={{ mt: 2, fontSize: "15px", fontWeight: "600" }}
            >
              Organization ID
            </Typography>
            <TextField
              aria-required
              fullWidth
              size="small"
              placeholder="Organization ID"
              id="orgId"
              name="orgId"
              autoComplete="orgId"
              autoFocus
              onChange={handleFormInputs}
              value={formData.orgId}
              error={!!errors.isOrgIdValid}
              helperText={errors.isOrgIdValid && "Organization ID is required"}
            />

            {/* <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
              <Typography variant="body2"> Remember me</Typography>
            </Box> */}
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
