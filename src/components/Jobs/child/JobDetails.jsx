import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatDateTime } from "../../../Utils/dateTimeFormator";
import { Language, LinkedIn, Mail } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getJobDetais } from "../jobs.actions";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import ErrorHandling from "../../Common/ErrorHandling";
import { formatForDisplay } from "../../../Utils/formateForDisplay";
import DenyJobDialog from "./DenyJobDialog";
import ApplyJobDialog from "./ApplyJobDialog";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import dateFormator from "../../../Utils/dateFormator";

function JobDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [count, setCount] = useState({
    applied: 0,
    notApplied: 0,
    unplaced: 0,
    placed: 0,
    denied: 0,
  });

  const { jobid } = useParams(); // Destructure the parameter from useParams
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error500, setError500] = useState(false);
  const [error404, setError404] = useState(false);

  const [openApl, setOpenApl] = useState(false);
  const handleAplDialog = () => {
    setOpenApl(!openApl);
  };

  const [openDen, setOpenDen] = useState(false);
  const handleDenDialog = () => {
    setOpenDen(!openDen);
  };

  useEffect(() => {
    getJobsDetailsById();
  }, [jobid]);

/**
 * Fetches job details by id from the server and updates the state.
 * @returns {Promise<void>}
 */
  const getJobsDetailsById = async () => {
    try {
      setLoading(true);

      const res = await dispatch(getJobDetais({ headers, id: jobid }));
      const status = res?.payload?.status;
      const jobData = res?.payload?.data?.data || {};

      if (status === 500 || status === 503 || status === 502) {
        setError500(true);
      }
      if (status === 404 || status === 400) {
        setError404(true);
      } else {
        setData(jobData);
      }
    } catch (err) {
      console.error("Error fetching practical exams:", err);
    } finally {
      setLoading(false);
    }
  };

  const getColorAndBackground = (status) => {
    switch (status) {
      case "APPLIED":
        return { backgroundColor: "#FFFFB8", color: "#783B09" };
      case "NOT_APPLIED":
        return { backgroundColor: "#D4D4D4", color: "#555555" };
      case "UNPLACED":
        return { backgroundColor: "#C0E5FF", color: "#37447D" };
      case "PLACED":
        return { backgroundColor: "#B0F7CC", color: "#239A60" };
      case "DENIED":
        return { backgroundColor: "#E0C8FF", color: "#2C004E" };
      case "EXCLUDED":
        return { backgroundColor: "#FFB5B5", color: "#9F0000" };
      default:
        return { backgroundColor: "white", color: "black" };
    }
  };

  const { color, backgroundColor } = getColorAndBackground(data?.status);

  if (loading || error500 || error404) {
    return (
      <ErrorHandling
        error500={error500}
        loadData={loading}
        notFound={error404}
      />
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        // minHeight: "100vh",
        overflow: "auto",
        flex: 1,
      }}
    >
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
            Placement Status :
          </Typography>
          {/* Display Batch Status with Styling */}
          <StatusStyledComponent
            color={color}
            backgroundColor={backgroundColor}
            value={data?.status}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          p: 2,
          m: 2,
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Image
              cloudName="dxlzzgbfw"
              publicId={data?.company_logo}
              width="100"
              height="100"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain", // Ensures proper scaling
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <Typography
                sx={{
                  fontSize: "var(--font-size-medium)",
                  fontWeight: "bold",
                  color: "#0A2647",
                }}
              >
                {data?.job_title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "var(--font-size-medium)",
                  fontWeight: "bold",
                  color: "#0A2647",
                }}
              >{`${data?.company_name} | ${data?.job_uid}`}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              onClick={handleAplDialog}
              disabled={
                data?.job_status === "CLOSE" || data?.status !== "NOT_APPLIED"
              }
            >
              Apply
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDenDialog}
              disabled={
                data?.job_status === "CLOSE" || data?.status !== "NOT_APPLIED"
              }
            >
              Deny
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            sx={{ fontSize: "var(--font-size-small)", fontWeight: "bold" }}
          >
            Skills
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {data?.skills?.map((skill, index) => (
              <Chip
                label={skill}
                key={index}
                sx={{
                  fontSize: "var(--font-size-extra-small)",
                  backgroundColor: "#0073E6",
                  color: "white",
                  borderRadius: "20px",
                  padding: "4px 12px", // Customize padding if necessary
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
            }}
          >
            No Of Vacancies :
            <span style={{ fontWeight: "normal" }}> {data?.vacancies}</span>
          </Typography>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
            }}
          >
            Job Status :
            <span style={{ fontWeight: "normal" }}> {data?.job_status}</span>
          </Typography>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
            }}
          >
            Posted On :
            <span style={{ fontWeight: "normal" }}>
              {" "}
              {dateFormator(data?.posted_on)}
            </span>
          </Typography>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
            }}
          >
            Closing Date :
            <span style={{ fontWeight: "normal" }}>
              {" "}
              {dateFormator(data?.closing_date)}
            </span>
          </Typography>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
            }}
          >
            Location :
            <span style={{ fontWeight: "normal" }}> {data?.job_location}</span>
          </Typography>
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
            }}
          >
            Industry :{" "}
            <span style={{ fontWeight: "normal" }}>
              {" "}
              {formatForDisplay(data?.industry) || data?.industry}
            </span>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            sx={{ fontSize: "var(--font-size-small)", fontWeight: "bold" }}
          >
            Job Description :
          </Typography>

          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
            }}
            dangerouslySetInnerHTML={{
              __html: data?.job_description?.replace(/\n/g, "<br>"), // Replace '\n' with '<br>'
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
            sx={{ fontSize: "var(--font-size-small)", fontWeight: "bold" }}
          >
            Company Socials :
          </Typography>

          <Box sx={{ display: "flex", gap: "5px" }}>
            <IconButton
              component="a"
              href={data?.company_website}
              target="_blank"
            >
              <Language color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href={`mailto:${data?.company_email}`}
              // target="_blank"
            >
              <Mail color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href={data?.company_LinkedIn}
              target="_blank"
            >
              <LinkedIn color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Dialog open={openDen} fullWidth maxWidth="sm">
        <DenyJobDialog
          handleClose={handleDenDialog}
          getJobsDetailsById={getJobsDetailsById}
          jobID={jobid}
        />
      </Dialog>

      <Dialog open={openApl} fullWidth maxWidth="sm">
        <ApplyJobDialog
          handleClose={handleAplDialog}
          getJobsDetailsById={getJobsDetailsById}
          jobData={{
            jobID: jobid,
            title: data?.job_title,
            comp: data?.company_name,
          }}
        />
      </Dialog>
    </Box>
  );
}

export default JobDetails;
