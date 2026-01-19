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
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
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
import CloseIcon from "@mui/icons-material/Close";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

//common component, utils and hooks
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import dateFormator from "../../../Utils/dateFormator";
import BoxCard from "../../Dashboard/Child/BoxCard";
import ErrorHandling from "../../Common/ErrorHandling";

//child components, actions
import BatchDetailsTab from "./BatchDetailsTab/BatchDetailsTab";
import { getSessionsDetails } from "../action/batches.actions";
import FeedBackModal from "./FeedBack/FeedBackModal";
import { getFeedbackByBatchId } from "./FeedBack/store/Feedback.action";

const normalizeQuestions = (backendQuestions = []) => {
  return backendQuestions.map((q) => {
    let type = "input";

    switch (q.type) {
      case "TEXT":
        type = "input";
        break;
      case "YES_NO":
        type = "boolean";
        break;
      case "SINGLE_CHOICE":
        type = "options";
        break;
      case "RATING":
        type = "rating";
        break;
      default:
        type = "input";
    }

    return {
      id: q.uid,
      sequence: q.displayOrder,
      question: q.text,
      type,
      required: q.required,
      ratingScale: q.ratingScale || 5,
      options:
        type === "options"
          ? q.options
              ?.sort((a, b) => a.displayOrder - b.displayOrder)
              .map((opt) => ({
                label: opt.optionLabel, // 👈 for UI
                value: opt.optionKey,   // 👈 for payload
              }))
          : [],
    };
  });
};

function BatchDetails() {
  const batchId = useParams().batchId || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState([]);
  const [error500, setError500] = useState(false);
  const [error404, setError404] = useState(false);
  const [openFeedBack, setOpenFeedBack] = useState(false);
  const [feedBackBatchId, setFeedBackBatchId] = useState(null);
  const [questionsData, setQuestionsData] = useState([]);
  const [formInfo, setFormInfo] = useState({
    formUid: null,
    formVersion: null,
    batchId: null,
  });

  const handleFeedBack = () => {
    setOpenFeedBack(!openFeedBack);
  };

  const [loadingfeedback, setLoadingFeedback] = useState(false);
  const handleFetchFeedBack = async (id) => {
    try {
      setLoadingFeedback(true);
      const res = await dispatch(
        getFeedbackByBatchId({ headers, batchId: id }),
      );

      const data = res?.payload?.data?.data || {};
      const status = res?.payload?.status;

      if (status === 200 || status === 201) {
        setFormInfo({
          formUid: data?.formUid,
          formVersion: data?.formVersion,
          batchId: id,
        });

        const normalized = normalizeQuestions(data?.questions || []);
        setQuestionsData(normalized);
        setOpenFeedBack(true);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoadingFeedback(false);
    }
  };


  const getSessionsDetail = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getSessionsDetails({ headers, batchId }));
      const data = res?.payload?.data?.data || [];
      const status = res?.payload?.status;
      if (status === 500 || status === 503) {
        setError500(true);
      } else if (status === 404 || status === 400) {
        setError404(true);
      } else {
        setSessionData(data);
      }

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
      case "ON_HOLD":
        return {
          style: { bgcolor: "#FFF3A4", color: "#755200" },
          icon: <PauseCircleOutlineIcon />,
        };
      case "COMPLETED":
        return {
          style: { bgcolor: "#B0F7CC", color: "#239A60" },
          icon: <CheckCircleOutlineIcon />,
        };
      default:
        return {
          style: { bgcolor: "#FFFFB8", color: "#783B09" },
          icon: <PauseCircleOutlineIcon />,
        };
    }
  };

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
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          backgroundColor: "white",
          gap: 2,
          justifyContent: "space-between",
          px: 2,
          py: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
            p: { xs: 0, sm: 2 },
            width: "100%",
            // gap: "20px",
          }}
        >
          {/* Back Button */}
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Button
              variant="outlined"
              sx={{ color: "#747474" }}
              onClick={() => navigate(-1)}
            >
              {<ArrowBackIcon />}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
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
                <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                  {sessionData?.status
                    ? sessionData?.status.replace("_", " ").toUpperCase()
                    : "NA"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            disabled={sessionData?.is_feedback_submitted || loadingfeedback}
            startIcon={
              sessionData?.is_feedback_submitted ? (
                <CheckCircleIcon sx={{ color: "green" }} />
              ) : null
            }
            onClick={() => {
              if (sessionData?.is_feedback_submitted) return;
              handleFetchFeedBack(sessionData?.batch_uid);
            }}
          >
            {loadingfeedback ? <CircularProgress size={20} /> : "Feedback"}
          </Button>
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
            bgColor="var(--secondary-color)"
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
            // p: 2,
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={
                <InfoRoundedIcon
                  sx={{ fontSize: "30px", color: "#0073E6 !important" }}
                  id="expand-info_click"
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
      <Dialog
        open={openFeedBack}
        onClose={handleFeedBack}
        fullWidth
        maxWidth="md"
        scroll="paper"
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Batch Feedback Form</Typography>
            <IconButton onClick={handleFeedBack}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Note: Feedback can be submitted only once for this batch.
          </Typography>
        </DialogTitle>
        <FeedBackModal
          feedBackBatchId={feedBackBatchId}
          handleFeedBack={handleFeedBack}
          getSessionsDetail={getSessionsDetail}
          questionsData={questionsData}
          setQuestionsData={setQuestionsData}
          formInfo={formInfo}
          setFormInfo={setFormInfo}
        />
      </Dialog>
    </Box>
  );
}

export default BatchDetails;
