import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "./child/JobCard";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { getAllJobs } from "./jobs.actions";
import ErrorHandling from "../Common/ErrorHandling";

function JobOpportunities() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error500, setError500] = useState(false);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      setLoading(true);

      const res = await dispatch(getAllJobs({ headers }));
      const status = res?.payload?.status;
      const data = res?.payload?.data || [];
      const jobData = data?.sort(
        (a, b) => new Date(b?.posted_on) - new Date(a?.posted_on)
      );
      console.log(res);

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        setData(jobData);
      }
    } catch (err) {
      console.error("Error fetching practical exams:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || error500) {
    return <ErrorHandling error500={error500} loadData={loading} />;
  }
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
