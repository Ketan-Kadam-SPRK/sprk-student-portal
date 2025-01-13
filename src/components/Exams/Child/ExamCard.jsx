import { Box, Typography, Button } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";

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
          backgroundColor: item.course_color,
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
          >{`Exam ID : ${item?.exam_id}`}</Typography>
        </Box>
        <img
          src={item?.course_img}
          alt="course_img"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small)",
          }}
        >{`Duration - ${item?.duration}`}</Typography>

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small)",
          }}
        >{`Assigned by - ${item?.assigned_by}`}</Typography>

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small) !important",
          }}
        >{`Start Date - ${item?.start}`}</Typography>

        <Typography
          sx={{
            fontSize: "var(--font-size-extra-small)",
          }}
        >{`End Date - ${item?.end}`}</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <StatusStyledComponent value={item?.exam_status} />

          <Button variant="contained">Start</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ExamCard;
