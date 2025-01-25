import React from "react";
import styles from "./StdCertification.module.css";
import { useSelector } from "react-redux";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(/\s/g, "-");
}

function CertificateModal({ targetRef, previewData, sprkLogo }) {
    return (
        <div className={styles.Certification} ref={targetRef}>
          <div className={styles.CertificationContainer}>
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
                            {previewData?.preview?.stu_name || "dummy"}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.fontStyle} colSpan={2}>
                            in the year{" "}
                            {new Date(previewData?.preview?.end).getFullYear()} for
                            Successfully
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.fontStyle} colSpan={2}>
                            completing the course{" "}
                            <span className={styles.spanStyle}>
                              “{previewData?.cou_gro_name}”
                            </span>{" "}
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.fontStyle} colSpan={2}>
                            of {previewData?.preview?.duration} hours duration at
                            the Kharghar Navi Mumbai center during the period
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
                              {formatDate(previewData?.preview?.end)}
                            </span>{" "}
                            with the grade{" "}
                            <span className={styles.spanStyle}>
                              {previewData?.preview?.grade}
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
                        {previewData?.preview?.cer_id || `CRXXXXXXXXXXXXXXXX`}
                      </p>
                    </div>
    
                    <div></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className={styles.address}>
                    102-105, Royal Palace, Plot no-11, opposite to Glomax Mall,
                    Sector 2, Kharghar, Navi Mumbai, Maharashtra 410210
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default CertificateModal