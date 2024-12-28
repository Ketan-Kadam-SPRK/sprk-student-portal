import React from "react";
import { Box, Typography } from "@mui/material";
import CourseGrpCard from "./child/CourseGrpCard";

const Courses = () => {
  const data = [
    {
      course_group_name: "Web Development",
      course_group_id: 1,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "FULL STACK JAVA DEVELOPMENT",
      course_group_id: 3,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://www.achieversit.com/management/uploads/course_image/jfs11.png",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Full stack Mern Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      course_group_name: "Web Development",
      course_group_id: 2,
      total_courses: 3,
      status: "ONGOING",
      booked_at: "2023-06-01",
      course_start_date: "2023-06-01",
      tentative_end_date: "2023-06-01",
      bcn: "BCN14556D5D",
      persentage: 50,
      img_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 2,
      }}
    >
      <Typography variant="h4">Enrolled Courses </Typography>
      <Typography fontSize={"var(--font-size-small)"}>
        “Dive into your courses—every lesson is a tool for your dreams.”
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",

          flex: 1,
        }}
      >
        {data.map((item, index) => (
          <CourseGrpCard key={index} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Courses;
