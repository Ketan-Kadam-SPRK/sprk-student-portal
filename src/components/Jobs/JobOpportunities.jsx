import { Badge, Box, Button, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import JobCard from "./child/JobCard";
import { getAllJobs } from "./jobs.actions";
import ErrorHandling from "../Common/ErrorHandling";
import { formatForDisplay } from "../../Utils/formateForDisplay";
import NoDataPage from "../Common/NoDataPage";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";

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
  /**
   * Handles tab change event. Sets the activeTab state to the selected tab.
   * @param {string} tab - The selected tab.
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const status = ["NOT_APPLIED", "APPLIED", "UNPLACED", "PLACED", "DENIED"];

  useEffect(() => {
    getJobs();
  }, []);

  /**
   * Fetches job opportunities from the server and updates the state accordingly.
   * @return {Promise<void>}
   */

  const getJobs = async () => {
    try {
      setLoading(true);

      const res = await dispatch(getAllJobs({ headers }));
      const status = res?.payload?.status;
      const data = res?.payload?.data?.data || [];
      const jobData = data?.sort(
        (a, b) => new Date(b?.posted_on) - new Date(a?.posted_on)
      );

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
        overflow: "auto",
        flex: 1,
      }}
    >
      <Helmet>
        <title>{meta.jobOpportunities.title}</title>
        <meta name="description" content={meta.jobOpportunities.description} />
        <meta property="og:title" content={meta.jobOpportunities.title} />
        <meta
          property="og:description"
          content={meta.jobOpportunities.description}
        />
        <meta property="og:image" content={meta.jobOpportunities.ogImage} />
        <meta
          property="og:url"
          content={`https://student.sprktechnologies.in${meta.jobOpportunities.url}`}
        />
      </Helmet>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          Job Openings for You{" "}
        </Typography>
        <Image
          publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739512032/magnifying_glass_ws5lix.svg"
          cloudName="dxlzzgbfw"
          style={{ objectFit: "contain", marginLeft: "5px" }}
          sx={{
            width: "auto",
            height: { xs: "20px", sm: "40px" },
          }}
        />
      </Box>
      <Box>
        <Typography fontSize={"var(--font-size-medium)"}>
          Stay ahead with opportunities selected just for you.{" "}
        </Typography>
        <Typography sx={{fontSize:{xs:"12px",sm:"14px"}}}>
          (Note: Applying to the jobs and not showing up may result in excluding
          you from future job opportunities.)
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "100vh",
          backgroundColor: "white",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            overflow: "auto",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {status?.map((res, index) => (
            <Button
              key={index}
              onClick={() => handleTabChange(res)}
              data-testid={`button-${res}`}
              sx={{
                borderRadius: "5px",
                padding: { xs: "5px", sm: "10px" },
                width: { xs: "100%", sm: "150px" },
                minWidth: "150px",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor:
                  activeTAb === res
                    ? "var(--secondary-color)"
                    : "var(--background-color)",
                color: activeTAb === res && "white",
                border: "1px solid var(--secondary-color)",
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
