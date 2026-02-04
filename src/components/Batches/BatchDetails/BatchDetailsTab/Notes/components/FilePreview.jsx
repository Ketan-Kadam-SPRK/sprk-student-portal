import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import styles from "./filePreview.module.css"; // CSS Module
import ArticleIcon from "@mui/icons-material/Article";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { getNotesFileById } from "../action/notes.action";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../../../../Hooks/useAuthHeaders";
import { normalizeRenderType } from "../NotesHelper";

const renderThumbnail = (file) => {
  const fileType = normalizeRenderType(file.name, file.type);

  switch (fileType) {
    case "pdf":
      return (
        <Box className={styles.pdfThumb}>
          <PictureAsPdfIcon fontSize="large" color="error" />
        </Box>
      );

    case "image":
      return (
        <Box className={styles.otherThumb}>
          <PermMediaIcon fontSize="large" color="primary" />
        </Box>
      );

    case "office":
      return (
        <Box className={styles.otherThumb}>
          <ArticleIcon fontSize="large" color="primary" />
        </Box>
      );

    case "zip":
      return (
        <Box className={styles.otherThumb}>
          <FolderZipIcon fontSize="large" color="warning" />
        </Box>
      );

    default:
      return <Box className={styles.otherThumb}>📎</Box>;
  }
};

export default function FilePreview({ attachments }) {

  const dispatch = useDispatch();
  const headers = useAuthHeaders();

    const handlePreview = async (file) => {
    try {
      // Cloudinary file
      if (file.source === "cloudinary") {
        window.open(file.previewUrl, "_blank");
        return;
      }

      const response = await dispatch(
        getNotesFileById({
          headers,
          fileId: file.fileUid,
        }),
      );
      
      // ✅ Blob received directly
      const blob = response.payload.data;

      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");

      // cleanup
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("File preview failed", error);
    }
  };

  /* ================= DOWNLOAD ================= */
  const handleDownload = async (file) => {
    console.log(file,"file in preview");
    try {
      let blob;

      if (file.source === "cloudinary") {
        const res = await fetch(file.previewUrl);
        blob = await res.blob();
      } else {
        const response = await dispatch(
          getNotesFileById({
            headers,
            fileId: file.fileUid,
          }),
        );

        blob = response.payload.data;
      }

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("File download failed", error);
    }
  };

  return (
    <Box className={styles.filePreviewGrid}>
      {attachments?.map((file, idx) => (
        <Box key={idx} className={styles.attachmentCard}>
          {/* File Preview */}
          {renderThumbnail(file)}

          {/* File Name */}
          <Typography
            variant="caption"
            noWrap
            className={styles.fileName}
            title={file?.originalName}
          >
            {file?.originalName?.split("/").pop() || "File"}
          </Typography>

          {/* Icons */}
          <Box className={styles.iconActions}>
            {(file.type === "pdf" || file.type === "image") && (
              <Tooltip title="View">
                <IconButton size="small" onClick={() => handlePreview(file)}>
                  <VisibilityIcon sx={{ fontSize: "14px" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Download">
              <IconButton size="small" onClick={() => handleDownload(file)}>
                <DownloadIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
