import { Accordion, AccordionDetails, AccordionSummary, Box, Button, colors, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import BoxCard from "../../Dashboard/Child/BoxCard";
import { Image } from "cloudinary-react";
import BatchDetailsTab from "./BatchDetailsTab/BatchDetailsTab";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

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
    <Box sx={{ height: "100vh",}}>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          p: 2,
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
      <Box sx={{ px:2,pt:2, display: "flex", gap:2,flexDirection:"column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
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
        <Accordion>
          <AccordionSummary
            expandIcon={
              <InfoRoundedIcon
                sx={{ fontSize: "30px", color: "#CCCCCC !important" }}
              />
            }
          >
            <Image
              publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1703153520/Vector_3_rnkyxa.svg"
              cloudName="dxlzzgbfw"
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "20px", sm: "25px", md: "30px" },
                fontWeight: "bold",
                ml: 2,
              }}
            >
              BTH24139
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
            <Typography>Course Name: React JS</Typography>
            <Typography>Faculty Name: Vivek Mhatre</Typography>
            <Typography>Days: MON | TUES | WED | THURS | FRI</Typography>
            <Typography>Start Date: 02 Dec 2025</Typography>
            </div>
          </AccordionDetails>
        </Accordion>
        </Box>
      </Box>
      <Box sx={{ px: 2 }}>
        <BatchDetailsTab />
      </Box>
    </Box>
  );
}

export default BatchDetails;
