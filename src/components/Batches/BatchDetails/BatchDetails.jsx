import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";

//mui components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";

//mui icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

//common component, utils and hooks
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import dateFormator from "../../../Utils/dateFormator";
import BoxCard from "../../Dashboard/Child/BoxCard";
import ErrorHandling from "../../Common/ErrorHandling";

//child components, actions
import BatchDetailsTab from "./BatchDetailsTab/BatchDetailsTab";
import { getSessionsDetails } from "../action/batches.actions";

function BatchDetails() {
  const batchId = useParams().batchId || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState([]);

  const getSessionsDetail = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getSessionsDetails({ headers, batchId }));
      const data = res?.payload?.data?.data || [];
      console.log(data);
      setSessionData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSessionsDetail();
  }, []);

  const getStatusProperties = (status) => {
    switch (status) {
      case "ONGOING":
        return {
          style: { bgcolor: "#DDEBFF", color: "#1C4963" },
          icon: <RotateRightIcon />,
        };
      case "UPCOMING":
        return {
          style: { bgcolor: "#E0C8FF", color: "#2C004E" },
          icon: <ArrowCircleUpIcon />,
        };
      case "CANCELLED":
        return {
          style: { bgcolor: "#FFC0C0", color: "#A30000" },
          icon: <PauseCircleOutlineIcon />,
        };
      case "COMPLETED":
        return {
          style: { bgcolor: "#B0F7CC", color: "#239A60" },
          icon: <CheckCircleOutlineIcon />,
        };
      case "ON HOLD":
      case "BOOKED":
        return {
          style: { bgcolor: "#FFFFB8", color: "#783B09" },
          icon: <PauseCircleOutlineIcon />,
        };
      default:
        return {
          style: { bgcolor: "#FFFFB8", color: "#783B09" },
          icon: <PauseCircleOutlineIcon />,
        };
    }
  };
  
  if (loading) {
    return <ErrorHandling error500={false} loadData={loading} />;
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
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
            BATCH STATUS:
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
              ...getStatusProperties(sessionData?.status).style,
            }}
          >
            {getStatusProperties(sessionData?.status).icon}{" "}
            {/* Render the icon */}
            <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
              {sessionData?.status
                ? sessionData?.status.replace("_", " ").toUpperCase()
                : "NA"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ px: 2, pt: 2, display: "flex", gap: 2, flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <BoxCard
            title="Sessions Completed"
            number={sessionData?.completedSessions}
            image={<CheckCircleIcon style={{ fontSize: 30, color: "white" }} />}
            bgColor="#6560F0"
          />

          <BoxCard
            title="Attended"
            number={sessionData?.attendedSessions}
            image={<HowToRegIcon style={{ fontSize: 30, color: "white" }} />}
            bgColor="#5B9B39"
          />

          <BoxCard
            title="Not Attended"
            number={sessionData?.missedSessions}
            image={<CancelIcon style={{ fontSize: 30, color: "white" }} />}
            bgColor="#DF5353"
          />
        </Box>
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
                publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1703153520/Vector_3_rnkyxa.svg"
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
                {sessionData?.batch_uid}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ color: "#0074BD", fontWeight: 600 }}>
                <Typography>Course Name: {sessionData?.courseName}</Typography>
                <Typography>
                  Faculty Name: {sessionData?.facultyName}
                </Typography>
                <Typography>
                  Days:{" "}
                  {sessionData?.daysOfWeek
                    ?.map((res) => res.slice(0, 3))
                    ?.join(" | ")}
                </Typography>
                <Typography>
                  Start Date: {dateFormator(sessionData?.startDate)}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
      <Box sx={{ px: 2, flex: 1 }}>
        <BatchDetailsTab sessionData={sessionData} />
      </Box>
    </Box>
  );
}

export default BatchDetails;
