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
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ProgressBar from "../Common/ProgressBar/ProgressBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Close } from "@mui/icons-material";
import { Image } from "cloudinary-react";
import CertificateModal from "./CertificateModal";
import NoDataPage from "../Common/NoDataPage";
import { useDispatch, useSelector } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import {
  downloadCertificate,
  getAllCertificates,
  getVerifiedCertificate,
} from "./certificate.actions";
import ErrorHandling from "../../components/Common/ErrorHandling";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import dateFormator from "../../Utils/dateFormator";

function Certificates() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const sprkLogo =
    "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1690809251/sprk-logoRR_isa0xp.svg";

  const mailID = useSelector((state) => state.authSlice.userDetails?.email);
  const [expanded, setExpanded] = useState(null);
  const targetRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error500, setError500] = useState(false);
  const [certId, setCertId] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [openDownload, setOpenDownload] = useState(false);
  const [certificateID, setCertificateId] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [certificateStatus, setCertificateStatus] = useState(null);
  const [releasedDate, setReleasedDate] = useState(null);

  const handleDownloadDialog = (id) => {
    setOpenDownload(!openDownload);
    setCertId(id);
  };

  const handlePreviewDialog = (item) => {
    setCertId(item?.cer_mpg_uid);
    setCertificateStatus(item?.status);
    setOpen(!open);
  };
  const handleToggle = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    handleGetAllCertificates();
    setIsChecked(false);
  };

  useEffect(() => {
    handleGetAllCertificates();
  }, []);

  const handleGetAllCertificates = async () => {
    try {
      setLoading(true);

      const res = await dispatch(getAllCertificates({ headers }));
      const status = res?.payload?.status;
      const data = res?.payload?.data?.data || [];

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        setData(data);
      }
    } catch (err) {
      console.error("Error fetching practical exams:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmClick = async () => {
    setConfirmLoading(true);
    dispatch(getVerifiedCertificate({ headers, id: certificateID }))
      .then((res) => {
        if (res.payload !== undefined) {
          handleClose();
          handleGetAllCertificates();
          setIsChecked(false);
        }
        setConfirmLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setConfirmLoading(false);
      });
  };

  const handleDownloadCerti = async () => {
    setDownloading(true);
    try {
      const res = await dispatch(downloadCertificate({ headers, id: certId }));
      if (res.payload) {
        handleDownloadDialog(null);
      }
      setDownloading(false);
    } catch (err) {
      setDownloading(false);
    }
  };

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

  const [isChecked, setIsChecked] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // const handleConfirmClick = () => {
  //   setIsConfirmed(true);
  //   // handleClose();
  // };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4" fontWeight={600}>
          Your Certificates{" "}
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739265190/diary-education-learning-pencil-school-study-svgrepo-com_1_qyg6bi.svg"
            style={{
              width: "25px",
              height: "auto",
              objectFit: "contain",
              marginLeft: "5px",
            }}
            cloudName="dxlzzgbfw"
          />
        </Typography>
        <Typography
          sx={{
            color: "#4D535A",
            fontSize: "var(--font-size-medium)",
          }}
        >
          Every achievement tells the story of your determination.
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1,
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
            <Typography
              sx={{
                color: "white",
                fontSize: "var(--font-size-medium)",
                fontWeight: "bold",
              }}
            >
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
              height: "80vh",
              flex: 1,
              p: 2,
              overflow: "auto",
              gap: 5,
            }}
          >
            {data?.map((item, index) => {
              const activeStep = getStepFromStatus(item?.status); // Get activeStep for each item
              return (
                <Accordion
                  key={`${item?.boo_uid}-${index}`}
                  expanded={expanded === `${item?.boo_uid}-${index}`}
                  sx={{ p: 2 }}
                  onClick={(e) => {
                    handleToggle(`${item?.boo_uid}-${index}`);
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${item?.boo_uid}-${index}-content`}
                    id={`${item?.boo_uid}-${index}-header`}
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
                            publicId={item?.logo}
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
                            {item?.cou_name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#4D535A" }}>
                            {item?.boo_uid}
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
                          onClick={() => handlePreviewDialog(item)}
                          disabled={item?.cer_mpg_uid === null}
                        >
                          {item.status === "RELEASED" ? "Preview" : "verify"}
                        </Button>
                        <Button
                          variant="contained"
                          disabled={item?.status !== "RELEASED"}
                          onClick={() =>
                            handleDownloadDialog(item?.cer_mpg_uid)
                          }
                        >
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
                        {renderStatusIcon(item?.theory)}
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography>Project Exam</Typography>
                        {renderStatusIcon(item?.project)}
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography>Attendance</Typography>
                        {renderStatusIcon(item?.attendance)}
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography>Fees Paid</Typography>
                        {renderStatusIcon(item?.pendingFees === 0)}
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

      <Dialog open={openDownload} fullWidth maxWidth="sm">
        <Box
          sx={{
            p: 2,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => {
              setOpenDownload(false);
            }}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            <Close />
          </IconButton>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "var(--font-size-medium)",
              fontWeight: "bold",
              pr: 2,
            }}
          >
            <CheckCircleRoundedIcon color="success" /> Are you sure you want to
            download the certificate ?
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              sx={{
                fontSize: "var(--font-size-small)",
                maxWidth: "70%",
                textAlign: "center",
                color: "#424242",
              }}
            >
              {`Note: Upon confirmation, your certificate will be sent to your registered email. ( ${mailID} ).`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: "100px" }}
              onClick={() => setOpenDownload(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100px" }}
              onClick={handleDownloadCerti}
              disabled={downloading}
            >
              {downloading ? <CircularProgress size={24} /> : "Yes"}
            </Button>
          </Box>
        </Box>
      </Dialog>

      <Dialog open={open} fullWidth maxWidth="md" scroll="body">
        <DialogTitle sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              pt: 2,
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: 600, color: "#333333" }}
            >
              {certificateStatus !== "RELEASED"
                ? "Verify Your Certificate"
                : "Your Certificate"}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ px: 2 }}>
          {/* Flex container to center everything */}
          {certificateStatus !== "RELEASED" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {/* Instruction Text */}
              <Box sx={{ textAlign: "center", pb: 2 }}>
                <Typography sx={{ fontSize: "14px" }} fontStyle="italic">
                  Please verify your name, course details, and other information
                  before confirming your certificate.
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  (Note: If any details require correction, contact us at your
                  earliest convenience.)
                </Typography>
              </Box>

              {/* Centered Certificate */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <CertificateModal
                  targetRef={targetRef}
                  sprkLogo={sprkLogo}
                  certId={certId}
                  setCertificateId={setCertificateId}
                  setIsConfirmed={setIsConfirmed}
                />
              </Box>

              {/* Acknowledgment Text */}
              {!isConfirmed ? (
                <Box>
                  <Box
                    sx={{
                      textAlign: "left",
                      px: 3,
                      pt: 2,
                      display: "flex",
                      alignItems: "flex-start", // Align items at the top
                    }}
                  >
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      sx={{ mt: -1 }} // Adjust vertical alignment slightly
                    />
                    <Typography sx={{ fontSize: "14px" }}>
                      I acknowledge that my name, course details, and all other
                      information are accurate to the best of my knowledge and
                      approve the issuance of my certificate.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 2,
                      px: 3,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleConfirmClick}
                      disabled={!isChecked || confirmLoading}
                    >
                      {confirmLoading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                    px: 3,
                  }}
                >
                  <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
                    Your certificate details have been confirmed. Your
                    certificate is now being processed.
                    <br /> Stay tuned for updates on its release!
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CertificateModal
                  targetRef={targetRef}
                  sprkLogo={sprkLogo}
                  certId={certId}
                  setCertificateId={setCertificateId}
                  setIsConfirmed={setIsConfirmed}
                  setReleasedDate={setReleasedDate}
                />
              </Box>
              <Box sx={{ mt: 2, pl: 2 }}>
                <Typography>
                  {`Released on ${dateFormator(releasedDate)} `}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Certificates;
