import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";



function CoureseDetails() {
  const navigate = useNavigate();

  const dummyData = {
    courseGroupName: "Web Development",
    courseGroupLogo: "",
    course_Status: "ONGOING",
    courseOverview:
      "The Full Stack Development - Java course offers a thorough exploration of both front-end and back-end development using Java technologies. It covers essential aspects of building dynamic web applications, including Java-based server-side programming with Spring Boot, creating responsive user interfaces with HTML, CSS, and JavaScript, and managing databases with JPA and Hibernate.",
    courseKeyFeatures: [
      "Full Stack Development",
      "Java Programming",
      "Spring Boot",
      "React",
      "Node.js",
      "Angular",
    ],
    courseGroupId: "CGN45DDF50",
    courses: [
      {
        name: "HTML & CSS",
        courseId: "CN45DDF51",
        color: "red",
        bookings: ["BCN45DDF55", "BCN45DDF56", "BCN45DDF57"],
        modules: [
          "Introduction to HTML",
          "CSS Fundamentals",
          "Responsive Web Design",
        ],
      },
      {
        name: "JavaScript",
        courseId: "CN45DDF52",
        color: "blue",
        bookings: ["BCN45DDF58", "BCN45DDF59", "BCN45DDF60"],
        modules: ["JavaScript Basics", "DOM Manipulation", "ES6 Features"],
      },
      {
        name: "PHP & MySQL",
        courseId: "CN45DDF53",
        color: "green",
        bookings: ["BCN45DDF61", "BCN45DDF62", "BCN45DDF63"],
        modules: [
          "Introduction to PHP",
          "MySQL Database Management",
          "Building Dynamic Websites",
        ],
      },
      {
        name: "React",
        courseId: "CN45DDF54",
        color: "orange",
        bookings: ["BCN45DDF64", "BCN45DDF65", "BCN45DDF66"],
        modules: [
          "Getting Started with React",
          "React Components",
          "State Management with Redux",
        ],
      },
      {
        name: "Node.js",
        courseId: "CN45DDF55",
        color: "purple",
        bookings: ["BCN45DDF67", "BCN45DDF68", "BCN45DDF69"],
        modules: [
          "Introduction to Node.js",
          "Building RESTful APIs",
          "Working with MongoDB",
        ],
      },
    ],
  };
  const [data, setData] = useState(dummyData);
  const [expandedCourseId, setExpandedCourseId] = useState(null); // Track expanded course

  // const getCourseDetailsAPi = async () => {
  //   try {
  //     const res = await axios.get("https://www.jsondataai.com/api/KV4Vh80");
  //     const data = await res.data;
  //     setData(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getCourseDetailsAPi();
  // }, []);

  const getStatusProperties = (status) => {
    switch (status) {
      case "ONGOING":
        return {
          style: { bgcolor: "#DDEBFF", color: "#0038A8" },
          icon: <RotateRightIcon sx={{ color: "#0038A8" }}/>,
        };
      case "COMPLETED":
        return {
          style: { bgcolor: "#CBFFAC", color: "#368C00" },
          icon: <CheckCircleOutlineIcon sx={{ color: "#368C00" }} />,
        };
      case "EXPIRED":
        return {
          style: { bgcolor: "#D1D1D1", color: "#3D3D3D" },
          icon: <InfoRoundedIcon sx={{ color: "#3D3D3D" }}/>,
        };
      default:
        return {
          style: { bgcolor: "#FFFFB8", color: "#783B09" },
          icon: <PauseCircleOutlineIcon />,
        };
    }
  };

  const handleExpandToggle = (courseId) => {
    // Toggle the expanded state of the course
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          gap: "20px",
        }}
      >
        {/* Back Button */}
        <Box sx={{ display: "flex" }}>
          <Button
            variant="outlined"
            sx={{ color: "#747474" }}
            onClick={() => navigate(-1)}
          >
            {<ArrowBackIcon />}
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              marginRight: "10px",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            COURSE GROUP STATUS :
          </Typography>
          {/* Display Batch Status with Styling */}
          <Box
            sx={{
              width: "150px",
              borderRadius: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px", // Add spacing between icon and text
              padding: "5px",
              ...getStatusProperties(data.course_Status).style,
            }}
          >
            {getStatusProperties(data.course_Status).icon}{" "}
            {/* Render the icon */}
            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
              {data.course_Status
                ? data.course_Status.replace("_", " ").toUpperCase()
                : "NA"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            p: 2,
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={
                <InfoRoundedIcon
                  sx={{ fontSize: "30px", color: "#0073E6 !important" }}
                />
              }
            >
              <Image
                publicId="https://res.cloudinary.com/droommwjk/image/upload/v1707483582/sprk/courses/python_x9slrg.svg"
                cloudName="dxlzzgbfw"
                style={{ color: "#0073E6 !important" }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "20px", sm: "25px", md: "30px" },
                  fontWeight: "bold",
                  ml: 2,
                }}
              >
                {data.courseGroupName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Box style={{ color: "#0074BD", fontWeight: 600 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#464646" }}
                  >
                    Course Overview
                  </Typography>
                  <Typography sx={{ color: "#6E6E6E" }}>
                    {data.courseOverview}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#464646" }}
                  >
                    Key Features
                  </Typography>
                  {data?.courseKeyFeatures?.map((item, index) => (
                    <Typography
                      key={index}
                      sx={{ marginLeft: 2, fontSize: "16px", color: "#6E6E6E" }}
                    >
                      {`${index + 1}. ${item}`}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

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
    </>
  );
}

export default CoureseDetails;
