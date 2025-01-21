import { Box, Typography, Button } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import { formatDateTime } from "../../../Utils/dateTimeFormator";

function ExamCard({ item }) {
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
        width: "350px",
        maxWidth: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          backgroundColor: item?.course_color,
          p: 2,
          borderRadius: "10px",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "white",
              fontSize: "var(--font-size-medium)",
              fontWeight: "bold",
            }}
          >
            {item?.course_name}
          </Typography>
          <Typography
            sx={{ color: "white" }}
          >{`Exam ID : ${item?.exam_uid}`}</Typography>
        </Box>
        <img
          src={item?.course_logo}
          alt="course_logo"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
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
            {`Duration - ${item?.duration || 0} mins`}
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
        >{`Assigned by - ${item?.assigned_by}`}</Typography>

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small) !important",
          }}
        >{`Start Date - ${formatDateTime(item?.start_date)}`}</Typography>

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small)",
          }}
        >{`End Date - ${formatDateTime(item?.end_date)}`}</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <StatusStyledComponent value={item?.exam_status} />

          <Button
            sx={{
              backgroundColor: "#3C36EC",
              color: "white",
              ":hover": {
                backgroundColor: "#3C36EC",
              },
              borderRadius: "30px",
              width: "100px",
            }}
          >
            Start
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ExamCard;
