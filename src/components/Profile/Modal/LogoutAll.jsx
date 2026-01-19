import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { freshToken } from "../../Login/store/login.actions";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import { Close } from "@mui/icons-material";
import {
  IconButton,
  Box,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import { setLogin } from "../../Login/store/authSlice";
import { jwtDecode } from "jwt-decode";

function LogoutAll({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headers = useAuthHeaders();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignoutAllDevices = () => {
    setIsSigningOut(true);
    dispatch(freshToken({ headers, isLogoutAll: true }))
      .then((res) => {
        if (res.payload !== undefined) {
          const newAccessToken = res.payload.token;
          const decodedToken = jwtDecode(newAccessToken);
          const userId = decodedToken.sub;
          handleClose();

          localStorage.setItem("token", newAccessToken);
          dispatch(
            setLogin({
              token: newAccessToken,
              userId: userId,
            })
          );
        }
        setIsSigningOut(false);
      })
      .catch((err) => {
        setIsSigningOut(false);
      });
  };

  return (
    <Box sx={{ padding: 3, position: "relative" }}>
      <IconButton
        onClick={() => {
          handleClose();
        }}
        sx={{ position: "absolute", top: 0, right: 0 }}
      >
        <Close sx={{ color: "grey" }} fontSize="medium" />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <ErrorRoundedIcon color="primary" fontSize='medium' /> */}
        <Typography
          sx={{
            fontSize: "var(--font-size-medium)",
            px: 2,
            mb: 1,
            fontWeight: "600",
          }}
        >
          Are you sure you want to Logout from Other devices?
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-evenly",
          mt: 2,
        }}
      >
        <Button
          sx={{
            px: 4,
            mt: 2,
          }}
          variant="outlined"
          onClick={handleClose}
        >
          No, Cancel{" "}
        </Button>
        <Button
          sx={{
            px: 4,
            mt: 2,
          }}
          variant="contained"
          onClick={handleSignoutAllDevices}
          disabled={isSigningOut}
        >
          {isSigningOut ? <CircularProgress size={24} /> : "Yes, Logout"}
        </Button>
      </Box>
    </Box>
  );
}

export default LogoutAll;
