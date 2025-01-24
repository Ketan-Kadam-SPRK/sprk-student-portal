import { Typography, Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import dateFormator from "../../../Utils/dateFormator";
import CircularProgressWithLabel from "../../Common/CircularProgressWithLable";

function CourseGrpCard({ item }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    let color = "";
    let backgroundColor = "";
    switch (status) {
      case "ON_GOING":
        color = "#0038A8";
        backgroundColor = "#C1D6FF";
        break;
      case "COMPLETED":
        color = "#368C00";
        backgroundColor = "#CBFFAC";
        break;
      case "EXPIRED":
        color = "#3D3D3D";
        backgroundColor = "#D1D1D1";
        break;
      case "PENDING":
        color = "#755200";
        backgroundColor = "#FFF3A4";
        break;
      default:
        color = "black";
        backgroundColor = "white";
        break;
    }
    return { color, backgroundColor };
  };

  const { color, backgroundColor } = getStatusColor(item?.status);

  return (
    <Box
      sx={{
        minWidth: "250px",
        display: "flex",
        // f: 4,
        // flex: 1,
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
          height: "130px",
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
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {item?.course_group || ""}
        </Typography>

        <img
          src={item?.logo}
          alt={item?.course_group || ""}
          style={{
            width: "100px",
            height: "50px",
            objectFit: "contain",
            overflow: "hidden",
            borderRadius: "10px",
          }}
        />
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "10px", px: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-extra-small)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "5px",
              color: "#1976D2",
            }}
          >
            <MenuBookRoundedIcon color="primary" fontSize="small" /> Total
            Courses : {item?.total_courses}
          </Typography>

          <CircularProgressWithLabel
            value={item?.total_courses > 1 ? item?.total_courses - 1 : 0}
            totalValue={item?.total_courses}
            progress={`${item?.total_courses - 1}/${item?.total_courses}`}
          />
        </Box>

        <Typography
          sx={{ fontSize: "var(--font-size-small)", fontWeight: "bold", mt: 3 }}
        >
          {item?.bcn}
        </Typography>

        <Typography
          sx={{ fontSize: "var(--font-size-extra-small)" }}
        >{`Booking Date : ${dateFormator(item?.booking_date)}`}</Typography>

        <Typography
          sx={{ fontSize: "var(--font-size-extra-small)" }}
        >{`Course Group Start : ${dateFormator(
          item?.course_start_date
        )}`}</Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Typography
            onClick={() => {
              navigate(`/Course_Groups/${item?.cg_uid}`);
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
            View Details{" "}
            <ArrowForwardIosRoundedIcon color="primary" fontSize="inherit" />
          </Typography>
          <StatusStyledComponent
            value={item?.status}
            color={color}
            backgroundColor={backgroundColor}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CourseGrpCard;
