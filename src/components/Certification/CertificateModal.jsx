import React, { useEffect, useState } from "react";
import styles from "./StdCertification.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { getPreviewCertificate } from "./certificate.actions";
import { Box, CircularProgress } from "@mui/material";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(/\s/g, "-");
}

function CertificateModal({
  targetRef,
  sprkLogo,
  certId = null,
  setCertificateId,
  setIsConfirmed,
  setReleasedDate,
}) {
  const headers = useAuthHeaders();
  const dispatch = useDispatch();
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
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
    <div className={styles.Certification} ref={targetRef}>
      <div className={styles.CertificationContainer}>
        <div className={styles.watermarkdiv}>
          <p className={styles.watermark}>PREVIEW</p>
        </div>
        <table className={styles.table} cellSpacing={0} cellPadding={0}>
          <tbody>
            <tr className={styles.certificateTopDiv}>
              <td colSpan={2} className={styles.logoTd}>
                <img
                  className={styles.certificationLogo}
                  src={sprkLogo}
                  alt="sprk-logo"
                />
              </td>
            </tr>

            <tr>
              <td colSpan={3} className={styles.centeredText}>
                <p className={styles.certificationName}>Certificate</p>
                <p className={styles.certificationName2}>of Excellence</p>
                <table className={styles.certifacateDetails}>
                  <tbody>
                    <tr>
                      <td className={styles.fontStyle} colSpan={2}>
                        This Credential Is Proudly Awarded To
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.studentName} colSpan={2}>
                        {previewData?.stu_name || "dummy"}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.fontStyle} colSpan={2}>
                        in the year {new Date(previewData?.end).getFullYear()}{" "}
                        for Successfully
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.fontStyle} colSpan={2}>
                        completing the course{" "}
                        <span className={styles.spanStyle}>
                          “{previewData?.cou_name || "dummy"}”
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.fontStyle} colSpan={2}>
                        of {previewData?.duration} hours duration at the
                        Kharghar Navi Mumbai center during the period
                      </td>
                    </tr>
                    <tr>
                      <td className={styles.fontStyle} colSpan={2}>
                        from{" "}
                        <span className={styles.spanStyle}>
                          {formatDate(previewData?.start)}{" "}
                        </span>{" "}
                        to{" "}
                        <span className={styles.spanStyle}>
                          {formatDate(previewData?.end)}
                        </span>{" "}
                        with the grade{" "}
                        <span className={styles.spanStyle}>
                          {previewData?.grade}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className={styles.certificateBottomDiv}>
              <td className={styles.signaturesDiv} colSpan={3}>
                <div>
                  <img
                    className={styles.imgStyle}
                    src="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1717487474/signature_r8wwkm.svg"
                    alt="signature"
                  />
                  <p className={styles.fontStyle4}>Signature</p>
                </div>

                <div>
                  <p className={styles.fontStyle4}>Valid Certificate ID:</p>
                  <p className={styles.fontStyle4}>
                    {previewData?.cer_id || `CRXXXXXXXXXXXXXXXX`}
                  </p>
                </div>

                <div
                  style={{
                    width: "50px",
                  }}
                ></div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <p className={styles.address}>
                  102-105, Royal Palace, Plot no-11, opposite to Glomax Mall,
                  Sector 2, Kharghar, Navi Mumbai, Maharashtra 410210
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CertificateModal;
