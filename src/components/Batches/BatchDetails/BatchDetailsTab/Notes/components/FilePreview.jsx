import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import styles from "./filePreview.module.css"; // CSS Module

export default function FilePreview({ attachments }) {
  const getFileType = (url = "") => {
    const ext = url.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["jpg", "jpeg", "png"].includes(ext)) return "image";
    return "other";
  };

  return (
    <Box className={styles.filePreviewGrid}>
      {attachments?.map((file, idx) => (
        <Box key={idx} className={styles.attachmentCard}>
          {/* File Preview */}
          {getFileType(file.imageUrl) === "pdf" ? (
            <Box className={styles.pdfThumb}>
              <PictureAsPdfIcon fontSize="large" color="error" />
            </Box>
          ) : getFileType(file.imageUrl) === "image" ? (
            <img
              src={file.imageUrl}
              alt={file.publicId}
              className={styles.fileThumb}
            />
          ) : (
            <Box className={styles.otherThumb}>📎</Box>
          )}

          {/* File Name */}
          <Typography
            variant="caption"
            noWrap
            className={styles.fileName}
            title={file.imageUrl}
          >
            {file.imageUrl.split("/").pop() || "File"}
          </Typography>

          {/* Icons */}
          <Box className={styles.iconActions}>
            <Tooltip title="View">
              <IconButton
                size="small"
                onClick={() => window.open(file.imageUrl, "_blank")}
              >
                <VisibilityIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton
                size="small"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = file.imageUrl;
                  link.download = file.imageUrl.split("/").pop();
                  link.click();
                }}
              >
                <DownloadIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
