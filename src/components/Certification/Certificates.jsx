import { useEffect, useRef, useState } from "react";
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  IconButton,
  CircularProgress,
  TextField,
    InputAdornment,
  // IconButton,
  // Button,
  Snackbar,
  Grid2,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Close } from "@mui/icons-material";
import { Image } from "cloudinary-react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import ProgressBar from "../Common/ProgressBar/ProgressBar";
import CertificateModal from "./certificateModal/CertificateModal";
import NoDataPage from "../Common/NoDataPage";
import ErrorHandling from "../../components/Common/ErrorHandling";
import { downloadCertificate, getAllCertificates } from "./certificate.actions";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";
// import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Certificates() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();

  const mailID = useSelector((state) => state.authSlice.userDetails?.email);
  const [expanded, setExpanded] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error500, setError500] = useState(false);
  const [certId, setCertId] = useState(null);
  const [cerUid, setCerUid] = useState(null);
  const [certificateStatus, setCertificateStatus] = useState(null);
  const [openDownload, setOpenDownload] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [shareLinkModal, setShareLinkModal] = useState(false);

  const certificateUrl = `${import.meta.env.VITE_APP_CERTIFICATE_LINK}${cerUid}`;

const [copied, setCopied] = useState(false);

const handleCopy = async () => {
  await navigator.clipboard.writeText(certificateUrl);
  setCopied(true);
};

  const handleShareLinkDialog = (id) => {
    setShareLinkModal(!shareLinkModal);
    setCerUid(id);
  };

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
      <Helmet>
        <title>{meta.certificates.title}</title>
        <meta name="description" content={meta.certificates.description} />
        <meta property="og:title" content={meta.certificates.title} />
        <meta
          property="og:description"
          content={meta.certificates.description}
        />
        <meta property="og:image" content={meta.certificates.ogImage} />
        <meta
          property="og:url"
          content={`https://student.sprktechnologies.in${meta.certificates.url}`}
        />
      </Helmet>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
              color: "#0A2647",
            }}
          >
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
              backgroundColor: "var(--secondary-color)",
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
                          lg: "column",
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1.5, sm: 3 },
                          width: "100%", // full responsive width
                          maxWidth: 400, // prevent excessive stretch on large screens
                          flexWrap: "nowrap", // prevent wrapping
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: { xs: 50, sm: 70 },
                            height: { xs: 50, sm: 70 },
                            flexShrink: 0, // prevent image box from shrinking
                            borderRadius: "8px",
                            backgroundColor: "white",
                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            p: { xs: 1, sm: 2 },
                          }}
                        >
                          <Image
                            publicId={item?.logo}
                            cloudName="dxlzzgbfw"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            overflow: "hidden", // prevent text overflow
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{
                              fontSize: { xs: "0.9rem", sm: "1.1rem" },
                              whiteSpace: "normal", // allow wrapping
                              wordBreak: "break-word", // wrap long words
                              lineHeight: 1.3,
                            }}
                          >
                            {item?.cou_cert_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#4D535A",
                              fontSize: { xs: "0.75rem", sm: "0.85rem" },
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
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
                        <Button
                          variant="contained"
                          disabled={item?.status !== "RELEASED"}
                          onClick={() =>
                            handleShareLinkDialog(item?.cert_uid)
                          }
                        >
                          share Link
                        </Button>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        width: "100%",
                        py: { xs: 1.5, sm: 3 },
                      }}
                    >
                      <Grid2
                        container
                        spacing={{ xs: 1, sm: 3, md: 5, lg: 8 }}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {[
                          { label: "Theory Exam", value: item?.theory },
                          { label: "Project Exam", value: item?.project },
                          { label: "Attendance", value: item?.attendance },
                          {
                            label: "Fees Paid",
                            value: item?.pendingFees === 0,
                          },
                        ].map((el, index) => (
                          <Grid2
                            item
                            key={index}
                            xs={12}
                            sm={6}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start", // align content left
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: {
                                    xs: "var(--font-size-extra-small)",
                                    sm: "var(--font-size-small)",
                                  },
                                  fontWeight: 500,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {el.label}
                              </Typography>
                              {renderStatusIcon(el.value)}
                            </Box>
                          </Grid2>
                        ))}
                      </Grid2>
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

<Dialog
  open={shareLinkModal}
  onClose={() => setShareLinkModal(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Certificate Link</DialogTitle>

  <DialogContent>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ mb: 2 }}
    >
      Share this certificate verification link.
    </Typography>

    <TextField
      fullWidth
      value={certificateUrl}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setShareLinkModal(false)}>
      Close
    </Button>
  </DialogActions>
</Dialog>

<Snackbar
  open={copied}
  autoHideDuration={3000}
  onClose={() => setCopied(false)}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
>
  <Alert
    severity="success"
    variant="standard"
    onClose={() => setCopied(false)}
    sx={{
      width: "100%",
      minWidth: 320,
      bgcolor: "#fff",
      color: "#555",
      borderRadius: 2,
      boxShadow: "0 8px 24px rgba(0,0,0,.15)",
      "& .MuiAlert-icon": {
        color: "#16a34a",
      },
    }}
  >
    Copied to clipboard
  </Alert>
</Snackbar>
    </Box>
  );
}

export default Certificates;
