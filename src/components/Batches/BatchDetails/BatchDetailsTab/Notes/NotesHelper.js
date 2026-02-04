

const getFileTypeFromName = (name = "", mimeType = "") => {
  const ext = name.split(".").pop().toLowerCase();

  if (mimeType?.startsWith("image/")) return "image";
  if (ext === "pdf") return "pdf";
  if (ext === "zip") return "zip";

  // ✅ All Office files grouped
  if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext)) {
    return "office";
  }

  return "other";
};

export  const normalizeRenderType = (name = "", type = "") => {
  const ext = name.split(".").pop()?.toLowerCase();

  // Images (image, image/jpeg, image/png, image/webp, etc.)
  if (type === "image" || type?.startsWith("image/")) {
    return "image";
  }

  // PDF
  if (type === "pdf" || type === "application/pdf" || ext === "pdf") {
    return "pdf";
  }

  // ZIP
  if (
    type === "zip" ||
    type === "application/zip" ||
    type === "application/x-zip-compressed" ||
    ext === "zip"
  ) {
    return "zip";
  }

  // Office files
  if (
    ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext) ||
    type?.includes("officedocument") ||
    type?.includes("msword") ||
    type?.includes("excel") ||
    type?.includes("powerpoint")
  ) {
    return "office";
  }

  return "other";
};

export const normalizeAttachments = (note) => {
  const cloudinaryFiles =
    note.noteImages?.map((img) => ({
      id: img.publicId,
      name: img.originalName,
      type: getFileTypeFromName(img.originalName),
      previewUrl: img.imageUrl,
      source: "cloudinary",
    })) || [];

  const apiFiles =
    note.files?.map((file) => ({
      id: file.fileUid,
      name: file.fileName,
      type: getFileTypeFromName(file.fileName, file.fileType),
      fileUid: file.fileUid,
      source: "api",
    })) || [];

  return [...cloudinaryFiles, ...apiFiles];
};

