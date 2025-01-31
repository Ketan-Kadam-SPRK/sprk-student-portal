import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ProgressBar from "../Common/ProgressBar/ProgressBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Close } from "@mui/icons-material";
import { Image } from "cloudinary-react";
import CertificateModal from "./CertificateModal";
import NoDataPage from "../../Utils/NoDataPage";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { getAllCertificates } from "./certificate.actions";

function Certificates() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [expanded, setExpanded] = useState(null);
  const targetRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error500, setError500] = useState(false);
  const handleToggle = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      setLoading(true);

      const res = await dispatch(getAllCertificates({ headers }));
      const status = res?.payload?.status;
      const data = res?.payload?.data || [];
      // const jobData = data?.sort(
      //   (a, b) => new Date(b?.posted_on) - new Date(a?.posted_on)
      // );
      console.log(res);

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        setData(data);
        // let filterData = data?.filter((job) => job?.status === activeTAb);
        // setFilteredData(filterData);
      }
    } catch (err) {
      console.error("Error fetching practical exams:", err);
    } finally {
      setLoading(false);
    }
  };

  // const data = [
  //   {
  //     boo_uid: "BCN10180540",
  //     course_Name: "Fullstack in Java",
  //     course_img:
  //       "https://res.cloudinary.com/droommwjk/image/upload/v1707483574/sprk/courses/java_mbn80i.svg",
  //     status: "PENDING",
  //     theoryExam: true,
  //     ProjectExam: false,
  //     Attendance: false,
  //     fees: true,
  //   },
  //   {
  //     boo_uid: "BCN10180541",
  //     course_Name: "React Development",
  //     course_img:
  //       "https://res.cloudinary.com/droommwjk/image/upload/v1707483584/sprk/courses/react_j3mxql.svg",
  //     status: "TO_REVIEW",
  //     theoryExam: true,
  //     ProjectExam: true,
  //     Attendance: false,
  //     fees: false,
  //   },
  //   {
  //     boo_uid: "BCN10180542",
  //     course_Name: "Python for Data Science",
  //     course_img:
  //       "https://res.cloudinary.com/droommwjk/image/upload/v1707483582/sprk/courses/python_x9slrg.svg",
  //     status: "READY",
  //     theoryExam: false,
  //     ProjectExam: true,
  //     Attendance: true,
  //     fees: true,
  //   },
  //   {
  //     boo_uid: "BCN10180543",
  //     course_Name: "Machine Learning",
  //     course_img:
  //       "https://res.cloudinary.com/droommwjk/image/upload/v1707483576/sprk/courses/machine-learning_rh4ndy.svg",
  //     status: "RELEASED",
  //     theoryExam: true,
  //     ProjectExam: true,
  //     Attendance: true,
  //     fees: true,
  //   },
  // ];

  const previewData = {
    cou_gro_name: "Python Programming",
    status: "READY",
    count: null,
    theory: true,
    project: true,
    attend: true,
    start: "2024-12-17T07:20:00Z",
    end: null,
    release_by: null,
    preview: {
      cer_sts_id:
        "a3b413fd978d4ea780d9651c277b2d0ce688c45df3944916a70b1d35274f402a",
      cer_id: null,
      stu_name: "Karan Pol",
      grade: "O+",
      ear_rls_rsn: null,
      rls_at: null,
      end: "2025-01-24T08:51:43.390571236Z",
      duration: 18,
    },
  };

  const sprkLogo =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjEzOSIgaGVpZ2h0PSI2OTUiIGZpbGw9Im5vbmUiIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyI+PGcgZmlsbD0iIzNhOGJiYSI+PGNpcmNsZSBjeD0iMzQ4LjIiIGN5PSIzNDkiIHI9IjUwIi8+PHBhdGggZD0iTTY3NS43MjggMzgyLjg1OWMxMS4wMzQuNTA2IDIwLjM4OC04LjAyOSAyMC44OTQtMTkuMDYzcy04LjAyOS0yMC4zODktMTkuMDYzLTIwLjg5NWMtOS42Ny0uNDQzLTE4LjA1IDYuMDU3LTIwLjMxNSAxNS4wOTdhNy4xMiA3LjEyIDAgMCAwLS4zOTctLjAyOWMtNi40OTMtLjI5Ny0yMzkuOTMxLTYuOTktMjM5LjkzMS02Ljk5bDIzOS41NjUgMTQuOTgyYTcuNjYgNy42NiAwIDAgMCAuMzk4LjAwOGMxLjQyOSA5LjIwOSA5LjE3OSAxNi40NDcgMTguODQ5IDE2Ljg5em0tNTcuNjU1IDE1NS45OThjOS4zOTEgNS44MTQgMjEuNzE4IDIuOTEzIDI3LjUzMi02LjQ3OXMyLjkxMy0yMS43MTktNi40NzktMjcuNTMyYy04LjIzMS01LjA5NS0xOC43MTQtMy40OTgtMjUuMDk0IDMuMjk2LS4xMDctLjA3NC0uMjE4LS4xNDctLjMzMy0uMjE4LTUuNTI3LTMuNDIyLTIwNi4xNzMtMTIyLjkxOC0yMDYuMTczLTEyMi45MThsMjAxLjk2MiAxMjkuNzJjLjExNS4wNzEuMjMuMTM4LjM0NC4yMDFhMjAuMDEgMjAuMDEgMCAwIDAgOC4yNDEgMjMuOTN6TTQ5MS4wNCA2NDUuMzg1YzUuMzg5IDkuNjQyIDE3LjU3NCAxMy4wOSAyNy4yMTYgNy43MDJzMTMuMDktMTcuNTc0IDcuNzAxLTI3LjIxNmMtNC43MjItOC40NS0xNC42NjQtMTIuMTQyLTIzLjUzOS05LjMtLjA1Ny0uMTE3LS4xMTktLjIzNS0uMTg1LS4zNTMtMy4xNzEtNS42NzQtMTIwLjU3OC0yMDcuNTUtMTIwLjU3OC0yMDcuNTVsMTEzLjU5NCAyMTEuNDUzYTcuOTIgNy45MiAwIDAgMCAuMjA0LjM0MiAyMC4wMSAyMC4wMSAwIDAgMC00LjQxMyAyNC45MjJ6bS0xODYuNDk2IDI1LjgzOWMtLjg1MyAxMS4wMTMgNy4zODMgMjAuNjMyIDE4LjM5NiAyMS40ODRzMjAuNjMyLTcuMzgzIDIxLjQ4NC0xOC4zOTZjLjc0OC05LjY1MS01LjQ4NS0xOC4yMzEtMTQuNDQ5LTIwLjc4LjAxNy0uMTI4LjAzMS0uMjYuMDQxLS4zOTYuNTAyLTYuNDggMTQuNTQtMjM5LjU5MiAxNC41NC0yMzkuNTkyTDMyMi4wNCA2NTIuNTE5Yy0uMDEuMTM1LS4wMTcuMjY4LS4wMi4zOTctOS4yNSAxLjEzOS0xNi43MjkgOC42NTctMTcuNDc2IDE4LjMwOHptLTE3OC44OTMtODAuODQ3Yy02Ljk4NyA4LjU1NS01LjcxNSAyMS4xNTUgMi44NCAyOC4xNDFzMjEuMTU0IDUuNzE2IDI4LjE0MS0yLjgzOWM2LjEyMy03LjQ5NyA1LjkwNC0xOC4xLS4wMDEtMjUuMzEuMDg3LS4wOTYuMTc0LS4xOTcuMjU5LS4zMDEgNC4xMTItNS4wMzUgMTQ4LjcxMi0xODguNDE3IDE0OC43MTItMTg4LjQxN0wxNTAuNjk0IDU4NS4wMDdhOC4zNyA4LjM3IDAgMCAwLS4yNDQuMzE1Yy04LjI0NC00LjM0Ni0xOC42NzYtMi40NDItMjQuNzk5IDUuMDU1ek0zNi41NjggNDUxLjYxYy0xMC4yNTUgNC4xMDUtMTUuMjQxIDE1Ljc0NS0xMS4xMzYgMjZzMTUuNzQ1IDE1LjI0MSAyNiAxMS4xMzdhMjAuMDEgMjAuMDEgMCAwIDAgMTIuMjQ5LTIyLjE0OGMuMTIzLS4wNDIuMjQ4LS4wODguMzczLS4xMzggNi4wMzUtMi40MTYgMjIxLjMzLTkyLjg5MyAyMjEuMzMtOTIuODkzTDYxLjA4MSA0NTkuMDMzYTcuODYgNy44NiAwIDAgMC0uMzY2LjE1OGMtNS4xMTEtNy43OTMtMTUuMTYxLTExLjE3Ny0yNC4xNDgtNy41ODF6bS0xMS41OC0xNjUuMDMzYy0xMC45NTMtMS40MjMtMjAuOTg3IDYuMzAzLTIyLjQxMSAxNy4yNTZzNi4zMDIgMjAuOTg3IDE3LjI1NiAyMi40MTFjOS41OTkgMS4yNDcgMTguNDkxLTQuNTMxIDIxLjUwMi0xMy4zNTFhNy42MiA3LjYyIDAgMCAwIC4zOTMuMDYyYzYuNDQ2LjgzNyAyMzguNTE1IDI2Ljk2MyAyMzguNTE1IDI2Ljk2M0w0Mi43NTkgMzA1LjAyMWE4LjE3IDguMTcgMCAwIDAtLjM5Ni0uMDQxYy0uNjU3LTkuMjk2LTcuNzc2LTE3LjE1NS0xNy4zNzUtMTguNDAzem03Mi4xMjgtMTQ5LjkyYy04Ljg2MS02LjU5NS0yMS4zOS00Ljc1OC0yNy45ODUgNC4xMDNzLTQuNzU4IDIxLjM5IDQuMTAzIDI3Ljk4NWEyMC4wMSAyMC4wMSAwIDAgMCAyNS4yODQtMS4xNGMuMS4wODMuMjA0LjE2NS4zMTMuMjQ2IDUuMjE1IDMuODgxIDE5NC45MTYgMTQwLjA4NiAxOTQuOTE2IDE0MC4wODZsLTE5MC4xNC0xNDYuNTAzYy0uMTA5LS4wODEtLjIxNy0uMTU4LS4zMjYtLjIzIDMuOTcxLTguNDMxIDEuNi0xOC43NjctNi4xNjUtMjQuNTQ3em0tNTYyLjg3NCAxNi44NzZ6bTg2Mi4zMjggMjcuMjM0eiIgaWQ9ImM0YWZkM2FhY2Y1ZTgwIn0+PC9nPjwvc3ZnPg==";

  const getStepFromStatus = (status) => {
    switch (status) {
      case "PENDING":
        return 0;
      case "TO_REVIEW":
        return 1;
      case "READY":
        return 2;
      case "RELEASED":
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
    <>
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
          {data?.length > 0 ? (
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
                const activeStep = getStepFromStatus(item.status); // Get activeStep for each item
                return (
                  <Accordion
                    key={item.boo_uid}
                    expanded={expanded === item.boo_uid}
                    sx={{ p: 2 }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(item.boo_uid);
                          }}
                        />
                      }
                      aria-controls={`${item.boo_uid}-content`}
                      id={`${item.boo_uid}-header`}
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
                              publicId={item.logo}
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
                              {item.cou_name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#4D535A" }}
                            >
                              {item.boo_uid}
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
                          <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                          >
                            Preview
                          </Button>
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
                          gap: {
                            lg: "100px",
                            md: "50px",
                            sm: "30px",
                            xs: "20px",
                          },
                          justifyContent: "center",
                          py: 3,
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography>Theory Exam</Typography>
                          {renderStatusIcon(item.theory)}
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography>Project Exam</Typography>
                          {renderStatusIcon(item.project)}
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography>Attendance</Typography>
                          {renderStatusIcon(item.attendance)}
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography>Fees Paid</Typography>
                          {renderStatusIcon(item.pendingFees === 0)}
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          ) : (
            <NoDataPage
              errorImgPublicId={
                "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737804838/Certificate_medal_and_graduation_cap_u3nply.svg"
              }
              errorHeading={"No Certificates yes"}
              errorDescription={
                "Your certificates will appear here once they are issued."
              }
            />
          )}
        </Box>

        <Dialog open={open} fullwidth maxWidth="md">
          <DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent
            sx={{
              px: 2,
              display: "flex",
              justifyContent: "center",
              overflow: "auto", // Enable scrolling
              maxHeight: "80vh", // Limit height for scrolling
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                maxWidth: "100%",
                overflowX: "auto", // Horizontal scrolling
              }}
            >
              <CertificateModal
                targetRef={targetRef}
                previewData={previewData}
                sprkLogo={sprkLogo}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box sx={{ display: "flex", px: 2, py: 1, width: "100%" }}>
              <Typography>
                RELEASED on 03 July 2024 by Kavita Suryawanshi.
              </Typography>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Certificates;
