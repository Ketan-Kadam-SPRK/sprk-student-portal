import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import dateFormator from "../../Utils/dateFormator";
import { formatForDisplay } from "../../Utils/formateForDisplay";
import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import { AmountFormat } from "../../Utils/AmountFormat";
import BookingAknowLetter from "./modals/BookingAknowLetter";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import FormatDate from "../../Utils/FormatDate";
import Receipt from "./modals/Receipt/Receipt";
import { CapitalFirstLetterOnly } from "../../Utils/CapitalFirstLetterOnly";
import ErrorHandling from "../Common/ErrorHandling";
import { getBookingInstallments } from "./action/Payment.action";
import MakePayment from "./MakePayment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PaymentHistory from "./modals/paymentHistory/PaymentHistory";

function PaymentDetails() {
  const navigate = useNavigate();
  const [openReciept, setOpenReciept] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [receiptId, setReceiptId] = useState(null);
  const { booking_uid } = useParams();
  const [data, setData] = useState([]);
  const [error500, setError500] = useState(false);
  const [error404, setError404] = useState(false);
  const [openPaymentHistory, setOpenPaymentHistory] = useState(false);
  const handleClosePaymentHistory = () => {
    setOpenPaymentHistory(false);
  };

  const [PaymentHistoryData, setPaymentHistoryData] = useState([]);

  const handleDetailModal = () => {
    setOpenDetailModal(!openDetailModal);
  };

  const handleOpenPayment = (row) => {
    setOpenReciept(!openReciept);
    setReceiptId(row?.receipt_code);
  };
  const handleClosePayment = () => {
    setOpenReciept(!openReciept);
  };

  /**
   * Fetches the booking installments from the server
   * Sets the 'data' state with the response from the server
   */
  const getBookingInstallmentDetails = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        getBookingInstallments({ headers, booking_uid })
      );
      let data = res?.payload?.data?.data || {};
      const status = res?.payload?.status;
      data.instal =
        data.instal?.map((installment) => ({
          ...installment,
          month: installment?.due_at,
        })) || [];

      if (status === 500 || status === 503) {
        setError500(true);
      } else if (status === 404 || status === 400) {
        setError404(true);
      } else {
        setData(data);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingInstallmentDetails();
  }, []);

  /**
   * Determines the overall payment status of an array of installments.
   * The order of precedence for statuses is OVERDUE > DUE > PENDING > PAID.
   * If any installment is OVERDUE, the overall status is OVERDUE.
   * If no installment is OVERDUE, but at least one is DUE, the overall status is DUE.
   * If no installment is OVERDUE or DUE, but at least one is PENDING, the overall status is PENDING.
   * If no installment is OVERDUE, DUE, or PENDING, the overall status is PAID.
   * @param {Array} installments - An array of installment objects, each containing an `installment_status` property.
   * @returns {string} - The overall payment status.
   */
  const determinePaymentStatus = (installments) => {
    let statuses = installments?.map((i) => i.installment_status) || [];
    if (statuses.includes("OVERDUE")) return "OVERDUE";
    if (statuses.includes("DUE")) return "DUE";
    if (statuses.includes("PENDING")) return "PENDING";
    return "PAID";
  };

  const latestUnpaidId = data?.instal
    ?.filter((i) => i.installment_status !== "PAID")
    ?.sort(
      (a, b) => new Date(a.due_at) - new Date(b.due_at)
    )[0]?.installment_id;

  /**
   * Retrieves the full month name from a given date string.
   * @param {string} dateString - A string representing a date.
   * @returns {string} - The full name of the month (e.g., "January"). Returns an empty string if the date is invalid or undefined.
   */

  const getMonthName = (dateString) => {
    if (!dateString) return ""; // Handle invalid or undefined date
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long" }); // Returns full month name (e.g., "January")
  };

  /**
   * Given an installment status, returns an object containing the corresponding
   * color and backgroundColor.
   * @param {string} installment_status - The status of the installment.
   * @returns {object} - An object with `color` and `backgroundColor` properties.
   */

  const getColorAndBackground = (installment_status) => {
    switch (installment_status) {
      case "PAID":
        return { color: "#1F5200", backgroundColor: "#CBFFAC" };
      case "DUE":
        return { color: "#52007A", backgroundColor: "#E4AEFF" };
      case "PENDING":
        return { color: "#755200", backgroundColor: "#FFF3A4" };
      case "OVERDUE":
        return { color: "#9F0000", backgroundColor: "#FFB5B5" };
      case "PROCESSING":
        return { color: "#004085", backgroundColor: "#CCE5FF" };

      default:
        return { color: "", backgroundColor: "" };
    }
  };

  /**
   * A component that displays a badge indicating the status of an installment.
   * The badge has a different color and background color depending on the status.
   * @param {string} status - The status of the installment.
   * @returns {JSX.Element} - A badge displaying the status.
   */
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
    // {
    //   headerName: "Month",
    //   id: "month",
    //   minWidth: 150,
    //   filterable: false,
    //   format: (value) => getMonthName(value),
    // },
    {
      headerName: "Due Date",
      id: "due_at",
      minWidth: 150,
      filterable: false,
      format: (value) => dateFormator(value),
    },

    {
      headerName: "Due Amount",
      id: "due_amount",
      minWidth: 150,
      filterable: false,
      format: (value) => AmountFormat(value),
    },
    {
      headerName: "Paid Amount",
      id: "paid_amount",
      minWidth: 150,
      format: (value) => AmountFormat(value),
    },
    {
      headerName: "Mode of Payment",
      id: "mode_of_Payment",
      minWidth: 150,
      format: (value) => formatForDisplay(value),
    },

    {
      headerName: "Status",
      id: "installment_status",
      minWidth: 150,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      format: (installment_status, rowData) => (
        <StatusBadge status={installment_status} />
      ),
    },
    {
      headerName: "Payment Attempts",
      id: "payment_attempts",
      minWidth: 150,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      format: (payment_attempts, rowData) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>{payment_attempts?.length || "-"}</Typography>
          {payment_attempts?.length > 0 && (
            <IconButton
              size="small"
              onClick={() => {
                setOpenPaymentHistory(true);
                setPaymentHistoryData(payment_attempts);
              }}
              data-testid={`view-payments-btn`}
            >
              <RemoveRedEyeIcon color="primary" />
            </IconButton>
          )}
        </Box>
      ),
    },
    {
      headerName: "Action",
      id: "leaveRequestUid",
      width: 300,
      format: (action, row) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MakePayment
              row={row}
              disabled={
                row?.installment_status === "PAID" ||
                row?.installment_id !== latestUnpaidId ||
                row?.installment_status === "PROCESSING"
              }
              getBookingInstallmentDetails={getBookingInstallmentDetails}
            />
            <Button
              sx={{ textWrap: "nowrap" }}
              size="small"
              variant="contained"
              onClick={() => handleOpenPayment(row)}
              disabled={row?.installment_status !== "PAID"}
              data-testid={`view-receipt-btn`}
            >
              View Receipt
            </Button>
          </Box>
        );
      },
    },
    {
      headerName: "Paid On",
      id: "paid_at",
      minWidth: 150,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => dateFormator(value),
    },
  ];

  if (loading || error500 || error404) {
    return (
      <ErrorHandling
        error500={error500}
        loadData={loading}
        notFound={error404}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        pb: 2,
        overflow: "auto",
        flex: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          gap: "20px",
        }}
      >
        {/* Back Button */}
        <Box sx={{ display: "flex" }}>
          <Button
            variant="outlined"
            sx={{ color: "#747474" }}
            onClick={() => navigate(-1)}
          >
            {<ArrowBackIcon />}
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
            PAYMENT STATUS:
          </Typography>
          <StatusBadge status={determinePaymentStatus(data?.instal)} />
        </Box>
      </Box>
      <Box sx={{ px: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            mt: 2,
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={
                <InfoRoundedIcon
                  sx={{ fontSize: "30px", color: "#0073E6 !important" }}
                />
              }
            >
              <Image
                publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1703153520/Vector_3_rnkyxa.svg"
                cloudName="dxlzzgbfw"
                style={{ color: "#0073E6 !important" }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "20px", sm: "25px", md: "30px" },
                  fontWeight: "bold",
                  ml: 2,
                }}
              >
                {data?.booking_code}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ color: "#0074BD", fontWeight: 600 }}>
                <Typography>
                  Course groups : {data?.course_grp?.join(" | ")}
                </Typography>
                <Typography>
                  Booking Date : {dateFormator(data?.booked_at)}
                </Typography>
                <Typography>
                  Batch Preference :{" "}
                  {CapitalFirstLetterOnly(data?.batch_prefer)}
                </Typography>
                <Typography>
                  Payment Pattern : {CapitalFirstLetterOnly(data?.payment_term)}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "10px 10px 0px 0px",
              px: 2,
              pt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #9B9B9B",
                pb: "10px",
              }}
            >
              <Box>
                <Typography variant="h6">Installments</Typography>
              </Box>
              <Box>
                <Button variant="contained" onClick={handleDetailModal}>
                  View Details
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "20px", py: "15px" }}>
              <Typography>
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  Paid Amount:
                </span>
                {AmountFormat(data?.paid_fees)}{" "}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  Payment due:
                </span>
                {AmountFormat(data?.pending_fees)}
              </Typography>
              <Typography>
                <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                  Total Amount:
                </span>{" "}
                {AmountFormat(data?.total_fees)}
              </Typography>
            </Box>
          </Box>
          <Box>
            <CustomAgGrid
              rows={data?.instal}
              columns={columns}
              noDatalength={data?.instal}
              paginationModel={{ page: 0, pageSize: 10 }}
              height={500}
              checkboxSelection={false}
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739358129/OBJECTS_1_vfdewq_qsbbyy.svg"
              errorHeading="No payments left!"
              errorDescription="Looks like you've already cleared all your payments. Enjoy your course!"
            />
          </Box>
          {data !== null &&
            data?.payment_term === "LUMPSUM" &&
            data?.pending_fees !== 0 &&
            data?.instal?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 2,
                  gap: "10px",
                  backgroundColor: "white",
                  p: 2,
                  mb: 4,
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <InfoOutlinedIcon sx={{ color: "red" }} />
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Note :</span> The
                        final due date for payment is{" "}
                        {FormatDate(
                          data?.instal[data?.instal?.length - 1]?.due_at
                        )}
                      </Typography>
                    </Box>
                    <Typography sx={{ pl: 2 }}>
                      If the payment is not completed before the deadline, your
                      payment will automatically get converted from a lumpsum to
                      an installment plan.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
        </Box>
      </Box>
      <Dialog
        open={openReciept}
        onClose={() => handleOpenPayment(null)}
        maxWidth="md"
        fullWidth={true}
      >
        <Receipt handleClosePayment={handleOpenPayment} receiptID={receiptId} />
      </Dialog>
      <Dialog open={openDetailModal} maxWidth="md" fullWidth={true}>
        <BookingAknowLetter
          handleDetailModal={handleDetailModal}
          booking_uid={booking_uid}
        />
      </Dialog>

      <Dialog open={openPaymentHistory} maxWidth="md" fullWidth={true}>
        <PaymentHistory
          handleClose={handleClosePaymentHistory}
          history={PaymentHistoryData || []}
        />
      </Dialog>
    </Box>
  );
}

export default PaymentDetails;
