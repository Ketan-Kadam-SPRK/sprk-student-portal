import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";

const Error_500 = () => {
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
      width: "200px",
    },
    link: {
      color: "#3989B8",
      cursor: "pointer",
      textDecoration: "underline",
    },
    title: {
      color: "#493193",
      fontWeight: 500,
      fontSize: { xs: "30px", sm: "40px", md: "50px" },
    },
    subtitle: {
      color: "#493193",
      fontWeight: 400,
      fontSize: { xs: "18px", sm: "24px", md: "28px" },
      marginBottom: "10px",
    },
  };

  return (
    <main style={styles.container}>
      <Typography sx={styles.title}>Oops!</Typography>
      <Typography sx={styles.subtitle}>
        The server is feeling a bit under the weather.
      </Typography>
      <Typography sx={styles.subtitle}>
        We'll nurse it back to health.
      </Typography>

      <Image
        style={styles.image}
        publicId="Group_793_kff0kr" // Use only the public ID, Cloudinary handles the rest
        cloudName="dxlzzgbfw"
        alt="Illustration of server error"
      />

      <Typography sx={styles.subtitle} style={{ marginTop: "30px" }}>
        Internal Service Error
      </Typography>
      <Typography sx={styles.subtitle}>
        Try refreshing the page or go to{" "}
        <Button sx={styles.link} onClick={handleBackNavigation}>
          Previous page
        </Button>
        .
      </Typography>
    </main>
  );
};

export default Error_500;
