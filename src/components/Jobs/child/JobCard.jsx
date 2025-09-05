import { Typography, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Image } from "cloudinary-react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import dateFormator from "../../../Utils/dateFormator";

function JobCard({ item }) {
  const navigate = useNavigate();

  /**
   * Returns the color and background color based on the given job status.
   *
   * @param {string} status - The status of the job. Can be "APPLIED", "NOT_APPLIED",
   * "UNPLACED", "PLACED", "DENIED", or any other unspecified status.
   * @returns {object} An object containing `color` and `backgroundColor` properties
   * corresponding to the provided status.
   */

  const getColorAndBackground = (status) => {
    switch (status) {
      case "APPLIED":
        return { backgroundColor: "#FFFFB8", color: "#783B09" };
      case "NOT_APPLIED":
        return { backgroundColor: "#D4D4D4", color: "#555555" };
      case "UNPLACED":
        return { backgroundColor: "#C0E5FF", color: "#37447D" };
      case "PLACED":
        return { backgroundColor: "#B0F7CC", color: "#239A60" };
      case "DENIED":
        return { backgroundColor: "#E0C8FF", color: "#2C004E" };
      default:
        return { backgroundColor: "white", color: "black" };
    }
  };

  const { color, backgroundColor } = getColorAndBackground(item?.status);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        borderRadius: "10px",
        p: 2,
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "10px",
          color: "white",
          background:
            "conic-gradient(from 270deg at 33.39% 0%, #0A2647 -53.54deg, var(--secondary-color) 192.88deg, #0A2647 306.46deg, var(--secondary-color) 552.88deg)",
          p: 3,
          gap: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            gap: 1,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontSize: "var(--font-size-medium)",
              color: "white",
            }}
            title={item?.job_title}
          >
            {item?.job_title}
          </Typography>
          <Typography
            fontWeight={400}
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "100%",
              fontSize: "var(--font-size-small)",
            }}
            title={item?.company_name}
          >
            {item?.company_name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon fontSize="14" />
            <Typography
              sx={{
                fontSize: "var(--font-size-small)",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "100%",
              }}
            >
              {item?.job_location}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "75px",
            width: "75px",
            minWidth: "75px",
          }}
        >
          <Image
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              borderRadius: "5px",
            }}
            publicId={item?.company_logo || ""}
            cloudName={
              item?.company_logo?.split("cloudinary.com/")[1]?.split("/")[0]
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          borderRadius: "0 0 10px 10px",
          backgroundColor: "white",
          gap: 0.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: "600",
              mr: 1,
              fontSize: "var(--font-size-small)",
            }}
          >
            Skills:
          </Typography>
          <Box
            sx={{
              display: "flex",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {item?.courses && item?.courses?.length > 0 && (
              <Typography
                sx={{
                  color: "black",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: "300px",
                  display: "inline-block",
                  fontSize: "var(--font-size-small)",
                }}
                title={item?.courses.join(", ")}
              >
                {item?.courses.join(", ")}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: "600",
              mr: 1,
              fontSize: "var(--font-size-small)",
            }}
          >
            Posted On:
          </Typography>
          <Typography sx={{ fontSize: "var(--font-size-small)" }}>
            {dateFormator(item?.posted_on)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: "600",
              mr: 1,
              fontSize: "var(--font-size-small)",
            }}
          >
            Closing Date:
          </Typography>
          <Typography sx={{ fontSize: "var(--font-size-small)" }}>
            {dateFormator(item?.closing_date)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: "600",
              mr: 1,
              fontSize: "var(--font-size-small)",
            }}
          >
            Job Status :
          </Typography>
          <Typography sx={{ fontSize: "var(--font-size-small)" }}>
            {item?.job_status}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            mt: 2,
            gap: 1,
          }}
        >
          <Typography
            onClick={() => {
              navigate(`/Job_Opportunities/${item?.job_uid}`);
            }}
            color="primary"
            fontSize={"var(--font-size-small)"}
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
            color={color}
            backgroundColor={backgroundColor}
            value={item?.status}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default JobCard;
