import { Box, Button, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import Lottie from "lottie-light-react";
import React from "react";
import courseLottie from "./explore-courses.json";
function ExploreCourses() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        overflow: "auto",
        flex: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4" fontWeight={600}>
          Want To Keep Learning?{" "}
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739422719/yellow_light_bulb_tpoisp.svg"
            style={{
              width: "25px",
              height: "auto",
              objectFit: "contain",
              marginLeft: "5px",
            }}
            cloudName="dxlzzgbfw"
          />
        </Typography>
        <Typography
          sx={{
            color: "#4D535A",
            fontSize: "var(--font-size-medium)",
          }}
        >
          Discover all the courses we offer and find the perfect one to expand
          your skills.{" "}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 1,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#6560F0",
            p: 2,
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "var(--font-size-medium)",
              fontWeight: "bold",
            }}
          >
            Explore our wide range of courses!
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            // minHeight: "60vh",
            flex: 1,
            gap: 1,
          }}
        >
          <Lottie
            animationData={courseLottie}
            loop={true}
            style={{ width: "40vw", minWidth: "200px", height: "auto" }}
          />
          <Typography
            sx={{
              color: "#0A2647",
              fontSize: "var(--font-size-medium)",
              fontWeight: "600",
            }}
          >
            Click the button below to explore more courses and download the
            syllabus.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              window.open(`${import.meta.env.VITE_APP_WEBSITE_LINK}`, "_blank");
            }}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ExploreCourses;
