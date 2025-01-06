import { Box, Typography } from "@mui/material";
import React from "react";
import BoxCard from "../Dashboard/Child/BoxCard";
import BatchCardHorizontal from "./child/BatchCardHorizontal";

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function generateRandomSessionWeeks(count) {
  const sessionWeeks = [];
  for (let i = 0; i < count; i++) {
    const start = getRandomDate(new Date(2024, 0, 30), new Date(2025, 1, 5)); // Random date in 2026
    const end = new Date(start);
    end.setHours(end.getHours() + 2); // Random session duration of 2 hours
    sessionWeeks.push({
      start: start.toISOString(),
      end: end.toISOString(),
      isConducated: Math.random() < 0.5, // Randomly true or false
    });
  }
  return sessionWeeks;
}

function Batches() {
  const arrData = [
    {
      bth_id: "BTH24MARBEXL31",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "Basic Excel",
      course_color: "#239A60",
      progress: 40,
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      bth_status: "ONGOING",
      est_start: "2026-02-26T05:30:00Z",
      est_end: "2026-04-16T07:30:00Z",
      students: 1,
      zone: "Asia/Calcutta",
      week_days: ["WEDNESDAY", "THURSDAY", "FRIDAY"],
      session_week: generateRandomSessionWeeks(3),
    },
    {
      bth_id: "BTH24FEBCJAV1",
      faculty_id: "SPRK24PANB5",
      faculty_name: "Pankaj Pawar",
      course_name: "Core Java",
      course_color: "#2B0948",
      progress: 19,
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483574/sprk/courses/java_mbn80i.svg",
      bth_status: "ONHOLD",
      est_start: "2024-02-24T05:30:00Z",
      est_end: "2024-04-13T07:45:00Z",
      students: 19,
      zone: "Asia/Calcutta",
      week_days: [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ],
      session_week: generateRandomSessionWeeks(5),
    },

    {
      bth_id: "BTH24MARBEXL312",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "Basic Excel",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      bth_status: "COMPLETED",
      est_start: "2026-02-26T05:30:00Z",
      est_end: "2026-04-16T07:30:00Z",
      students: 1,
      zone: "Asia/Calcutta",
      week_days: ["WEDNESDAY", "THURSDAY", "FRIDAY"],
      session_week: generateRandomSessionWeeks(4),
    },

    {
      bth_id: "BTH24MASBEXL31",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "Basic Excel",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      bth_status: "COMPLETED",
      est_start: "2026-02-26T05:30:00Z",
      est_end: "2026-04-16T07:30:00Z",
      students: 1,
      zone: "Asia/Calcutta",
      week_days: ["WEDNESDAY", "THURSDAY", "FRIDAY"],
      session_week: generateRandomSessionWeeks(1),
    },

    {
      bth_id: "BTH24MDDARBEXL31",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "Basic Excel",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      bth_status: "COMPLETED",
      est_start: "2026-02-26T05:30:00Z",
      est_end: "2026-04-16T07:30:00Z",
      students: 1,
      zone: "Asia/Calcutta",
      week_days: ["WEDNESDAY", "THURSDAY", "FRIDAY"],
      session_week: generateRandomSessionWeeks(7),
    },

    {
      bth_id: "BTH24KARBEXL31",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "Basic Excel ",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      bth_status: "COMPLETED",
      est_start: "2026-02-26T05:30:00Z",
      est_end: "2026-04-16T07:30:00Z",
      students: 1,
      zone: "Asia/Calcutta",
      week_days: ["WEDNESDAY", "THURSDAY", "FRIDAY"],
      session_week: [],
    },
  ];

  console.log(arrData);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          //   justifyContent: "space-around",
          gap: 2,
        }}
      >
        <BoxCard
          title="Ongoing Batches"
          number="5"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_fipttr.svg"
          bgColor="#6560F0"
        />

        <BoxCard
          title="Upcoming Batches"
          number="5"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
          bgColor="#8B06B7"
        />
        <BoxCard
          title="Onhold Batches"
          number="5"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_2_himwuf.svg"
          bgColor="#EFC400"
        />

        <BoxCard
          title="Completed Batches"
          number="5"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_fipttr.svg"
          bgColor="#1F7C20"
        />

        <BoxCard
          title="Total"
          number="203"
          image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
          bgColor="#EB7300"
        />
      </Box>

      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: "1px solid grey",
          borderRadius: "10px",
          flex: 1,
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          My Batches
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            flex: 1,
            overflow: "auto",
          }}
        >
          {arrData?.length > 0 ? (
            arrData?.map((item) => (
              <BatchCardHorizontal key={item.bth_id} item={item} />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ color: "grey" }}>
                No Batches Available
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Batches;
