import { Box, Button, colors, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import BoxCard from "../../Dashboard/Child/BoxCard";
import { Image } from "cloudinary-react";
import BatchDetailsTab from "./BatchDetailsTab/BatchDetailsTab";

function BatchDetails() {
  const getStatusStyle = (status) => {
    switch (status) {
      case "ONGOING":
        return { bgcolor: "#DDEBFF", color: "#1C4963" };
      case "UPCOMING":
        return { bgcolor: "#E0C8FF", color: "#2C004E" };
      case "CANCELLED":
        return { bgcolor: "#FFC0C0", color: "#A30000" };
      case "COMPLETED":
        return { bgcolor: "#B0F7CC", color: "#239A60" };
      case "ON HOLD":
        return { bgcolor: "#FFFFB8", color: "#783B09" };
      case "BOOKED":
        return { bgcolor: "#FFFFB8", color: "#783B09" };
      default:
        return { bgcolor: "#FFFFB8", color: "#783B09" };
    }
  };
  // const statusStyle = getStatusStyle(data?.status);

  return (
    <Box sx={{height:'100vh'}}>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 25px",
          gap: "20px",
        }}
      >
        {/* Back Button */}
        <Box sx={{ display: "flex" }}>
          <Button
            variant="outlined"
            sx={{ color: "#747474" }}
            // onClick={handleBackButtonClick}
          >
            {<ArrowBackIcon />}
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              marginRight: "10px",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            BATCH STATUS:
          </Typography>
          {/* Display Batch Status with Styling */}
          <Box
            sx={{
              width: "100px",
              borderRadius: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              padding: "5px",
              // ...statusStyle,
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
              {/* {data?.status
                ? data.status.replace("_", " ").toUpperCase()
                : "NA"} */}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={4} lg={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: "10px",
                backgroundColor: "white",
                borderRadius: "10px",
                p: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Image
                  publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735558467/fluent_apps-list-detail-24-filled_hqp6d5.svg"
                  cloudName="dxlzzgbfw"
                />
                <Typography sx={{ fontWeight: "bold", fontSize: "30px" }}>
                  BTH24139
                </Typography>
              </Box>
              <Box sx={{color:'#0074BD'}}>
                <Typography>Course Name: React JS</Typography>
                <Typography>Faculty Name: Vivek Mhatre</Typography>
                <Typography>Days: MON | TUES | WED | THURS | FRI</Typography>
                <Typography>Start Date: 02 Dec 2025</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                //   justifyContent: "space-around",
                gap: 2,
              }}
            >
              <BoxCard
                title="Sessions Completed"
                number="5"
                image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
                bgColor="#6560F0"
              />

              <BoxCard
                title="Attended"
                number="5"
                image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
                bgColor="#5B9B39"
              />

              <BoxCard
                title="Not Attended"
                number="5"
                image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
                bgColor="#DF5353"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px:2 }}>
        <BatchDetailsTab/>
      </Box>
    </Box>
  );
}

export default BatchDetails;
