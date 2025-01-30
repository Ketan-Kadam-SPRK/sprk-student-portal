import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";

function Error_404() {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "20px",
      textAlign: "center",
    },
    image: {
      height: "auto",
      width: "500px",
      maxWidth: "90%",
    },
    link: {
      color: "#3989B8",
      cursor: "pointer",
      textDecoration: "underline",
    },
    title: {
      color: "#493193",
      fontWeight: 600,
      fontSize: { xs: "30px", sm: "40px", md: "50px" },
    },
    subtitle: {
      color: "#493193",
      fontWeight: 400,
      fontSize: { xs: "16px", sm: "24px", md: "28px" },
      marginBottom: "10px",
    },
  };

  return (
    <Box sx={{ display: "flex", p: 3, justifyContent: "center" }}>
      <Box sx={styles.containercontainerStyle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <Image
            style={styles.image}
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1695706744/Group_787_y1w2bb.svg"
            cloudName="dxlzzgbfw"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <Typography sx={{ ...styles.subtitle }}>
            404 Error:Page not found
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography sx={{ ...styles.subtitle }}>
              Try refreshing the page or go to{" "}
              <Button sx={styles.link} onClick={handleBackNavigation}>
                Previous page
              </Button>
              .
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Error_404;
