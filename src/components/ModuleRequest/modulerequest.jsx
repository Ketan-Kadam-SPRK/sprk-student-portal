import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Divider,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import dateFormator from "../../Utils/dateFormator";
import ErrorHandling from "../Common/ErrorHandling";
import { LightTooltip } from "../../Utils/LightToolTip";

import { Image } from "cloudinary-react";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";
import { modulerequest } from "./store/modulerequet.action";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

// New icons for module details
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";

function ModuleRequest() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const navigate = useNavigate();

  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error500, setError500] = useState(false);

  // New state for module details dialog
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Prevent API from being called multiple times
  const apiCalledRef = useRef(false);

  /**
   * Get Module Request data
   */
  const getAllModuleRequestData = async () => {
    setLoading(true);

    try {
      const res = await dispatch(modulerequest({ headers }));

      const data = res?.payload?.data?.data || [];
      const status = res?.payload?.status;

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        setRows(data);
      }
    } catch (error) {
      console.error("Error fetching module request data:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(selectedRequest, "selectedRequest");

  /**
   * Call API only once
   */
  useEffect(() => {
    if (apiCalledRef.current) return;

    apiCalledRef.current = true;
    getAllModuleRequestData();
  }, []);

  /**
   * Open module details dialog
   */
  const handleOpenModuleDialog = (rowData) => {
    setSelectedRequest(rowData);
    setModuleDialogOpen(true);
  };

  /**
   * Close module details dialog
   */
  const handleCloseModuleDialog = () => {
    setModuleDialogOpen(false);
    setSelectedRequest(null);
  };

  /**
   * Check whether a module is approved.
   * Supports boolean approval flags and common API status fields.
   */
  const isModuleApproved = (module) => {
    const approvalStatusFields = [
      module?.requestStatus,
      module?.status,
      module?.moduleStatus,
      module?.moduleRequestStatus,
      module?.approvalStatus,
    ];

    return (
      module?.isApproved === true ||
      module?.approved === true ||
      module?.is_approved === true ||
      approvalStatusFields.some(
        (status) =>
          String(status || "")
            .trim()
            .toUpperCase() === "APPROVED",
      )
    );
  };

  /**
   * Sort requested modules:
   * 1. Approved modules first
   * 2. Remaining modules below
   */
  const getSortedModules = (modules) => {
    if (!Array.isArray(modules)) {
      return [];
    }

    return modules
      .map((module, index) => ({
        ...module,
        _originalIndex: index,
        _isApproved: isModuleApproved(module),
      }))
      .sort((a, b) => {
        if (a._isApproved === b._isApproved) {
          return a._originalIndex - b._originalIndex;
        }

        return a._isApproved ? -1 : 1;
      });
  };

  /**
   * Prepare table rows
   */
  useEffect(() => {
    const data = Array.isArray(rows)
      ? rows.map((item, index) => ({
          id: index,
          requestBId: item?.originalBatchUid,
          AdminReason: item?.rejectionReason,
          StudentReason: item?.requestReason,
          courseName: item?.courseName,
          date: item?.appliedDate,

          // Correctly map request status
          requestStatus: item?.requestStatus,

          reassignId: item?.targetBatchID,

          // New: retain requested modules for the dialog
          modules: Array.isArray(item?.modules) ? item.modules : [],

          // Additional request details for the dialog
          originalBatchUid: item?.originalBatchUid,
          rejectionReason: item?.rejectionReason,
          requestReason: item?.requestReason,
        }))
      : [];

    setFilterData(data);
  }, [rows]);

  /**
   * Table Columns
   */
  const columns = [
    {
      headerName: "Request BatchId",
      id: "requestBId",
      minWidth: 160,
      format: (value) => {
        if (!value) return "--";

        return (
          <Typography
            component="span"
            sx={{
              color: "#1976D2",
              cursor: "pointer",
              fontWeight: 500,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate(`/Batches/${value}?tab=MODULES`)}
          >
            {value}
          </Typography>
        );
      },
    },
    {
      headerName: "Course Name",
      id: "courseName",
      minWidth: 180,
      format: (value) => value || "--",
    },
    {
      headerName: "Date",
      id: "date",
      minWidth: 150,
      format: (value) => {
        if (!value) return "--";

        return dateFormator(value);
      },
    },
    {
      headerName: "Request Status",
      id: "requestStatus",
      minWidth: 160,
      format: (status, rowData) => {
        const getStatusStyle = (status) => {
          switch (status) {
            case "APPROVED":
              return {
                color: "#239A60",
                backgroundColor: "#B0F7CC",
              };

            case "PENDING":
              return {
                color: "#783B09",
                backgroundColor: "#FFFFB8",
              };

            case "REJECTED":
              return {
                color: "#A30000",
                backgroundColor: "#FFC0C0",
              };

            case "WITHDREW":
              return {
                color: "#1C4963",
                backgroundColor: "#DDEBFF",
              };

            default:
              return {
                color: "#555555",
                backgroundColor: "#E0E0E0",
              };
          }
        };

        const formatForDisplay = (status) => {
          if (!status) return "--";

          switch (status) {
            case "APPROVED":
              return "Approved";

            case "PENDING":
              return "Pending";

            case "DECLINED":
              return "Declined";

            case "WITHDREW":
              return "Withdrew";

            default:
              return status
                .toLowerCase()
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
          }
        };

        const { color, backgroundColor } = getStatusStyle(status);

        return (
          <div
            style={{
              color,
              backgroundColor,
              textAlign: "center",
              borderRadius: "20px",
              minHeight: "35px",
              padding: "8px 15px",
              minWidth: "130px",
              fontWeight: "bold",
              display: "flex",
              fontSize: "14px",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "180px",
              margin: "auto",
            }}
          >
            {formatForDisplay(status)}

            {status === "DECLINED" && rowData?.AdminReason && (
              <LightTooltip title={rowData.AdminReason} arrow>
                <InfoIcon
                  sx={{
                    color: "#9F0000",
                    marginLeft: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                />
              </LightTooltip>
            )}
          </div>
        );
      },
    },

    {
      headerName: "Reassign BatchId",
      id: "reassignId",
      minWidth: 160,
      // align: "center",
      // headerAlign: "center",
      format: (value) => {
        if (!value) return "_";

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography
              component="span"
              sx={{
                color: "#1976D2",
                cursor: "pointer",
                fontWeight: 500,
                textAlign: "center",
              }}
              onClick={() => navigate(`/Batches/${value}?tab=MODULES`)}
            >
              {value}
            </Typography>
          </Box>
        );
      },
    },
    // {
    //   headerName: "Student Reason",
    //   id: "StudentReason",
    //   minWidth: 220,
    //   format: (value) => (
    //     <LightTooltip title={value || "--"} arrow>
    //       <span
    //         style={{
    //           display: "block",
    //           maxWidth: "220px",
    //           whiteSpace: "nowrap",
    //           overflow: "hidden",
    //           textOverflow: "ellipsis",
    //         }}
    //       >
    //         {value || "--"}
    //       </span>
    //     </LightTooltip>
    //   ),
    // },
    // {
    //   headerName: "Cancel Reason",
    //   id: "AdminReason",
    //   minWidth: 220,
    //   format: (value) => (
    //     <LightTooltip title={value || "--"} arrow>
    //       <span
    //         style={{
    //           display: "block",
    //           maxWidth: "220px",
    //           whiteSpace: "nowrap",
    //           overflow: "hidden",
    //           textOverflow: "ellipsis",
    //         }}
    //       >
    //         {value || "--"}
    //       </span>
    //     </LightTooltip>
    //   ),
    // },

    // New Action column
    {
      headerName: "Request Details",
      id: "action",
      minWidth: 100,
      maxWidth: 120,
      sortable: false,
      filterable: false,
      format: (value, rowData) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Tooltip title="View Requested Modules" arrow>
            <IconButton
              size="small"
              aria-label="View requested modules"
              onClick={(event) => {
                event.stopPropagation();
                handleOpenModuleDialog(rowData);
              }}
              sx={{
                color: "#1976D2",
                backgroundColor: "#EAF3FF",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#D5E7FF",
                },
              }}
            >
              <DescriptionOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Prepare sorted modules for the currently selected request
  const selectedModules = getSortedModules(selectedRequest?.modules);

  const approvedModules = selectedModules.filter(
    (module) => module._isApproved,
  );
  const approvedCount = approvedModules.length;
  const totalRequested = selectedModules.length;

  /**
   * Loading / Error
   */
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
        overflow: "auto",
        flex: 1,
      }}
    >
      {/* ================= PAGE HEADER ================= */}
      <Helmet>
        <title>{meta?.moduleReassign?.title || "Module Reassign"}</title>

        <meta
          name="description"
          content={meta?.moduleReassign?.description || "Module Reassign"}
        />

        <meta
          property="og:title"
          content={meta?.moduleReassign?.title || "Module Reassign"}
        />

        <meta
          property="og:description"
          content={meta?.moduleReassign?.description || "Module Reassign"}
        />

        {meta?.moduleReassign?.ogImage && (
          <meta property="og:image" content={meta.moduleReassign.ogImage} />
        )}

        {meta?.moduleReassign?.url && (
          <meta
            property="og:url"
            content={`https://student.sprktechnologies.in${meta.moduleReassign.url}`}
          />
        )}
      </Helmet>

      {/* ================= HEADER ================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1.5rem",
                sm: "1.5rem",
                md: "2rem",
              },
              color: "#0A2647",
            }}
          >
            Module Request
          </Typography>

          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739253981/calendar-svgrepo-com_2_1_dkekjd.svg"
            cloudName="dxlzzgbfw"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
            }}
          />
        </Box>

        <Typography
          fontSize="var(--font-size-medium)"
          sx={{
            color: "#4D535A",
          }}
        >
          Track module reassignment requests.
        </Typography>
      </Box>

      {/* ================= TABLE ================= */}
      <Box>
        <CustomAgGrid
          rows={filterData}
          columns={columns}
          noDatalength={rows}
          paginationModel={{
            page: 0,
            pageSize: 10,
          }}
          checkboxSelection={false}
          errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737008545/calendar_with_marks_uh7eeu.svg"
          errorHeading="No Module Reassignments Yet!"
          errorDescription="No module reassignment requests are available."
        />
      </Box>

      {/* ================= REQUESTED MODULES DIALOG ================= */}
      <Dialog
        open={moduleDialogOpen}
        onClose={handleCloseModuleDialog}
        fullWidth
        maxWidth="md"
        aria-labelledby="requested-modules-dialog-title"
        PaperProps={{
          sx: {
            overflow: "hidden",
          },
        }}
      >
        {/* Dialog Header */}
        <DialogTitle
          id="requested-modules-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            backgroundColor: "#F5F8FC",
            py: 2,
            px: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#0A2647",
              }}
            >
              Module Reassignment Request Details
            </Typography>

            <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
              {selectedRequest?.courseName || "Course"}{" "}
              {selectedRequest?.originalBatchUid
                ? `• ${selectedRequest.originalBatchUid}`
                : selectedRequest?.requestBId
                  ? `• ${selectedRequest.requestBId}`
                  : ""}
            </Typography>
          </Box>

          <IconButton
            onClick={handleCloseModuleDialog}
            aria-label="Close requested modules dialog"
            size="small"
            sx={{
              color: "#64748B",
              "&:hover": {
                backgroundColor: "#E2E8F0",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent
          sx={{
            p: { xs: 2, sm: 3 },
            maxHeight: "65vh",
            overflowY: "auto",
          }}
        >
          {/* Module Summary */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              mb: 2.5,
            }}
          >
            <Chip
              label={`Total Requested: ${totalRequested}`}
              size="small"
              sx={{
                fontWeight: 600,
                backgroundColor: "#EAF3FF",
                color: "#1557A0",
              }}
            />

            {String(selectedRequest?.requestStatus || "")
              .trim()
              .toUpperCase() === "APPROVED" && (
              <Chip
                label={`Approved Modules: ${approvedCount} / ${totalRequested}`}
                size="small"
                sx={{
                  fontWeight: 600,
                  backgroundColor: "#E8F8EE",
                  color: "#197545",
                }}
              />
            )}
          </Box>

          {/* Simple Module List */}
          {selectedModules.length === 0 ? (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#64748B",
                py: 4,
              }}
            >
              No requested modules found.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {selectedModules.map((module, index) => (
                <Box
                  key={module?.moduleUid || index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    py: 1,
                  }}
                >
                  {String(selectedRequest?.requestStatus || "")
                    .trim()
                    .toUpperCase() !== "PENDING" &&
                    (module._isApproved ? (
                      <CheckCircleIcon
                        sx={{
                          color: "#2E7D32",
                          fontSize: 22,
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <CancelIcon
                        sx={{
                          color: "#D32F2F",
                          fontSize: 22,
                          flexShrink: 0,
                        }}
                      />
                    ))}

                  <Typography variant="body2">{module?.moduleName}</Typography>
                </Box>
              ))}
            </Stack>
          )}

          {/* Request Information - kept below the module list */}
          {(selectedRequest?.requestReason ||
            selectedRequest?.rejectionReason) && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2 }} />

              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#0A2647",
                  mb: 1.5,
                }}
              >
                Request Details
              </Typography>

              {selectedRequest?.requestReason && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748B",
                      fontWeight: 600,
                    }}
                  >
                    Student's Reason for Request
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#334155",
                      mt: 0.5,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {selectedRequest.requestReason}
                  </Typography>
                </Box>
              )}

              {selectedRequest?.rejectionReason && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748B",
                      fontWeight: 600,
                    }}
                  >
                    Admin's Rejection Reason
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#A30000",
                      mt: 0.5,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {selectedRequest.rejectionReason}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        <Divider />

        {/* Footer */}
        <DialogActions
          sx={{
            p: 2,
            px: 3,
            backgroundColor: "#F8FAFC",
          }}
        >
          <Button
            onClick={handleCloseModuleDialog}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ModuleRequest;
