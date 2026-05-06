import { Box, Button, Dialog, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { formatForDisplay } from "../../Utils/formateForDisplay";
import { LightTooltip } from "../../Utils/LightToolTip";
import ErrorHandling from "../Common/ErrorHandling";
import PopupFilterComponent from "../Common/FilterMenuComponent/PopupFilterComponent";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";
import { getAllEvents } from "./event.action";
import { formatDateTime } from "../../Utils/dateTimeFormator";
import EventPreviewModal from "./child/EventPreviewModal";
import dateFormator from "../../Utils/dateFormator";

function Events() {
  const [openEvent, setOpenEvent] = useState(false);
  const dispatch = useDispatch();
  const headers = useAuthHeaders();

  const [loading, setLoading] = useState(false);
  const [eventUid, setEventUid] = useState(null);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [error500, setError500] = useState(false);
  const [eventStatus, setEventStatus] = useState("VIEW");

  // ================= FETCH EVENTS =================
  const handleGetAllEvents = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllEvents({ headers }));

      const data = res?.payload?.data?.data || [];
      const status = res?.payload.status;

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        const formattedData = data.map((item) => ({
          ...item,
          marksStatus: item.marksReleased ? "RELEASED" : "PENDING",
          participationFilterStatus: getParticipationStatus(item),
        }));

        setData(formattedData);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching events:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllEvents();
  }, []);

  // ================= EVENT STATUS =================
  const getEventStatus = (row) => {
    if (row?.marksReleased) return "VIEW";

    if(row?.participationStatus === "Registered") return "VIEW";

    if (!row?.start) return "VIEW";

    const now = new Date().getTime();
    const start = new Date(row.start).getTime();

    return now < start ? "APPLY" : "VIEW";
  };


  const handleOpenEvent = (row) => {
    const status = getEventStatus(row);
    setEventStatus(status);
    setOpenEvent(true);
    setEventUid(row?.uid);
  };

  const handleCloseEvent = () => {
    setOpenEvent(false);
    setEventUid(null);
  };

  // ================= PARTICIPATION =================
  const getParticipationStatus = (row) => {
    const status = row?.participationStatus;
    const now = new Date().getTime();
    const end = row?.end ? new Date(row.end).getTime() : null;

    if (status === "ATTENDED") return "Attended";
    if (status === "NOT_ATTENDED") return "Not Attended";
    if (status === "REGISTERED") return "Registered";

    if (!status) {
      if (end && end < now) return "N/A";
      return "Not Registered";
    }

    return "-";
  };

  const getParticipationColor = (status) => {
    switch (status) {
      case "Attended":
        return { color: "#1F5200", backgroundColor: "#CBFFAC" };
      case "Not Attended":
        return { color: "#9F0000", backgroundColor: "#FFB5B5" };
      case "Registered":
        return { color: "#004085", backgroundColor: "#CCE5FF" };
      case "Not Registered":
        return { color: "#856404", backgroundColor: "#FFF3CD" };
      case "N/A":
        return { color: "#6c757d", backgroundColor: "#E2E3E5" };
      default:
        return { color: "", backgroundColor: "" };
    }
  };

  // ================= MARKS STATUS =================
  const getColorAndBackground = (status) => {
    switch (status) {
      case "RELEASED":
        return { color: "#1F5200", backgroundColor: "#CBFFAC" };
      case "PENDING":
        return { color: "#503d06", backgroundColor: "#f5f56c" };
      default:
        return { color: "", backgroundColor: "" };
    }
  };

  // ================= COMMON BADGE =================
  const StatusBadge = ({ label, color, backgroundColor }) => {
    return (
      <Box
        sx={{
          color,
          backgroundColor,
          textAlign: "center",
          borderRadius: "20px",
          height: "30px",
          px: 2,
          fontWeight: "bold",
          display: "flex",
          fontSize: "12px",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "100px",
        }}
      >
        {label}
      </Box>
    );
  };

  // ================= COLUMNS =================
  const columns = [
    {
      headerName: "Sr.No.",
      id: "srNo",
      minWidth: 70,
      maxWidth: 80,
      format: (value, row) =>
        filterData.findIndex((item) => item.uid === row.uid) + 1,
    },
    {
      headerName: "Event Title",
      id: "title",
      minWidth: 250,
      format: (value, row) => {
        const displayValue = value || "-";
        const img = row?.thumbnail;

        return (
          <LightTooltip title={displayValue} arrow>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {img ? (
                <img
                  src={img}
                  alt="event"
                  style={{ width: 32, height: 32, borderRadius: 4 }}
                />
              ) : (
                <div style={{ width: 32, height: 32, background: "#eee" }} />
              )}
              <span>{displayValue}</span>
            </div>
          </LightTooltip>
        );
      },
    },
    {
      headerName: "Start Date",
      id: "start",
      minWidth: 150,
      format: (value) => dateFormator(value),
    },
    {
      headerName: "End Date",
      id: "end",
      minWidth: 120,
      format: (value) => dateFormator(value),
    },

    // ✅ PARTICIPATION BADGE
    {
      headerName: "Participation",
      id: "participationStatus",
      minWidth: 140,
      format: (value, row) => {
        const status = getParticipationStatus(row);
        const { color, backgroundColor } = getParticipationColor(status);

        return (
          <StatusBadge
            label={status}
            color={color}
            backgroundColor={backgroundColor}
          />
        );
      },
    },

    // ✅ MARKS STATUS BADGE
    {
      headerName: "Marks Released",
      id: "marksReleased",
      minWidth: 140,
      format: (marksReleased) => {
        const status = marksReleased ? "RELEASED" : "PENDING";
        const { color, backgroundColor } = getColorAndBackground(status);

        return (
          <StatusBadge
            label={formatForDisplay(status)}
            color={color}
            backgroundColor={backgroundColor}
          />
        );
      },
    },

    // ✅ MARKS CENTER + "-"
    {
      headerName: "Marks",
      id: "marks",
      minWidth: 90,
      format: (value) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {value ?? "-"}
        </Box>
      ),
    },

    // ✅ ACTION BUTTON
    {
      headerName: "Action",
      id: "action",
      width: 200,
      format: (action, row) => {
        const status = getEventStatus(row);

        return (
          <Button
            size="small"
            variant="contained"
            color={status === "APPLY" ? "success" : "primary"}
            onClick={() => handleOpenEvent(row)}
          >
            {status === "APPLY" ? "Apply" : "View"}
          </Button>
        );
      },
    },
  ];

  if (loading || error500) {
    return <ErrorHandling error500={error500} loadData={loading} />;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Helmet>
        <title>{meta.events.title}</title>
      </Helmet>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography             sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
              color: "#0A2647",
            }}>
          Your Events
        </Typography>
        <Image
          style={{
            width: "auto",
            height: "40px",
            objectFit: "contain",
            marginLeft: "5px",
          }}
          publicId={
            "https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739253981/red_and_white_megaphone_n6xssx.svg"
          }
          cloudName="dxlzzgbfw"
        />
      </Box>
      <Typography fontSize={"var(--font-size-medium)"} color="#4D535A">
        All your events and results at a glance.
      </Typography>

<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <PopupFilterComponent
        rowData={data}
        statusOptions={[
          "Attended",
          "Not Attended",
          "Registered",
          "Not Registered",
          "N/A",
        ]}
        statusKey="participationFilterStatus"
        setFilterData={setFilterData}
        dateKey="start"
        // statusKey="marksStatus"
      />
</Box>


      <CustomAgGrid
        rows={filterData}
        columns={columns}
        noDatalength={data}
        height={500}
      />

      <Dialog open={openEvent} maxWidth="md" fullWidth>
        <EventPreviewModal
          eventUid={eventUid}
          handleCloseEvent={handleCloseEvent}
          eventStatus={eventStatus}
        />
      </Dialog>
    </Box>
  );
}

export default Events;
