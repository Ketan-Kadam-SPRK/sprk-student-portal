import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Box>
                  <img
                    src={
                      item?.img ||
                      "https://res.cloudinary.com/droommwjk/image/upload/v1707483571/sprk/courses/excel_dxug6p.svg"
                    }
                    alt={item?.name || "Course Image"}
                    style={{
                      width: "70px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "var(--font-size-medium)",
                      fontWeight: "700",
                    }}
                  >
                    {item?.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      // p: 2,
                      borderRadius: "10px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {item?.bookings?.map((module, index) => (
                      <StatusStyledComponent
                        key={index}
                        value={module}
                        color={item?.color}
                        backgroundColor={"white"}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  transform: `rotate(${
                    expandedCourseId === item?.courseId ? 180 : 0
                  }deg)`,
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <ArrowDropDownCircleIcon sx={{ color: "white" }} />
              </Box>
            </Box>
            {expandedCourseId === item?.courseId && (
              <Box
                sx={{
                  // maxHeight:
                  //   expandedCourseId === item?.courseId ? "200px" : "0px",
                  transition: "max-height 0.3s ease",
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: "10px",
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {item?.modules?.map((module, index) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "var(--sidebar-bg-color)",
                      fontWeight: "600",
                      p: 2,
                      fontSize: "var(--font-size-small)",
                      borderRadius: "10px",
                      boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
                    }}
                  >
                    {`${index + 1}. ${module}`}
                  </Typography>
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
