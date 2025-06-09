import { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  IconButton,
  CircularProgress,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Close } from "@mui/icons-material";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import ProgressBar from "../Common/ProgressBar/ProgressBar";
import CertificateModal from "./certificateModal/CertificateModal";
import NoDataPage from "../Common/NoDataPage";
import ErrorHandling from "../../components/Common/ErrorHandling";
import { downloadCertificate, getAllCertificates } from "./certificate.actions";

function Certificates() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();

  const mailID = useSelector((state) => state.authSlice.userDetails?.email);
  const [expanded, setExpanded] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error500, setError500] = useState(false);
  const [certId, setCertId] = useState(null);
  const [certificateStatus, setCertificateStatus] = useState(null);
  const [openDownload, setOpenDownload] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadDialog = (id) => {
    setOpenDownload(!openDownload);
    setCertId(id);
  };

  /**
   * Function to open the preview dialog for a particular certificate. It sets the
   * cer_mpg_uid of the certificate in the state and toggles the open state of the dialog.
   * @param {object} item - The certificate object with cer_mpg_uid and status properties.
   */
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

  function getButtonLabel(item) {
    if (item?.status === "READY" && item?.isVerified === true) {
      return "Preview";
    } else if (
      (item?.status === "RELEASED" && item?.isVerified === true) ||
      (item?.status === "RELEASED" && item?.isVerified === false)
    ) {
      return "View";
    } else {
      return "verify";
    }
  }

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            Your Certificates{" "}
          </Typography>
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1740202809/certificate_d6ccvh.svg"
            style={{
              width: "auto",
              height: "40px",
              objectFit: "contain",
              marginLeft: "5px",
            }}
            cloudName="dxlzzgbfw"
          />
        </Box>
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
                  data-testid={`${item?.boo_uid}-${index}`}
                  expanded={expanded === `${item?.boo_uid}-${index}`}
                  sx={{ p: 2, borderRadius: "10px 10px" }}
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
                            {item?.cou_cert_name}
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
                          data-testid={`preview-button-${index}`}
                        >
                          {getButtonLabel(item)}
                        </Button>
                        <Button
                          variant="contained"
                          disabled={item?.status !== "RELEASED"}
                          onClick={() =>
                            handleDownloadDialog(item?.cer_mpg_uid)
                          }
                          data-testid={`download-button-${index}`}
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
            errorHeading={"No Certificates yet!"}
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

      <Dialog open={open} fullWidth maxWidth="sm" scroll="body">
        <CertificateModal
          certId={certId}
          certificateStatus={certificateStatus}
          handleClose={handleClose}
        />
      </Dialog>
    </Box>
  );
}

export default Certificates;
