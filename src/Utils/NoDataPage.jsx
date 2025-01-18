import { Box, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import React, { useEffect, useState } from "react";

function NoDataPage({ errorImgPublicId, errorHeading, errorDescription }) {
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
      }}
    >
      <Box
        sx={{
          backgroundColor: "#E6E5FF",
          width: "100%",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: 2,
        }}
      >
        <Box sx={{ mt: 2 }}>
          <Image
            publicId={errorImgPublicId}
            cloudName="dxlzzgbfw"
            style={{
              width: isMobile ? "100px" : "212px",
              height: "auto",
              objectFit: "contain",
              "@media (max-width: 600px)": {
                width: "100px",
              },
              // filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "20px", md: "24px" },
            color: "#3E2347",
            fontWeight: "bold",
          }}
        >
          {errorHeading}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            color: "#775383",
            textAlign: "center",
          }}
        >
          {errorDescription}
        </Typography>
      </Box>
    </Box>
  );
}

export default NoDataPage;
