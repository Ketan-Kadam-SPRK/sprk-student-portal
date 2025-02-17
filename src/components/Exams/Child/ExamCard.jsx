import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import { formatDateTime } from "../../../Utils/dateTimeFormator";
import { Close, InfoRounded } from "@mui/icons-material";
import ReportPreviewModal from "./ReportPreviewModal";
import LightTooltip from "../../Common/LightTooltip";

function ExamCard({ item }) {
  const [responseID, setResponseID] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDialog = (id) => {
    setResponseID(id);
    setOpen(!open);
  };
  const getStatusColor = (status) => {
    let color = "";
    let bgColor = "";

    switch (status) {
      case "SCHEDULED":
        color = "#52007A";
        bgColor = "#E4AEFF";
        break;
      case "ONGOING":
        color = "#0038A8";
        bgColor = "#C1D6FF";
        break;
      case "CANCELLED":
        color = "#3D3D3D";
        bgColor = "#D1D1D1";
        break;
      case "NOT_ATTEMPTED":
        color = "#755200";
        bgColor = "#FFF3A4";
        break;
      case "EVALUATING":
        color = "#A54700";
        bgColor = "#FFCDA7";
        break;
      case "PASS":
        color = "#1F5200";
        bgColor = "#CBFFAC";
        break;
      case "FAIL":
        color = "#9F0000";
        bgColor = "#FFB5B5";
        break;
    }

    return { color, bgColor };
  };

  const { color, bgColor } = getStatusColor(item?.status);

  const evaluting = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          backgroundColor: "white",
          p: 2,
        }}
      >
        <Typography
          sx={{ fontSize: "var(--font-size-small)", fontWeight: "bold" }}
        >
          Under Evalution
        </Typography>

        <Typography
          sx={{ fontSize: "var(--font-size-extra-small)", color: "grey" }}
        >
          Your exam is under review.{" "}
        </Typography>

        <Typography
          sx={{ fontSize: "var(--font-size-extra-small)", color: "grey" }}
        >
          Results will be updated once the process is complete.
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        // width: "350px",
        width: "100%",
        height: "100%",
        // maxWidth: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          backgroundColor: item?.course_color || "#0073E6",
          p: 2,
          borderRadius: "10px",
          flexWrap: "nowrap",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            flex: "1 1 auto", // Takes remaining space but does not push image
            minWidth: 0, // Prevents overflow issues
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "var(--font-size-medium)",
              fontWeight: "bold",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              minWidth: 0, // Prevents growing beyond available space
            }}
            title={item?.course_name?.join(" , ")}
          >
            {item?.course_name?.join(" , ")}
          </Typography>
          <Typography sx={{ color: "white" }}>
            {`Exam ID : ${item?.exam_uid}`}
          </Typography>
        </Box>

        <img
          src={
            item?.course_logo ||
            "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739339435/sprk_logo_registered1__1_x4akee.svg"
          }
          alt="course_logo"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            backgroundColor: item?.course_logo ? "transparent" : "white",
            boxShadow: item?.course_logo
              ? "none"
              : "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            borderRadius: item?.course_logo ? "none" : "10px",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {item?.duration >= 0 && item?.duration !== null && (
          <Typography
            sx={{
              fontSize: "var(--font-size-extra-small)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: "bold",
            }}
            color="primary"
          >
            {<AccessAlarmRoundedIcon color="primary" />}{" "}
            {`Duration : ${item?.duration || 0} mins`}
          </Typography>
        )}

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small)",
            fontWeight: "bold",
          }}
          color="primary"
        >
          {item?.batch_uid}
        </Typography>

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small)",
          }}
        >{`Assigned by : ${item?.assigned_by}`}</Typography>

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small) !important",
          }}
        >{`Start Date : ${formatDateTime(item?.start_date)}`}</Typography>

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small)",
          }}
        >{`End Date : ${formatDateTime(item?.end_date)}`}</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          <StatusStyledComponent
            color={color}
            backgroundColor={bgColor}
            value={item?.status}
          />

          {["SCHEDULED", "ONGOING"].includes(item?.status) && (
            <Button
              variant="contained"
              sx={{
                // backgroundColor: "#3C36EC",
                color: "white",
                // ":hover": {
                //   backgroundColor: "#3C36EC",
                // },
                borderRadius: "30px",
                width: "120px",

                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              onClick={() => {
                window.open(item?.exam_link, "_blank");
              }}
              disabled={item?.status === "NOT_ATTEMPTED"}
            >
              Start
            </Button>
          )}

          {["FAIL", "PASS", "EVALUATING"].includes(item?.status) &&
            !["PROJECT", "PRACTICAL"].includes(item?.assessment_type) && (
              <Button
                color={item?.status !== "EVALUATING" ? "secondary" : "inherit"}
                variant="contained"
                sx={{
                  backgroundColor:
                    item?.status !== "EVALUATING" ? "#9D28E0" : "#D8D8D8",
                  color: item?.status !== "EVALUATING" ? "white" : "black",
                  // ":hover": {
                  //   backgroundColor: "#3C36EC",
                  // },
                  borderRadius: "30px",
                  width: "120px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                onClick={() => {
                  item?.status !== "EVALUATING" &&
                    handleDialog(item?.exam_user_uid);
                }}
                endIcon={
                  item?.status === "EVALUATING" ? (
                    <LightTooltip title={evaluting()} arrow>
                      <InfoRounded sx={{ color: "black" }} />
                    </LightTooltip>
                  ) : null
                }
              >
                RESULT
              </Button>
            )}
        </Box>
      </Box>

      <Dialog open={open} onClose={handleDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", justifyContent: "flex-end", p: 0 }}>
          <IconButton onClick={() => handleDialog()}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ReportPreviewModal id={responseID} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ExamCard;
