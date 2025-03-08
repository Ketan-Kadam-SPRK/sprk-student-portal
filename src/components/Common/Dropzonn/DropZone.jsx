import React from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Button } from "@mui/material";
import Swal from "sweetalert";
import imageCompression from "browser-image-compression"; // Import the compression library
import style from "../Dropzonn/dropZone.module.css";

const FILE_LIMITS = {
  MAX_SIZE: 1024 * 1024, // 1MB
  MAX_COMPRESS_SIZE: 10 * 1024 * 1024, // 10MB
};

const FILE_FORMATS = {
  excel: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  pdf: ["application/pdf"],
  img: ["image/jpeg", "image/png"],
  archive: [
    "application/zip", // For .zip files
    "application/x-rar-compressed", // For .rar files
  ],
  all: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/zip", // For .zip files
    "application/x-rar-compressed", // For .rar files
  ],
};

function Dropzone({
  onFileAccepted,
  fileInputRef,
  fileTypeForm,
  setLoadingFile = () => {},
}) {
  const allowedFormats = FILE_FORMATS[fileTypeForm] || [];
  const displayFormats =
    {
      excel: ".xls, .xlsx",
      pdf: ".pdf",
      img: ".jpg, .jpeg, .png",
      archive: ".zip, .rar",
      all: "*",
    }[fileTypeForm] || "";

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: allowedFormats.length > 0 ? allowedFormats : undefined,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles, rejectedFiles) => {
      validateAndHandleFiles(acceptedFiles, rejectedFiles);
    },
  });

  const handleBrowseClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    if (e.target?.files?.length > 0) {
      const file = e.target.files[0];
      validateAndHandleFiles([file], []);
    }
  };

  const validateAndHandleFiles = (acceptedFiles, rejectedFiles) => {
    const filteredFiles = acceptedFiles.filter((file) =>
      allowedFormats.includes(file.type)
    );
    if (
      rejectedFiles.length > 0 ||
      filteredFiles.length !== acceptedFiles.length
    ) {
      showAlert(
        "Invalid file type",
        `Please upload a file in one of the following formats: ${displayFormats}`,
        "error"
      );
      return;
    }

    if (filteredFiles.length > 0) {
      setLoadingFile(true);
      handleFileSizeCheck(filteredFiles[0]);
    }
  };

  const handleFileSizeCheck = async (file) => {
    if (file.size > FILE_LIMITS.MAX_COMPRESS_SIZE) {
      showAlert(
        "File Size Exceeds Limit",
        "The file size exceeds the 1MB limit. Please upload a smaller file.",
        "error"
      );
      setLoadingFile(false);
      return;
    }

    if (file.size > FILE_LIMITS.MAX_SIZE && file.type.startsWith("image")) {
      await compressAndHandleImage(file);
    } else {
      onFileAccepted(file);
      setLoadingFile(false);
    }
  };

  const compressAndHandleImage = async (file) => {
    try {
      const options = { maxSizeMB: 1, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      if (compressedFile.size > FILE_LIMITS.MAX_SIZE) {
        showAlert(
          "File Size Exceeds Limit",
          "The file size exceeds the 1MB limit. Please upload a smaller file.",
          "error"
        );
        setLoadingFile(false);
        return;
      }

      const newFile = new File([compressedFile], compressedFile.name, {
        type: compressedFile.type,
        size: compressedFile.size,
        lastModified: compressedFile.lastModified,
      });
      onFileAccepted(newFile);
      setLoadingFile(false);
    } catch (error) {
      console.error("Image compression failed:", error);
      showAlert(
        "Compression Failed",
        "There was an error compressing the image. Please try again with a smaller file.",
        "error"
      );
      setLoadingFile(false);
    }
  };

  const showAlert = (title, text, icon) => {
    Swal({ icon, title, text, dangerMode: true });
  };

  return (
    <Box
      sx={{
        mx: { xs: 2, sm: 5, md: 9 },
        py: 2,
        mt: 2,
        border: "1px solid #ccc",
        textAlign: "center",
      }}
      className={style.browseDiv}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <label>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept={allowedFormats.join(",")}
          onChange={handleFileChange}
        />
        <img
          src="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1693310615/Upload_icon_me7ydj.svg"
          alt="Upload Icon"
          style={{ width: "50px", marginBottom: "8px" }}
        />
        <Typography sx={{ fontSize: "14px", fontWeight: "bold", mt: 1 }}>
          {isDragActive ? "Drop files here ..." : "Drag & drop files or"}
          <Button
            onClick={handleBrowseClick}
            sx={{ fontSize: "14px", fontWeight: "bold" }}
          >
            Browse
          </Button>
        </Typography>
        <Typography sx={{ fontSize: "12px", mt: 1 }}>
          Supported formats: {displayFormats}
        </Typography>
      </label>
    </Box>
  );
}

export default Dropzone;
