import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CourseGrpCard from "./child/CourseGrpCard";
import { getCourseGrpDetails } from "./course.actions";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";

const Courses = () => {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [courseData, setCourseData] = useState([]);

  const getCourseDetailsAPi = async () => {
    try {
      const res = await dispatch(getCourseGrpDetails({ headers }));
      const data = await res.payload.data;
      setCourseData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourseDetailsAPi();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 2,
      }}
    >
      <Typography variant="h4" fontWeight={"bold"}>
        Your Programs at a Glance{" "}
      </Typography>
      <Typography fontSize={"var(--font-size-medium)"}>
        The road to mastery is through continuous learning. Stay curious, stay
        inspired.{" "}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          flex: 1,
        }}
      >
        {courseData.map((item, index) => (
          <CourseGrpCard key={index} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Courses;
