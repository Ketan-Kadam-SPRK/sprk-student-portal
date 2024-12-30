import { Typography, Box, Button } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

function CourseGrpCard({ item }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minWidth: "250px",
        display: "flex",
        flex: 1,
        flexBasis: "auto",
        flexDirection: "column",
        gap: "20px",
        borderRadius: "10px",
        p: 2,
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          p: 2,
          backgroundColor: "#7570FC",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "var(--font-size-medium)",
            textTransform: "capitalize",
            width: "200px",
          }}
        >
          {item?.course_group_name || "Web Dpment"}
        </Typography>

        <img
          src={item?.img_url}
          alt={item?.course_group_name}
          style={{
            width: "100px",
            height: "50px",
            objectFit: "contain",
            overflow: "hidden",
            borderRadius: "10px",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small)",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#1976D2",
          }}
        >
          <MenuBookRoundedIcon color="primary" fontSize="small" /> Total Courses
          : {item?.total_courses}
        </Typography>

        <StatusStyledComponent value={item?.status} />

        <Typography
          sx={{ fontSize: "var(--font-size-extra-small)" }}
        >{`Booking Date : ${item?.booked_at}`}</Typography>

        <Typography
          sx={{ fontSize: "var(--font-size-extra-small)" }}
        >{`Course Start Date : ${item?.course_start_date}`}</Typography>

        <Typography
          sx={{ fontSize: "var(--font-size-extra-small)" }}
        >{`Tentative End Date : ${item?.tentative_end_date}`}</Typography>

        <Typography
          sx={{ fontSize: "var(--font-size-extra-small)" }}
        >{`BCN : ${item?.bcn}`}</Typography>

        <Typography
          onClick={() => {
            navigate(`/courses/${item?.course_group_id}`);
          }}
          color="primary"
          fontSize={"var(--font-size-extra-small)"}
          fontWeight={"bold"}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          View Course Details{" "}
          <ArrowForwardIosRoundedIcon color="primary" fontSize="inherit" />
        </Typography>
      </Box>
    </Box>
  );
}

export default CourseGrpCard;
