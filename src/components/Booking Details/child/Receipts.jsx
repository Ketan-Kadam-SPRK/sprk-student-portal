import { Box, Button, Dialog, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import React, { use, useEffect, useState } from "react";
import CustomAgGrid from "../../Common/CustomAgGrid/CustomAgGrid";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import { AmountFormat } from "../../../Utils/AmountFormat";
import dateFormator from "../../../Utils/dateFormator";
import { formatForDisplay } from "../../../Utils/formateForDisplay";
import { LightTooltip } from "../../../Utils/LightToolTip";
import Receipt from "../modals/Receipt/Receipt";
import NoDataPage from "../../Common/NoDataPage";
import { getAllReceipts } from "../action/Payment.action";
import ErrorHandling from "../../Common/ErrorHandling";
import PopupFilterComponent from "../../Common/FilterMenuComponent/PopupFilterComponent";

function Receipts() {
  const navigate = useNavigate();
  const [openReciept, setOpenReciept] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [receiptId, setReceiptId] = useState(null);
  const { booking_uid } = useParams();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [error500, setError500] = useState(false);

  const handleGetAllReceipts = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getAllReceipts({ headers }));
      const data = res?.payload?.data?.data || [];
      const status = res?.payload.status;

      // Sort by date (assuming paid_at is a valid date string)
      const sortedData = data.sort(
        (a, b) => new Date(b.paid_at) - new Date(a.paid_at)
      );
      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        setData(sortedData);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching receipts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllReceipts();
  }, []);

  const handleDetailModal = () => {
    setOpenDetailModal(!openDetailModal);
  };

  const handleOpenPayment = (row) => {
    setOpenReciept(!openReciept);
    setReceiptId(row?.receipt_code);
  };

  const getMonthName = (dateString) => {
    if (!dateString) return ""; // Handle invalid or undefined date
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long" }); // Returns full month name (e.g., "January")
  };

  const getColorAndBackground = (installment_status) => {
    switch (installment_status) {
      case "ACTIVE":
        return { color: "#1F5200", backgroundColor: "#CBFFAC" };
      case "CANCELLED":
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
      headerName: "Receipt No",
      id: "receipt_code",
      minWidth: 150,
      filterable: false,
    },
    {
      headerName: "BCN No",
      id: "booked_code",
      minWidth: 150,
      filterable: false,
    },

    {
      headerName: "Course Group",
      id: "course_groups",
      minWidth: 200,
      filterable: false,
      format: (value) => {
        const displayValue = Array.isArray(value) ? value.join(", ") : value;

        return (
          <LightTooltip title={displayValue} arrow>
            <span
              style={{
                display: "block",
                maxWidth: "180px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {displayValue}
            </span>
          </LightTooltip>
        );
      },
    },

    {
      headerName: "Receipt Status",
      id: "receipt_status",
      minWidth: 150,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      format: (Receipt_Status, rowData) => (
        <StatusBadge status={Receipt_Status} />
      ),
    },
    {
      headerName: "Receipt Amount",
      id: "paid_amount",
      minWidth: 150,
      format: (value) => AmountFormat(value),
    },
    { headerName: "MOP", id: "payment_mode", minWidth: 120 },
    {
      headerName: "Paid On",
      id: "paid_at",
      minWidth: 120,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => dateFormator(value),
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
              onClick={() => handleOpenPayment(row)}
            >
              view Receipt
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="h4" fontWeight={600}>
            Your Receipt History
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
          Keep track of all your receipts in one place.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <PopupFilterComponent
          rowData={data}
          statusOptions={["CANCELLED", "ACTIVE"]}
          setFilterData={setFilterData}
          dateKey="paid_at"
          statusKey="receipt_status"
          tabName="Receipts"
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
        open={openReciept}
        onClose={() => handleOpenPayment(null)}
        maxWidth="md"
        fullWidth={true}
      >
        <Receipt handleClosePayment={handleOpenPayment} receiptID={receiptId} />
      </Dialog>
    </Box>
  );
}

export default Receipts;
