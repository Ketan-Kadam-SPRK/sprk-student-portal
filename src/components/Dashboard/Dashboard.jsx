import { Grid2, Box, Typography, CircularProgress } from "@mui/material";
import React from "react";
import BatchCard from "./Child/BatchCard";
import { Image } from "cloudinary-react";
import { modifyEventJson } from "../../Utils/ModifyEventJson";
import CircularWithValueLabel from "../Common/CircularProgressWithLable";
import BoxCard from "./Child/BoxCard";

function Dashboard() {
  const EventJson = [
    {
      bth_id: "BTH24FEBCJAV1",
      faculty_id: "SPRK24PANB5",
      faculty_name: "Pankaj Pawar",
      course_name: "Core Java",
      course_color: "#2B0948",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483574/sprk/courses/java_mbn80i.svg",
      bth_status: "ONHOLD",
      est_start: "2024-02-24T05:30:00Z",
      est_end: "2024-04-13T07:45:00Z",
      students: 19,
      zone: "Asia/Calcutta",
      week_days: ["SATURDAY"],
      sessions: [
        {
          session_id: "SSN24CF0897",
          start: "2024-02-24T05:30:00Z",
          end: "2024-02-24T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24E12934",
          start: "2024-03-02T05:30:00Z",
          end: "2024-03-02T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN248B00BD",
          start: "2024-03-09T05:30:00Z",
          end: "2024-03-09T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN2457FC44",
          start: "2024-03-16T05:30:00Z",
          end: "2024-03-16T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24965CD1",
          start: "2024-03-23T05:30:00Z",
          end: "2024-03-23T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
      ],
    },
    {
      bth_id: "BTH24MARBEXL31",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "Basic Excel",
      course_color: "#239A60",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg",
      bth_status: "BOOKED",
      est_start: "2026-02-26T05:30:00Z",
      est_end: "2026-04-16T07:30:00Z",
      students: 1,
      zone: "Asia/Calcutta",
      week_days: ["WEDNESDAY", "THURSDAY", "FRIDAY"],
      sessions: [
        {
          session_id: "SSN24DDEA7A",
          start: "2026-02-26T05:30:00Z",
          end: "2026-02-26T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN247CD325",
          start: "2026-02-27T05:30:00Z",
          end: "2026-02-27T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN247A19F7",
          start: "2026-03-05T05:30:00Z",
          end: "2026-03-05T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN249D06A5",
          start: "2026-03-06T05:30:00Z",
          end: "2026-03-06T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },

        {
          session_id: "SSN24C4D1EC",
          start: "2026-03-19T05:30:00Z",
          end: "2026-03-19T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24947357",
          start: "2026-03-20T05:30:00Z",
          end: "2026-03-20T07:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
      ],
    },
    {
      bth_id: "BTH24MARCPRG2",
      faculty_id: "SPRK24DIS81",
      faculty_name: "Disha Shah",
      course_name: "C Programming",
      course_color: "#472D30",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483565/sprk/courses/c_qtljqk.svg",
      bth_status: "BOOKED",
      est_start: "2024-07-09T06:30:00Z",
      est_end: "2025-01-21T08:30:00Z",
      students: 2,
      zone: "Asia/Calcutta",
      week_days: ["TUESDAY", "THURSDAY", "FRIDAY"],
      sessions: [
        {
          session_id: "SSN24D4EFE1",
          start: "2024-07-09T06:30:00Z",
          end: "2024-07-09T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24D0A44A",
          start: "2024-07-16T06:30:00Z",
          end: "2024-07-16T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24865B0A",
          start: "2024-07-23T06:30:00Z",
          end: "2024-07-23T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },

        {
          session_id: "SSN240EBA6A",
          start: "2024-11-12T06:30:00Z",
          end: "2024-11-12T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
        {
          session_id: "SSN24A9BF95",
          start: "2024-11-19T06:30:00Z",
          end: "2024-11-19T08:30:00Z",
          taken_by: null,
          conducted: false,
          conflict: null,
        },
      ],
    },
  ];

  const modifiedData = modifyEventJson(EventJson);

  console.log(modifiedData);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        p: 3,
        gap: 2,
      }}
    >
      {/* <Grid2 container spacing={2} wrap="wrap">
        <Grid2 size={{ xs: 12, md: 12 }}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          backgroundColor: "#0A2647",
          borderRadius: "20px",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "var(--font-size-large)", color: "white" }}>
          Welcome, Pooja Verma!
        </Typography>
        <Typography sx={{ fontSize: "var(--font-size-small)", color: "white" }}>
          Ready to achieve your next milestone?
        </Typography>

        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <BoxCard
            title="Ongoing"
            number="5"
            image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_fipttr.svg"
            bgColor="#6560F0"
          />

          <BoxCard
            title="Completed"
            number="5"
            image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_1_hcgvhn.svg"
            bgColor="#1F7C20"
          />
          <BoxCard
            title="Pending"
            number="5"
            image="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735027996/Vector_2_himwuf.svg"
            bgColor="#E0BB0D"
          />

          <Box>
            <Image
              cloudName="dxlzzgbfw"
              publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735023172/rb_2151295076_1_sgwsvj.svg"
              width="150"
              height="auto"
            />
          </Box>
        </Box>
      </Box>
      {/* </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}> */}
      {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #0073E6B8",
              gap: 4,
              minWidth: "300px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 4,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Image
                cloudName="dxlzzgbfw"
                publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735026332/attend_subtew.svg"
                width="50"
                height="50"
              />

              <Typography
                sx={{
                  fontSize: "var(--font-size-medium)",
                  fontWeight: "bold",
                  width: "150px",
                }}
              >
                Exam to go
              </Typography>

              <CircularWithValueLabel value={2} totalValue={5} />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 4,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Image
                cloudName="dxlzzgbfw"
                publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735026357/attend_2_pwyjuw.svg"
                width="50"
                height="50"
              />

              <Typography
                sx={{
                  fontSize: "var(--font-size-medium)",
                  fontWeight: "bold",
                  width: "150px",
                }}
              >
                Project to go
              </Typography>

              <CircularWithValueLabel value={4} totalValue={5} />
            </Box>
          </Box> */}
      {/* </Grid2>
      </Grid2> */}

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 12, md: 8 }}>
          <Box
            sx={{
              border: "1px solid #0000007D",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              borderRadius: "10px",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontSize: "var(--font-size-medium)", fontWeight: "bold" }}
              >
                Upcoming Batches
              </Typography>

              <Box>Today</Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "scroll",
              }}
            >
              {modifiedData.map((item, index) => (
                <BatchCard key={index} item={item} />
              ))}
            </Box>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #0073E6B8",
              gap: 4,
              minWidth: "200px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 4,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Image
                cloudName="dxlzzgbfw"
                publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735026332/attend_subtew.svg"
                width="50"
                height="50"
              />

              <Typography
                sx={{
                  fontSize: "var(--font-size-medium)",
                  fontWeight: "bold",
                  width: "150px",
                }}
              >
                Exam to go
              </Typography>

              <CircularWithValueLabel value={2} totalValue={5} />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 4,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Image
                cloudName="dxlzzgbfw"
                publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1735026357/attend_2_pwyjuw.svg"
                width="50"
                height="50"
              />

              <Typography
                sx={{
                  fontSize: "var(--font-size-medium)",
                  fontWeight: "bold",
                  width: "150px",
                }}
              >
                Project to go
              </Typography>

              <CircularWithValueLabel value={4} totalValue={5} />
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Dashboard;
