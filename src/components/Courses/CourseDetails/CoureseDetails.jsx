import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

function CoureseDetails() {
  const [data, setData] = useState({});
  const [expandedCourseId, setExpandedCourseId] = useState(null); // Track expanded course

  const getCourseDetailsAPi = async () => {
    try {
      const res = await axios.get("https://www.jsondataai.com/api/KV4Vh80");
      const data = await res.data;
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourseDetailsAPi();
  }, []);

  const handleExpandToggle = (courseId) => {
    // Toggle the expanded state of the course
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        p: 2,
      }}
    >
      <h1>{data.courseGroupName}</h1>

      <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        {data?.courses?.map((item) => (
          <Box
            key={item?.courseId}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              borderRadius: "10px",
              p: 2,
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
              backgroundColor: `${item?.color}`,
              cursor: "pointer",
            }}
            onClick={() => handleExpandToggle(item?.courseId)} // Handle card click
          >
            <Typography
              sx={{
                color: "white",
              }}
            >
              {item?.name}
            </Typography>
            <Typography
              sx={{
                color: "white",
              }}
            >
              {item?.bookings?.join(",")}
            </Typography>
            {expandedCourseId === item?.courseId && ( // Conditionally render modules
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: "10px",
                }}
              >
                {item?.modules?.map((module, index) => (
                  <Typography key={index}>{module}</Typography>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CoureseDetails;
