import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import pagenotFoundLottie from "./404page.json";

function Error_404() {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
        // flex: 1,
      }}
    >
      <Lottie
        animationData={pagenotFoundLottie}
        loop={true}
        renderer="svg"
        style={{ width: "800px", height: "auto", maxWidth: "100%" }}
      />
      <Button variant="contained" onClick={handleBackNavigation}>
        Go Back
      </Button>
    </Box>
  );
}

export default Error_404;
