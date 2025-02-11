import { Badge, Box, Button, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import JobCard from "./child/JobCard";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { getAllJobs } from "./jobs.actions";
import ErrorHandling from "../Common/ErrorHandling";
import { formatForDisplay } from "../../Utils/formateForDisplay";
import NoDataPage from "../Common/NoDataPage";
import { Image } from "cloudinary-react";

function JobOpportunities() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error500, setError500] = useState(false);
  const [activeTAb, setActiveTab] = useState("NOT_APPLIED");

  const [count, setCount] = useState({
    APPLIED: 0,
    NOT_APPLIED: 0,
    UNPLACED: 0,
    PLACED: 0,
    DENIED: 0,
  });
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const status = ["NOT_APPLIED", "APPLIED", "UNPLACED", "PLACED", "DENIED"];

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
        let filterData = data?.filter((job) => job?.status === activeTAb);
        setFilteredData(filterData);
        setCount({
          APPLIED:
            jobData?.filter((job) => job?.status === "APPLIED")?.length || 0,
          NOT_APPLIED:
            jobData?.filter((job) => job?.status === "NOT_APPLIED")?.length ||
            0,
          UNPLACED:
            jobData?.filter((job) => job?.status === "UNPLACED")?.length || 0,
          PLACED:
            jobData?.filter((job) => job?.status === "PLACED")?.length || 0,
          DENIED:
            jobData?.filter((job) => job?.status === "DENIED")?.length || 0,
        });
      }
    } catch (err) {
      console.error("Error fetching practical exams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filterData = data?.filter((job) => job?.status === activeTAb);
    setFilteredData(filterData);
  }, [activeTAb]);

  console.log(count);

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
        <Image
          publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739254478/ccyolkdgxmljm4bmpkai.png"
          style={{
            width: "30px",
            height: "auto",
            objectFit: "contain",
            marginLeft: "5px",
          }}
          cloudName="dxlzzgbfw"
        />
      </Typography>
      <Typography fontSize={"var(--font-size-medium)"} fontStyle={"italic"}>
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
        <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
          {status?.map((res, index) => (
            <Button
              // variant={activeTAb === res ? "contained" : "outlined"}
              key={index}
              onClick={() => handleTabChange(res)}
              sx={{
                borderRadius: "5px",
                padding: "10px",
                width: "150px",
                minWidth: "150px",
                // boxShadow:
                //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                fontWeight: "bold",
                fontSize: "14px",
                gap: "10px",
                backgroundColor: activeTAb === res ? "#6560F0" : "#E0DFFF",
                color: activeTAb === res && "white",
              }}
              endIcon={
                <Badge badgeContent={count[res]} color="secondary"></Badge>
              }
            >
              {formatForDisplay(res)}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            flex: 1,
            p: 2,
            overflow: "auto",
            width: "100%",
          }}
        >
          {filteredData?.length > 0 ? (
            <Grid2
              container
              spacing={2}
              sx={{
                width: "100%",
                margin: 0,
                justifyContent: "start",
                alignItems: "stretch",
              }}
            >
              {filteredData?.map((item, index) => (
                <Grid2
                  key={index}
                  size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                  sx={{ border: "1px solidrgba(243, 107, 9, 0.89)" }}
                >
                  <JobCard key={index} item={item} />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <NoDataPage
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1738046047/Search_for_a_job_candidate_jeezzw.png"
              errorHeading="No job postings available right now!"
              errorDescription="We’re curating the best opportunities for you. Check back later."
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default JobOpportunities;
