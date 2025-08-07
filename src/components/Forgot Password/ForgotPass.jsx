import {
  Box,
  TextField,
  Typography,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../Login/store/login.actions";
import { setLogout } from "../Login/store/authSlice";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";

function ForgotPass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [isHuman, setIsHuman] = useState(false);
  const [errors, setErrors] = useState({
    isLoginIdValid: false,
    isOrgIdValid: false,
    captchaError: false,
  });

  const captchaRef = useRef(null); // Use a ref for better control over the HCaptcha component

  useEffect(() => {
    dispatch(setLogout());
  }, []);

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
      isOrgIdValid: name === "orgId" && value?.length > 0 ? "" : "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrors((prev) => ({
      ...prev,
      isLoginIdValid: !formData.eid,
      isOrgIdValid: !formData.orgId,
    }));

    if (!formData.eid || !formData.orgId) {
      resetCaptcha();
      return;
    }

    if (isHuman) {
      try {
        setIsLoading(true);
        const res = await dispatch(forgotPassword({ payload: formData }));

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
      // resetCaptcha();
    }
  };

  console.log(errors);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        overflow: "auto",
        // backgroundColor: "#e5e5f7",
        // opacity: "0.8",
        // backgroundImage:
        //   "radial-gradient(#444cf7 0.75px, transparent 0.75px), radial-gradient(#444cf7 0.75px, #e5e5f7 0.75px)",
        // backgroundSize: "30px 30px",
        // backgroundPosition: " 0 0,15px 15px",
      }}
    >
      <Helmet>
        <title>{meta.forgotPassword.title}</title>
        <meta name="description" content={meta.forgotPassword.description} />
        <meta property="og:title" content={meta.forgotPassword.title} />
        <meta
          property="og:description"
          content={meta.forgotPassword.description}
        />
        <meta property="og:image" content={meta.forgotPassword.ogImage} />
        <meta
          property="og:url"
          content={`https://student.sprktechnologies.in${meta.forgotPassword.url}`}
        />
      </Helmet>
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
          <Typography
            sx={{ fontWeight: "bold", fontSize: "var(--font-size-large)" }}
          >
            Forgot Your Password?
          </Typography>
          <Typography sx={{ fontSize: "var(--font-size-medium)" }}>
            No worries, we’ll send you reset instructions.
          </Typography>
        </Box>
        <Box sx={{ width: { xs: "320px", sm: "400px" }, maxWidth: "100%" }}>
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            Student ID or Email
          </Typography>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Enter Student ID or Email"
            name="eid"
            onChange={handleFormInputs}
            error={errors.isLoginIdValid}
            helperText={
              errors.isLoginIdValid && "Student ID or Email is required"
            }
            fullWidth
          />
        </Box>
        <Box sx={{ width: { xs: "320px", sm: "400px" }, maxWidth: "100%" }}>
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
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
            onChange={handleFormInputs}
            value={formData.orgId}
            error={!!errors.isOrgIdValid}
            helperText={errors.isOrgIdValid && "Organization ID is required"}
          />
        </Box>
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
          sx={{ width: { xs: "320px", sm: "400px" }, maxWidth: "100%" }}
          disabled={isLoading}
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

export default ForgotPass;
