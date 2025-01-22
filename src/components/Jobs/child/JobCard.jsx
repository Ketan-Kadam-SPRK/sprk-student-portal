import { Typography, Box, IconButton } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import dateFormator from "../../../Utils/dateFormator";
import CircularProgressWithLabel from "../../Common/CircularProgressWithLable";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDateTime } from "../../../Utils/dateTimeFormator";
import { Image } from "cloudinary-react";

function JobCard({ item }) {
  const navigate = useNavigate();

  console.log(item);
  const getStatusColor = (status) => {
    let color = "";
    let backgroundColor = "";
    switch (status) {
      case "Paid":
        color = "#1F5200";
        backgroundColor = "#CBFFAC";
        break;
      case "Pending":
        color = "#755200";
        backgroundColor = "#FFF3A4";
        break;
      case "Due":
        color = "#52007A";
        backgroundColor = "#E4AEFF";
        break;
      case "Overdue":
        color = "#9F0000";
        backgroundColor = "#FFB5B5";
        break;
      default:
        color = "black";
        backgroundColor = "white";
        break;
    }
    return { color, backgroundColor };
  };

  const { color, backgroundColor } = getStatusColor(item?.PaymentStatus);

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
          justifyContent: "space-between",
          alignItems: "center",
          height: "120px",
          borderRadius: "8px 8px 0 0",
          // width: "100%",
          color: "white",
          background:
            "conic-gradient(from 270deg at 33.39% 0%, #0A2647 -53.54deg, #6560F0 192.88deg, #0A2647 306.46deg, #6560F0 552.88deg)",
          p: 2,
          gap: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 1, overflow: "hidden", gap: 1 }}>
          <Box>
            <Typography
              fontSize={20}
              fontWeight={400}
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "100%",
              }}
              title={item?.comp_name}
            >
              {item?.comp_name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon />
            <Typography>{item?.location}</Typography>
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
            publicId={item?.companylogo || ""}
            cloudName={
              item?.companylogo?.split("cloudinary.com/")[1]?.split("/")[0]
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          borderRadius: "0 0 10px 10px",
          backgroundColor: "white",
          gap: 0.5,
        }}
      >
        <Box>
          <Typography
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              pl: 1,
              color: "#505050",
              fontSize: "18px",
              fontWeight: "600",
            }}
            title={item?.job_title}
          >
            {item?.job_title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
          <Typography sx={{ fontWeight: "600", mr: 1, color: "#505050" }}>
            Skills:
          </Typography>
          <Box
            sx={{
              display: "flex",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {item?.required_skills && item.required_skills.length > 0 && (
              <Typography
                sx={{
                  color: "black",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: "300px",
                  display: "inline-block",
                }}
                title={item?.required_skills.join(", ")}
              >
                {item?.required_skills.join(", ")}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
          <Typography sx={{ fontWeight: "600", mr: 1, color: "#505050" }}>
            Post Date:
          </Typography>
          <Typography>{formatDateTime(item?.updatedAt)}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            mt: 2,
          }}
        >
          <Box>
            <IconButton
            // onClick={() => {
            //   navigate(
            //     `/Placement/Job_Postings/${item?.job_uid}`, // Navigate to the URL
            //     {
            //       state: {
            //         job_uid: item?.job_uid,
            //       },
            //     }
            //   );
            // }}
            >
              View Details
            </IconButton>
          </Box>
          <Box
            sx={{
              borderRadius: "25px",
              px: 2,
              py: 1,
              backgroundColor:
                item?.job_status === "OPEN" ? "#B0F7CC" : "#999999",
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: item?.job_status === "OPEN" ? "#239A60" : "#414141",
                fontWeight: 600,
              }}
            >
              {item?.job_status}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default JobCard;
