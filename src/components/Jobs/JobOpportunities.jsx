import { Box, Typography } from "@mui/material";
import React from "react";
import JobCard from "./child/JobCard";

function JobOpportunities() {
  const data = [
    {
      job_uid: "JOWJEQ4P4LUELQ",
      comp_uid: "COMPcc5f3a46f3",
      comp_name: "Wipro",
      job_title: "Software Engineer",
      location: "Springfield",
      location_uid: null,
      required_skills: ["C44776fd3d", "Ca2e1b22c8", "Ca7817df73"],
      vacancies: null,
      job_description: null,
      job_status: "CLOSE",
      expiration_date: null,
      companylogo:
        "http://res.cloudinary.com/duttop4n6/image/upload/v1732270281/bqeu2cupyxyplakn9fpo.png",
      updatedAt: "2024-12-09T10:50:44.833283Z",
    },
    {
      job_uid: "JOZQAT68LFL4Y3",
      comp_uid: "COMPcc5f3a46f3",
      comp_name: "Wipro",
      job_title: "To test edit",
      location: "New York",
      location_uid: null,
      required_skills: ["C65c3aa188"],
      vacancies: null,
      job_description: null,
      job_status: "OPEN",
      expiration_date: null,
      companylogo:
        "http://res.cloudinary.com/duttop4n6/image/upload/v1732270281/bqeu2cupyxyplakn9fpo.png",
      updatedAt: "2024-11-24T08:14:21.587598Z",
    },
    {
      job_uid: "JO0S3298HHSTF7",
      comp_uid: "COMPcc5f3a46f3",
      comp_name: "Wipro",
      job_title: "Software Engineer",
      location: "Springfield",
      location_uid: null,
      required_skills: ["C65c3aa188"],
      vacancies: null,
      job_description: null,
      job_status: "CLOSE",
      expiration_date: null,
      companylogo:
        "http://res.cloudinary.com/duttop4n6/image/upload/v1732270281/bqeu2cupyxyplakn9fpo.png",
      updatedAt: "2024-12-16T13:34:49.432812Z",
    },

    {
      job_uid: "JO0S3298HHSTF7",
      comp_uid: "COMPcc5f3a46f3",
      comp_name: "Wipro",
      job_title: "Software Engineer",
      location: "Springfield",
      location_uid: null,
      required_skills: ["C65c3aa188"],
      vacancies: null,
      job_description: null,
      job_status: "CLOSE",
      expiration_date: null,
      companylogo:
        "http://res.cloudinary.com/duttop4n6/image/upload/v1732270281/bqeu2cupyxyplakn9fpo.png",
      updatedAt: "2024-12-16T13:34:49.432812Z",
    },
    {
      job_uid: "JO0S3298HHSTF7",
      comp_uid: "COMPcc5f3a46f3",
      comp_name: "Wipro",
      job_title: "Software Engineer",
      location: "Springfield",
      location_uid: null,
      required_skills: ["C65c3aa188"],
      vacancies: null,
      job_description: null,
      job_status: "CLOSE",
      expiration_date: null,
      companylogo:
        "http://res.cloudinary.com/duttop4n6/image/upload/v1732270281/bqeu2cupyxyplakn9fpo.png",
      updatedAt: "2024-12-16T13:34:49.432812Z",
    },
  ];
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
      <Typography variant="h4" fontWeight={"bold"}>
        Job Openings for You{" "}
      </Typography>
      <Typography fontSize={"var(--font-size-medium)"}>
        Stay ahead with opportunities selected just for you.{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          //   flex: 1,
          height: "100vh",
          backgroundColor: "white",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            // flex: 1,
            p: 2,
            overflow: "auto",
            width: "100%",
          }}
        >
          {data?.map((item, index) => (
            <JobCard key={index} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default JobOpportunities;
