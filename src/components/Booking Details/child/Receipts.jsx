import { Box, Button, Dialog, Typography } from "@mui/material";
import { Image } from "cloudinary-react";
import React, { useState } from "react";
import CustomAgGrid from "../../Common/CustomAgGrid/CustomAgGrid";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../Hooks/useAuthHeaders";
import { AmountFormat } from "../../../Utils/AmountFormat";
import dateFormator from "../../../Utils/dateFormator";
import { formatForDisplay } from "../../../Utils/formateForDisplay";
import { LightTooltip } from "../../../Utils/LightToolTip";
import Receipt from "../modals/Receipt/Receipt";

function Receipts() {
  const navigate = useNavigate();
  const [openReciept, setOpenReciept] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [receiptId, setReceiptId] = useState(null);
  const { booking_uid } = useParams();
  //   const [data, setData] = useState([]);

  const data = [
    {
      Receipt_No: "R2502126A3",
      BCN_NO: "B2502KHARCB9AD8",
      Course_Group: "Full Stack in Java",
      Receipt_Status: "Active",
      Receipt_Amount: 50000,
      Mode_of_Payment: "UPI",
      Paid_On: "2025-01-07T00:00:00Z",
    },
    {
      Receipt_No: "R2502126A4",
      BCN_NO: "B2502KHARCB9AE9",
      Course_Group: "Data Science with Python",
      Receipt_Status: "Active",
      Receipt_Amount: 60000,
      Mode_of_Payment: "Credit Card",
      Paid_On: "2025-01-08T00:00:00Z",
    },
    {
      Receipt_No: "R2502126A5",
      BCN_NO: "B2502KHARCB9AF0",
      Course_Group: "MERN Stack Development",
      Receipt_Status: "Cancelled",
      Receipt_Amount: 55000,
      Mode_of_Payment: "Net Banking",
      Paid_On: "2025-01-09T00:00:00Z",
    },
    {
      Receipt_No: "R2502126A6",
      BCN_NO: "B2502KHARCB9AG1",
      Course_Group: "Web Designing Track (HTML, CSS3, Bootstrap, Javascript)",
      Receipt_Status: "Active",
      Receipt_Amount: 45000,
      Mode_of_Payment: "Debit Card",
      Paid_On: "2025-01-10T00:00:00Z",
    },
  ];

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
      case "Active":
        return { color: "#1F5200", backgroundColor: "#CBFFAC" };
      case "Cancelled":
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
      id: "Receipt_No",
      minWidth: 150,
      filterable: false,
    },
    {
      headerName: "BCN No",
      id: "BCN_NO",
      minWidth: 150,
      filterable: false,
    },

    {
      headerName: "Course Group",
      id: "Course_Group",
      minWidth: 200,
      filterable: false,
      format: (value) => (
        <LightTooltip title={value} arrow>
          <span
            style={{
              display: "block",
              maxWidth: "180px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value}
          </span>
        </LightTooltip>
      ),
    },
    {
      headerName: "Receipt Status",
      id: "Receipt_Status",
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
      id: "Receipt_Amount",
      minWidth: 150,
      format: (value) => AmountFormat(value),
    },
    { headerName: "MOP", id: "Mode_of_Payment", minWidth: 120 },
    {
      headerName: "Paid On",
      id: "Paid_On",
      minWidth: 120,
      style: { color: "#0074BD", fontWeight: 600 },
      format: (value) => dateFormator(value, 1),
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
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739512431/receipt_slip_b5rwn8.svg"
            cloudName="dxlzzgbfw"
            style={{
              width: "30px",
              height: "auto",
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
      <Box>
        <CustomAgGrid
          rows={data}
          columns={columns}
          noDatalength={data}
          paginationModel={{ page: 0, pageSize: 10 }}
          height={450}
          checkboxSelection={false}
          errorImgPublicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739358129/OBJECTS_1_vfdewq_qsbbyy.svg"
          errorHeading="No payments left!"
          errorDescription="Looks like you've already cleared all your payments. Enjoy your course!"
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
