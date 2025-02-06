import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dateFormator from "../../Utils/dateFormator";
import { Image } from "cloudinary-react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { formatForDisplay } from "../../Utils/formateForDisplay";
import CustomAgGrid from "../Common/CustomAgGrid/CustomAgGrid";
import { AmountFormat } from "../../Utils/AmountFormat";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BookingAknowLetter from "./modals/BookingAknowLetter";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { getBookingInstallments } from "./action/Payment.action";
import FormatDate from "../../Utils/FormatDate";
import Receipt from "./modals/Receipt/Receipt";
import { CapitalFirstLetterOnly } from "../../Utils/CapitalFirstLetterOnly";
import ErrorHandling from "../Common/ErrorHandling";

function PaymentDetails() {
  const navigate = useNavigate();
  const [openReciept, setOpenReciept] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [receiptId, setReceiptId] = useState(null);
  const { booking_uid } = useParams();
  console.log(booking_uid);
  const [data, setData] = useState([]);

  const handleDetailModal = () => {
    setOpenDetailModal(!openDetailModal);
  };

  const handleOpenPayment = (row) => {
    console.log(row);
    setOpenReciept(!openReciept);
    setReceiptId(row?.receipt_code);
  };
  const handleClosePayment = () => {
    setOpenReciept(!openReciept);
  };

  const getBookingInstallmentDetails = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        getBookingInstallments({ headers, booking_uid })
      );
      const data = res?.payload?.data?.data || [];
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingInstallmentDetails();
  }, []);

  // const data = {
  //   booking_code: "B2501KHARE5854A5",
  //   course_grp: ["Full Stack in Java", "Data Analytics", "Excel"],
  //   booked_at: "2025-01-21T07:16:16.971931Z",
  //   batch_prefer: "Weekdays",
  //   payment_term: "Installments",
  //   total_fees: 58000,
  //   pending_fees: 23200.0,
  //   paid_fees: 34800.0,
  //   instal: [
  //     {
  //       due_at: "2025-01-21",
  //       paid_at: "2025-01-21T00:00:00Z",
  //       payment_id: 1779,
  //       receipt_code: "R25012119D6623",
  //       due_amount: 11600.0,
  //       paid_amount: 11600.0,
  //       Mode_of_Payment: "CASH",
  //       installment_status: "PAID",
  //       installment_id: "IST2501211246b2b9",
  //     },
  //     {
  //       due_at: "2025-02-21",
  //       paid_at: "2025-01-21T00:00:00Z",
  //       payment_id: 1780,
  //       receipt_code: "R25012141B5CE8",
  //       due_amount: 11600.0,
  //       paid_amount: 11600.0,
  //       Mode_of_Payment: "CASH",
  //       installment_status: "PAID",
  //       installment_id: "IST25012112468d9c",
  //     },
  //     {
  //       due_at: "2025-03-21",
  //       paid_at: "2025-01-21T00:00:00Z",
  //       payment_id: 1781,
  //       receipt_code: "R250121ED470B5",
  //       due_amount: 11600.0,
  //       paid_amount: 11600.0,
  //       Mode_of_Payment: "CASH",
  //       installment_status: "PAID",
  //       installment_id: "IST25012112469a42",
  //     },
  //     {
  //       due_at: "2025-04-21",
  //       paid_at: null,
  //       payment_id: null,
  //       receipt_code: null,
  //       due_amount: 11600.0,
  //       paid_amount: null,
  //       Mode_of_Payment: null,
  //       installment_status: "PENDING",
  //       installment_id: "IST2501211246239f",
  //     },
  //     {
  //       due_at: "2025-05-21",
  //       paid_at: null,
  //       payment_id: null,
  //       receipt_code: null,
  //       due_amount: 11600.0,
  //       paid_amount: null,
  //       Mode_of_Payment: null,
  //       installment_status: "PENDING",
  //       installment_id: "IST250121124615a9",
  //     },
  //     {
  //       due_at: "2025-06-21",
  //       paid_at: null,
  //       payment_id: null,
  //       receipt_code: null,
  //       due_amount: 11600.0,
  //       paid_amount: null,
  //       Mode_of_Payment: null,
  //       installment_status: "PENDING",
  //       installment_id: "IST250121124615a9",
  //     },
  //   ],
  // };

  const getMonthName = (dateString) => {
    if (!dateString) return ""; // Handle invalid or undefined date
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long" }); // Returns full month name (e.g., "January")
  };
  const columns = [
    // {
    //   headerName: "Month",
    //   id: "due_at",
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
    { headerName: "Mode of Payment", id: "mode_of_Payment", minWidth: 150 },
    {
      headerName: "Paid On",
      id: "paid_at",
      minWidth: 150,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => dateFormator(value, 1),
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
      format: (installment_status, rowData) => {
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
            default:
              return { color: "", backgroundColor: "" };
          }
        };

        const { color, backgroundColor } =
          getColorAndBackground(installment_status);

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
            {formatForDisplay(installment_status)}
          </div>
        );
      },
    },
    {
      headerName: "Action",
      id: "leaveRequestUid",
      width: 300,
      format: (action, row) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{ textWrap: "nowrap" }}
              size="small"
              variant="contained"
              onClick={() => handleOpenPayment(row)}
              disabled={row.installment_status !== "PAID"}
            >
              view Receipt
            </Button>
          </Box>
        );
      },
    },
  ];

  if (loading) {
    return <ErrorHandling error500={false} loadData={loading} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        pb: 2,
        // minHeight: "100vh",
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
                  Booking Date : {dateFormator(data.booked_at)}
                </Typography>
                <Typography>
                  Batch Preference : {CapitalFirstLetterOnly(data.batch_prefer)}
                </Typography>
                <Typography>
                  Payment Pattern : {CapitalFirstLetterOnly(data.payment_term)}
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
                  view Details
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
              paginationModel={{ page: 0, pageSize: 10 }}
              height={450}
              checkboxSelection={false}
              errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1737008545/calendar_with_marks_uh7eeu.svg"
              errorHeading="No leaves applied yet. "
              errorDescription="Click 'Apply Leave' to get started."
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
    </Box>
  );
}

export default PaymentDetails;
