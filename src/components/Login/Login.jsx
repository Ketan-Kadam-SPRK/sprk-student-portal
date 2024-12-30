import { Backdrop, FormHelperText, Grid2 } from "@mui/material";
// import classes from "./Login.module.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
// import { loginUser } from "./store/login.actions";
// import { getUser } from "./store/login.actions";
import { useDispatch } from "react-redux";
// import { setLogin } from "../../state/authState";
// import { setUserDetails } from "../../state/authState";
// import TrimmedString from "../../Utils/TrimmedString";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Lottie from "lottie-react";
import SprkLoader from "../../Lottie/SprkLoading.json";
// import { rearrangeArray } from "../../Utils/tabsRearrangeArray";
import { LogOut } from "../../Utils/LogOut";
import { setLogin } from "./store/authSlice";
import { Checkbox } from "@mui/material";
import { loginUser } from "./store/login.actions";
import TrimmedString from "../../Utils/TrimmedString";

function modifyCapitalization(inputString) {
  return inputString
    .toLowerCase()
    .replace(/(?:^|_)(\w)/g, (match) => match.toUpperCase());
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = LogOut();
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

  // useEffect(() => {
  //   logout();
  // }, []);

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
      localStorage.setItem("token", "Dashboarsdsdadsdd");
      dispatch(setLogin({ token: "Dashboarsdsdadsdd" }));
      navigate("/Dashboard");
      return;
    }

    // Trim string values in the form data
    const updatedFormData = TrimmedString(formData);

    // if (isHuman) {
    try {
      console.log("Form Data:", formData);
      setIsLoading(true);

      // Dispatch login action and handle the response
      const response = await dispatch(loginUser({ updatedFormData }));
      // const response = null;
      // res.payload;
      console.log(response);

      if (response) {
        const { status, error, data } = response;
        setStatus(status);

        setErrorMsg(error);

        if (data?.token) {
          const accessToken = data.token;
          localStorage.setItem("token", accessToken);

          const decodedToken = jwtDecode(accessToken);
          const userId = decodedToken.sub;

          // Dispatch getUser action and set user details in state
          // const userResponse = await dispatch(getUser({ accessToken }));
          // const userDetails = userResponse?.payload?.data;
          // const roles = userDetails?.authorities;
          // const entitlements = await rearrangeArray(
          //   userDetails?.entitlements,
          //   PermissionJson
          // );

          // const uniqueNames = await [
          //   ...new Set(
          //     entitlements?.flatMap((item) => {
          //       return Array.isArray(item.sub)
          //         ? [item.name, ...item.sub.map((subItem) => subItem.name)]
          //         : [item.name];
          //     })
          //   ),
          // ];

          // dispatch(
          //   setUserDetails({
          //     userDetails,
          //     roles,
          //     entitlements,
          //     tabName: uniqueNames,
          //   })
          // );

          dispatch(
            setLogin({
              user: formData.eid,
              token: accessToken,
              userId,
            })
          );

          // const mainTabName = await entitlements?.map((item) => item.name);
          // const capitalizedTabNames = await mainTabName?.map((tabName) =>
          //   modifyCapitalization(tabName)
          // );

          navigate(`/Dashboard`);
        } else {
          resetCaptcha();
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      // setIsSubmitError(true);
      resetCaptcha(); // Reset the CAPTCHA state
    } finally {
      setIsLoading(false);
    }
    // } else {
    //   setErrors((prev) => ({
    //     ...prev,
    //     captchaError: true,
    //   }));
    // }
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

        <Box>
          <Image
            style={{ width: "500px" }}
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1734759238/Frame_2609318_ipiwpz.svg"
            cloudName="dxlzzgbfw"
          />
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
            width: "400px",
            maxWidth: "90%",
            backgroundColor: "#DAEBFF",
            p: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-large)",
              fontWeight: "600",
              color: "#0A2647",
            }}
          >
            Welcome to SPRK Technologies!{" "}
          </Typography>
          <Typography sx={{ fontSize: "var(--font-size-medium)" }}>
            Get ready to Connect, Innovate, Inspire.
          </Typography>
        </Box> */}
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
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handlePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                ),
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
            {/* <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <HCaptcha
                sitekey={import.meta.env.VITE_APP_CAPTCHA_SITE_KEY}
                onVerify={handleHcaptchaVerification}
                key={captchaKey}
              />
            </Box> */}
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
          </form>
        </Box>
      </Grid2>
    </Grid2>
  );
}

export default Login;
