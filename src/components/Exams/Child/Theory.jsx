import { Box, duration, Typography } from "@mui/material";
import React from "react";
import ExamCard from "./ExamCard";

function Theory() {
  const data = [
    {
      course_name: "Basic Excel",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      exam_status: "SCHEDULED",
      start: "2026-02-26T05:30:00Z",
      end: "2026-04-16T07:30:00Z",
      assigned_by: "Disha Shah",
      duration: "60",
      exam_id: "EX24DDEA7A",
      assentment_type: "FINAL",
    },
    {
      course_name: "Advance Excel",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      exam_status: "ONGOING",
      start: "2026-02-26T05:30:00Z",
      end: "2026-04-16T07:30:00Z",
      assigned_by: "Disha Shah",
      duration: "60",
      exam_id: "EX24DooA7A",
      assentment_type: "INTERNAL",
    },
    {
      course_name: "Core Java",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      exam_status: "Evaluating",
      start: "2026-02-26T05:30:00Z",
      end: "2026-04-16T07:30:00Z",
      assigned_by: "Disha Shah",
      duration: "160",
      exam_id: "EX24DkEA7A",
      assentment_type: "PRACTICE",
    },
    {
      course_name: "Core Java",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      exam_status: "Evaluating",
      start: "2026-02-26T05:30:00Z",
      end: "2026-04-16T07:30:00Z",
      assigned_by: "Disha Shah",
      duration: "160",
      exam_id: "EX24DkEA7A",
      assentment_type: "PRACTICE",
    },
    {
      course_name: "Core Java",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      exam_status: "Evaluating",
      start: "2026-02-26T05:30:00Z",
      end: "2026-04-16T07:30:00Z",
      assigned_by: "Disha Shah",
      duration: "160",
      exam_id: "EX24DkEA7A",
      assentment_type: "PRACTICE",
    },
    {
      course_name: "Core Java",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      exam_status: "Evaluating",
      start: "2026-02-26T05:30:00Z",
      end: "2026-04-16T07:30:00Z",
      assigned_by: "Disha Shah",
      duration: "160",
      exam_id: "EX24DkEA7A",
      assentment_type: "PRACTICE",
    },
    {
      course_name: "Core Java",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      exam_status: "Evaluating",
      start: "2026-02-26T05:30:00Z",
      end: "2026-04-16T07:30:00Z",
      assigned_by: "Disha Shah",
      duration: "160",
      exam_id: "EX24DkEA7A",
      assentment_type: "PRACTICE",
    },
    {
      course_name: "Core Java",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      exam_status: "Evaluating",
      start: "2026-02-26T05:30:00Z",
      end: "2026-04-16T07:30:00Z",
      assigned_by: "Disha Shah",
      duration: "160",
      exam_id: "EX24DkEA7A",
      assentment_type: "PRACTICE",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        height: "80vh",
        overflowY: "auto",
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {data.map((item, index) => (
          <ExamCard key={index} item={item} />
        ))}
      </Box>
    </Box>
  );
}

export default Theory;
