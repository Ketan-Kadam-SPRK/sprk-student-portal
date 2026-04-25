import { Box, Button, Dialog, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { AmountFormat } from "../../Utils/AmountFormat";
import dateFormator from "../../Utils/dateFormator";
import { formatForDisplay } from "../../Utils/formateForDisplay";
import { LightTooltip } from "../../Utils/LightToolTip";
import ErrorHandling from "../Common/ErrorHandling";
import PopupFilterComponent from "../Common/FilterMenuComponent/PopupFilterComponent";
import { Helmet } from "react-helmet-async";
import { meta } from "../../../metaConfig";
import { getAllEvents } from "./event.action";
import { formatDateTime } from "../../Utils/dateTimeFormator";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventPreviewModal from "./child/EventPreviewModal";

function Events() {
  const [openEvent, setOpenEvent] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [eventUid, setEventUid] = useState(null);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [error500, setError500] = useState(false);

  /**
   * Fetches all receipts from the server and updates the component's state.
   * It dispatches an action to retrieve receipts, sorts them by date, and updates the state with sorted data.
   */

  const handleGetAllEvents = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllEvents({ headers }));

      console.log(res, "res");
      const data = res?.payload?.data?.data || [];
      const status = res?.payload.status;

      console.log(data, "Data");
      // const sortedData = data.sort((a, b) => b.receipt_id - a.receipt_id);
      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        const formattedData = data.map((item) => ({
          ...item,
          marksStatus: item.marksReleased ? "RELEASED" : "PENDING",
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

  /**
   * Handles opening of the receipt modal when a receipt is clicked.
   * Toggles openReciept state and sets receiptId state to the clicked receipt's id.
   * @param {Object} row - A receipt object with receipt_code property.
   */
  const handleOpenEvent = (row) => {
    setOpenEvent(!openEvent);
    setEventUid(row?.uid);
  };

  const getColorAndBackground = (marksReleased) => {
    switch (marksReleased) {
      case "RELEASED":
        return { color: "#1F5200", backgroundColor: "#CBFFAC" };
      case "PENDING":
        return { color: "#9F0000", backgroundColor: "#FFB5B5" };
      default:
        return { color: "", backgroundColor: "" };
    }
  };

  const StatusBadge = ({ status }) => {
    const { color, backgroundColor } = getColorAndBackground(status);

    return (
      <div
        style={{
          color: color,
          backgroundColor: backgroundColor,
          textAlign: "center",
          borderRadius: "20px",
          height: "35px",
          padding: "15px",
          minWidth: "150px",
          fontWeight: "bold",
          display: "flex",
          fontSize: "14px",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "200px",
        }}
      >
        {formatForDisplay(status)}
      </div>
    );
  };

  const columns = [
    {
      headerName: "Sr.No.",
      id: "srNo",
      minWidth: 80,
      maxWidth: 90,
      format: (value, row) => {
        return filterData.findIndex((item) => item.uid === row.uid) + 1;
      },
    },
    {
      headerName: "Event Title",
      id: "title",
      minWidth: 250,
      filterable: false,
      format: (value, row) => {
        const displayValue = value || "-";
        const img = row?.thumbnail;

        return (
          <LightTooltip title={displayValue} arrow>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                maxWidth: "230px",
                cursor: "pointer",
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt="event"
                  loading="lazy"
                  style={{
                    width: "32px",
                    height: "32px",
                    objectFit: "contain",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#eee",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                />
              )}

              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
              >
                {displayValue}
              </span>
            </div>
          </LightTooltip>
        );
      },
    },
    {
      headerName: "Start Date",
      id: "start",
      minWidth: 150,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => formatDateTime(value),
    },
    {
      headerName: "End Date",
      id: "end",
      minWidth: 120,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => formatDateTime(value),
    },

    {
      headerName: "Marks Released",
      id: "marksReleased",
      minWidth: 150,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      format: (marksReleased) => {
        const status = marksReleased ? "RELEASED" : "PENDING";
        return <StatusBadge status={status} />;
      },
    },

    {
      headerName: "Marks",
      id: "marks",
      minWidth: 120,
    },
    {
      headerName: "Action",
      id: "receipt_id",
      width: 300,
      format: (action, row) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{ textWrap: "nowrap" }}
              size="small"
              variant="contained"
              onClick={() => handleOpenEvent(row)}
              data-testid={`view-receipt-btn`}
            >
              View
            </Button>
          </Box>
        );
      },
    },
  ];

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
      <Helmet>
        <title>{meta.events.title}</title>
        <meta name="description" content={meta.events.description} />
        <meta property="og:title" content={meta.events.title} />
        <meta property="og:description" content={meta.events.description} />
        <meta property="og:image" content={meta.events.ogImage} />
        <meta
          property="og:url"
          content={`https://student.sprktechnologies.in${meta.events.url}`}
        />
      </Helmet>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem" },
              color: "#0A2647",
            }}
          >
            Your Events
          </Typography>
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1740203145/receipt_slip01_neabsa.svg"
            cloudName="dxlzzgbfw"
            style={{
              width: "auto",
              height: "40px",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography
          fontSize={"var(--font-size-medium)"}
          sx={{ color: "#4D535A" }}
        >
          View all your events, schedules, and marks in one place
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <PopupFilterComponent
          rowData={data}
          statusOptions={["RELEASED", "PENDING"]}
          setFilterData={setFilterData}
          dateKey="start"
          statusKey="marksStatus"
          tabName="Events"
        />
      </Box>

      <Box>
        <CustomAgGrid
          rows={filterData}
          columns={columns}
          noDatalength={data}
          paginationModel={{ page: 0, pageSize: 10 }}
          height={500}
          checkboxSelection={false}
          errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739604325/Calculator_of_modern_design_two_billing_checks_and_bank_plastic_card_kvi8v4.svg"
          errorHeading="No Receipts!"
          errorDescription="Your admission is processed using the credit method, so no receipt is generated."
        />
      </Box>
      <Dialog
        open={openEvent}
        onClose={() => handleOpenPayment(null)}
        maxWidth="md"
        fullWidth={true}
      >
        <EventPreviewModal eventUid={eventUid} />
      </Dialog>
    </Box>
  );
}

export default Events;
