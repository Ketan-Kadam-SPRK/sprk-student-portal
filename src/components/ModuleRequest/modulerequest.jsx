import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
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

function ModuleRequest() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error500, setError500] = useState(false);

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

  /**
   * Call API only once
   */
  useEffect(() => {
    if (apiCalledRef.current) return;

    apiCalledRef.current = true;
    getAllModuleRequestData();
  }, []);

  /**
   * Prepare table rows
   */
  useEffect(() => {
    const data = Array.isArray(rows)
      ? rows.map((item, index) => ({
          id: item?.targetBatchID || item?.originalBatchUid || index,

          requestBId: item?.originalBatchUid,
          AdminReason: item?.rejectionReason,
          StudentReason: item?.requestReason,
          courseName: item?.courseName,
          date: item?.appliedDate,
          reassignId: item?.targetBatchID,
        }))
      : [];

    setFilterData(data);
  }, [rows]);

  /**
   * Table Columns
   */
  const columns = [
    {
      headerName: "Request BID",
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
      headerName: "Cancel Reason",
      id: "AdminReason",
      minWidth: 220,
      format: (value) => (
        <LightTooltip title={value || "--"} arrow>
          <span
            style={{
              display: "block",
              maxWidth: "220px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value || "--"}
          </span>
        </LightTooltip>
      ),
    },

    {
      headerName: "Student Reason",
      id: "StudentReason",
      minWidth: 220,
      format: (value) => (
        <LightTooltip title={value || "--"} arrow>
          <span
            style={{
              display: "block",
              maxWidth: "220px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value || "--"}
          </span>
        </LightTooltip>
      ),
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
      headerName: "Reassign BID",
      id: "reassignId",
      minWidth: 160,
      format: (value) => value || "--",
    },
  ];

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
    </Box>
  );
}

export default ModuleRequest;
