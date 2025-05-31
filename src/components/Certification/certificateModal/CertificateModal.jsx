import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import {
  getPreviewCertificate,
  getVerifiedCertificate,
} from "../certificate.actions";
import {
  Box,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Checkbox,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import html2canvas from "html2canvas";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(/\s/g, "-");
}

function CertificateModal({ certId = null, certificateStatus, handleClose }) {
  const headers = useAuthHeaders();
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isloading, setIsloading] = useState(true);
  const [certificateID, setCertificateId] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [releasedDate, setReleasedDate] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const orgAddress = useSelector(
    (state) => state.authSlice?.orgDetails?.orgAddress
  );

  const certificateData = useSelector(
    (state) => state.authSlice.orgDetails?.orgCertificate
  );

  const replacePlaceholders = (str = "", values) => {
    return str?.replace(/\b\w+\b/g, (match) => values[match] || match);
  };

  const replacements = {
    ORGANIZATION_ADDRESS: orgAddress || "",
    COURSE_NAME: previewData?.cou_name || "",
    STUDENT_NAME: previewData?.stu_name || "",
    COURSE_START_DATE: formatDate(previewData?.start) || "",
    COURSE_END_DATE: formatDate(previewData?.end) || "",
    COURSE_DURATION: previewData?.duration || "",
    COURSE_OBTAINED_GRADE: previewData?.grade || "",
    CERTIFICATE_ID: previewData?.cer_id || "CRXXXXXXXXXXXXXXXXX",
    PASSING_YEAR: new Date(previewData?.end).getFullYear() || "20XX",
  };

  const finalString = useMemo(() => {
    return replacePlaceholders(certificateData, replacements);
  }, [certificateData, replacements]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    if (certId) {
      getData();
    }
  }, [certId]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        getPreviewCertificate({ headers, id: certId })
      );
      const data = res?.payload?.data?.data || [];
      setPreviewData(data);
      setCertificateId(data?.cer_sts_id);
      setIsConfirmed(data?.isVerified);
      setReleasedDate(data?.rls_at);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleConfirmClick = async () => {
    setConfirmLoading(true);
    dispatch(getVerifiedCertificate({ headers, id: certificateID }))
      .then((res) => {
        if (res.payload !== undefined) {
          handleClose();
          setIsChecked(false);
        }
        setConfirmLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setConfirmLoading(false);
      });
  };

  const waitForImages = (element) => {
    const images = element.querySelectorAll("img");
    return Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = img.onerror = resolve;
        });
      })
    );
  };

  const generateImage = async () => {
    if (!containerRef.current) return;
    setIsloading(true);
    try {
      await waitForImages(containerRef.current);

      const canvas = await html2canvas(containerRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      });

      const dataUrl = canvas.toDataURL("image/png");
      setImgUrl(dataUrl);
      setIsloading(false);
    } catch (error) {
      console.error("Error generating image:", error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      generateImage();
    }, 300);

    return () => clearTimeout(timeout);
  }, [finalString]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "500px",
          width: "700px",
          maxWidth: "90% !important",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <DialogTitle sx={{ p: 0 }}>
        <Box
          sx={{
            position: "relative",
            p: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "16px",
                sm: "18px",
                md: "20px",
              },
              fontWeight: 600,
              color: "#333333",
              textAlign: "center",
            }}
          >
            {certificateStatus !== "RELEASED"
              ? "Verify Your Certificate"
              : "Your Certificate"}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <Close />
          </IconButton>
        </Box>

        {!isConfirmed && certificateStatus !== "RELEASED" && (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },
              }}
              fontStyle="italic"
            >
              Please verify your name, course details, and other information
              before confirming your certificate.
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "11px",
                  sm: "12px",
                },
              }}
            >
              (Note: If any details require correction, contact us at your
              earliest convenience.)
            </Typography>
          </Box>
        )}
      </DialogTitle>

      <DialogContent
        sx={{
          px: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isloading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "60vw" }}
          >
            <CircularProgress />
          </Box>
        ) : (
          imgUrl && (
            <img
              src={imgUrl}
              alt="student-Certificate"
              style={{
                width: "800px",
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            />
          )
        )}

        <Box sx={{ position: "absolute", top: -9999, left: -9999 }}>
          <div
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: finalString }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isConfirmed && certificateStatus !== "RELEASED" ? (
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                textAlign: "left",
                pt: 2,
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Checkbox
                checked={isChecked}
                onChange={handleCheckboxChange}
                sx={{ mt: -1 }}
              />
              <Typography
                sx={{
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
              >
                I acknowledge that my name, course details, and all other
                information are accurate to the best of my knowledge and approve
                the issuance of my certificate.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={handleConfirmClick}
                disabled={!isChecked || confirmLoading}
              >
                {confirmLoading ? <CircularProgress size={24} /> : "Confirm"}
              </Button>
            </Box>
          </Box>
        ) : (
          certificateStatus !== "RELEASED" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: {
                    xs: "12px",
                    sm: "14px",
                  },
                }}
              >
                Your certificate details have been confirmed. Your certificate
                is now being processed.
                <br /> Stay tuned for updates on its release!
              </Typography>
            </Box>
          )
        )}

        {releasedDate && certificateStatus === "RELEASED" && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                },
              }}
            >
              {`Released on ${formatDate(releasedDate)} `}
            </Typography>
          </Box>
        )}
      </DialogActions>
    </>
  );
}

export default CertificateModal;
