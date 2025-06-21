import { Box, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import React, { useEffect, useState } from "react";

function NoDataPageDashboard({
  errorImgPublicId = null,
  errorHeading,
  errorDescription,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        p: 2,
        width: "100%",
        flex: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "var(--background-color)",
          width: "100%",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: 2,
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        {errorImgPublicId !== null && (
          <Box sx={{ mt: 2 }}>
            <Image
              publicId={errorImgPublicId}
              cloudName="dxlzzgbfw"
              style={{
                height: "100px",
                objectFit: "contain",
                "@media (max-width: 600px)": {
                  width: "70px",
                },
                // filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              }}
            />
          </Box>
        )}
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            color: "#3E2347",
            fontWeight: "bold",
          }}
        >
          {errorHeading}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "14px", md: "16px" },
            color: "#775383",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          {errorDescription}
        </Typography>
      </Box>
    </Box>
  );
}

export default NoDataPageDashboard;
