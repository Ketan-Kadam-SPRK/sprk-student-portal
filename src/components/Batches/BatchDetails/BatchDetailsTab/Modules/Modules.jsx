import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Image } from "cloudinary-react";

function Modules() {
  const data = [
    {
      name: "Introduction To Excel - Ribbons & Tabs",
      sessions: [],
      faculties: [],
      status: "COMPLETED",
    },
    {
      name: "Introduction To Excel - Quick Access Toolbar",
      sessions: [],
      faculties: [],
      status: "COMPLETED",
    },
    {
      name: "Introduction To Excel - Mini Toolbar",
      sessions: [],
      faculties: [],
      status: "UPCOMING",
    },
    {
      name: "Introduction To Excel - Title, Help, Zoom, View",
      sessions: [],
      faculties: [],
      status: "UPCOMING",
    },
    {
      name: "Excel Worksheet - Moving On Worksheet",
      sessions: [],
      faculties: [],
      status: "UPCOMING",
    },
    {
      name: "Excel Worksheet - All Operations Related To Worksheet",
      sessions: [],
      faculties: [],
      status: "UPCOMING",
    },
    {
      name: "Excel Calculation - Addition ",
      sessions: [],
      faculties: [],
      status: "UPCOMING",
    },
    {
      name: "Excel Calculation - Sigma Addition",
      sessions: [],
      faculties: [],
      status: "UPCOMING",
    },
    {
      name: "Excel Calculation - Subtraction",
      sessions: [],
      faculties: [],
      status: "UPCOMING",
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "white",
        p: 2,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowY: "auto",
        gap: "10px",
      }}
    >
      {data?.length < 0 ? (
        data?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds a shadow
              borderRadius: "8px", // Rounds the corners
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box>
                {item?.status === "COMPLETED" ? (
                  <CheckCircleIcon sx={{ color: "#3D37D5" }} />
                ) : (
                  <CircleOutlinedIcon />
                )}
              </Box>
              <Box>
                <Typography sx={{ color: "#085186", fontWeight: 600 }}>
                  {item?.name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: 3,
                gap: "5px",
                backgroundColor:
                  item?.status === "COMPLETED" ? "#CDFEE1" : "#E4AEFF",
                py: 1,
                borderRadius: "25px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {item?.status === "COMPLETED" ? (
                  <Image
                    publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735798457/fluent-mdl2_completed_x9l58k.svg"
                    cloudName="dxlzzgbfw"
                  />
                ) : (
                  <Image
                    publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735798457/material-symbols_event-upcoming-outline-rounded_mvhlnh.svg"
                    cloudName="dxlzzgbfw"
                  />
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "10px", sm: "13px", md: "13px" },
                  fontWeight: "600",
                  color: item?.status === "COMPLETED" ? "#12472E" : "#52007A",
                }}
              >
                {item?.status}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            flex: 4,
          }}
        >
          <Typography sx={{ color: "grey", fontSize: "12px" }}>
            No Modules Found
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Modules;
