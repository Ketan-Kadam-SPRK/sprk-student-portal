import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ProgressBar from "../Common/ProgressBar/ProgressBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Image } from "cloudinary-react";

function Certificates() {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const [activeStep, setActiveStep] = useState(0);

  const data = [
    {
      Booking_id: "BCN10180540",
      course_Name: "Fullstack in Java",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483574/sprk/courses/java_mbn80i.svg",
      certificate_status: "pending",
      theoryExam: true,
      ProjectExam: false,
      Attendance: false,
      fees: true,
    },
    {
      Booking_id: "BCN10180541",
      course_Name: "React Development",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483584/sprk/courses/react_j3mxql.svg",
      certificate_status: "to_review",
      theoryExam: true,
      ProjectExam: true,
      Attendance: false,
      fees: false,
    },
    {
      Booking_id: "BCN10180542",
      course_Name: "Python for Data Science",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483582/sprk/courses/python_x9slrg.svg",
      certificate_status: "ready",
      theoryExam: false,
      ProjectExam: true,
      Attendance: true,
      fees: true,
    },
    {
      Booking_id: "BCN10180543",
      course_Name: "Machine Learning",
      course_img:
        "https://res.cloudinary.com/droommwjk/image/upload/v1707483576/sprk/courses/machine-learning_rh4ndy.svg",
      certificate_status: "released",
      theoryExam: true,
      ProjectExam: true,
      Attendance: true,
      fees: true,
    },
  ];

  const getStepFromStatus = (status) => {
    switch (status) {
      case "pending":
        return 0;
      case "to_review":
        return 1;
      case "ready":
        return 2;
      case "released":
        return 3;
      default:
        return 0; // Default to step 0 for unknown statuses
    }
  };

  const renderStatusIcon = (status) => {
    return status ? (
      <CheckCircleIcon sx={{ color: "#77BC1F" }} />
    ) : (
      <CancelIcon sx={{ color: "#FF5252" }} />
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        // minHeight: "100vh",
        overflow: "auto",
        flex: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4" fontWeight={600}>
          Your Certificates
        </Typography>
        <Typography sx={{ color: "#4D535A" }}>
          Every achievement tells the story of your determination.
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#6560F0",
              p: 2,
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            <Typography sx={{ color: "white" }}>
              Track Your Certificate Updates
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            minHeight: "60vh",
            p: 2,
            gap: 5,
          }}
        >
          {data.map((item, index) => {
            const activeStep = getStepFromStatus(item.certificate_status); // Get activeStep for each item

            return (
              <Accordion
                key={item.Booking_id}
                expanded={expanded === item.Booking_id}
                sx={{ p: 2 }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(item.Booking_id);
                      }}
                    />
                  }
                  aria-controls={`${item.Booking_id}-content`}
                  id={`${item.Booking_id}-header`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "column",
                        lg: "row",
                      },
                      justifyContent: {
                        lg: "space-between",
                        md: "center",
                        sm: "center",
                        xs: "center",
                      },
                      alignItems: "center",
                      width: "100%",
                      gap: { lg: null, md: 2, sm: 2, xs: 2 },
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 3, width: "300px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          width: "80px",
                          height: "80px",
                          justifyContent: "center",
                          alignItems: "center",
                          p: 2,
                          borderRadius: "5px",
                          backgroundColor: "white",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        }}
                      >
                        <Image
                          publicId={item.course_img}
                          cloudName="dxlzzgbfw"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          {item.course_Name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#4D535A" }}>
                          {item.Booking_id}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: {
                          lg: "60%",
                          md: "100%",
                          sm: "100%",
                          xs: "100%",
                        },
                      }}
                    >
                      {/* Pass activeStep to ProgressBar */}
                      <ProgressBar activeStep={activeStep} />
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, mr: 2 }}>
                      <Button variant="contained">Preview</Button>
                      <Button variant="contained">
                        <SaveAltIcon />
                      </Button>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        lg: "row",
                        md: "row",
                        sm: "row",
                        xs: "column",
                      },
                      gap: { lg: "100px", md: "50px", sm: "30px", xs: "20px" },
                      justifyContent: "center",
                      py: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography>Theory Exam</Typography>
                      {renderStatusIcon(item.theoryExam)}
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography>Project Exam</Typography>
                      {renderStatusIcon(item.ProjectExam)}
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography>Attendance</Typography>
                      {renderStatusIcon(item.Attendance)}
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography>Fees Paid</Typography>
                      {renderStatusIcon(item.fees)}
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Certificates;
