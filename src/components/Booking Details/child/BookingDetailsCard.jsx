import { Typography, Box, Button } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import dateFormator from "../../../Utils/dateFormator";
import CircularProgressWithLabel from "../../Common/CircularProgressWithLable";

function BookingDetailsCard({ item }) {
  const navigate = useNavigate();

  console.log(item);
  const getStatusColor = (status) => {
    let color = "";
    let backgroundColor = "";
    switch (status) {
      case "Paid":
        color = "#1F5200";
        backgroundColor = "#CBFFAC";
        break;
      case "Pending":
        color = "#755200";
        backgroundColor = "#FFF3A4";
        break;
      case "Due":
        color = "#52007A";
        backgroundColor = "#E4AEFF";
        break;
      case "Overdue":
        color = "#9F0000";
        backgroundColor = "#FFB5B5";
        break;
      default:
        color = "black";
        backgroundColor = "white";
        break;
    }
    return { color, backgroundColor };
  };

  const { color, backgroundColor } = getStatusColor(item?.PaymentStatus);

  return (
    <Box
      sx={{
        minWidth:{lg:"350px",md:"350px",sm:"250px",xs:"200px"},
        display: "flex",
        flex: 1,
        flexBasis: "auto",
        flexDirection: "column",
        gap: "20px",
        borderRadius: "10px",
        p: 2,
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          p: 2,
          background: "linear-gradient(270deg, #6560F0 0.13%, #0A2647 91.8%)",
          borderRadius: "10px 10px 0px 0px",
          alignItems: "flex-start",
          height: "140px",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "var(--font-size-medium)",
            textTransform: "capitalize",
            width: "200px",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {item?.bcn_no || ""}
        </Typography>
        <Typography
          sx={{
            color: "white",
            // fontWeight: "bold",
            fontSize: "var(--font-size-small)",
            textTransform: "capitalize",
            // width: "200px",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {item?.courses?.join(" | ") || ""}
        </Typography>
        <Typography
          sx={{
            color: "white",
            // fontWeight: "bold",
            fontSize: "var(--font-size-small)",
            textTransform: "capitalize",
            // width: "200px",
            maxWidth: "100%",
          }}
        >
          Booking Date : {dateFormator(item?.booking_date)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-small)",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "5px",
              color: "#1976D2",
            }}
          >
            Total Installments : {item?.NumberOfInstallments}
          </Typography>
          <Box>
          <CircularProgressWithLabel
              value={item.numberOfInstallmentPaid}
              totalValue={item.NumberOfInstallments}
              progress={`${item.numberOfInstallmentPaid}/${item.NumberOfInstallments}`}
            />
          </Box>
        </Box>
        <Typography sx={{ fontSize: "var(--font-size-small)" }}>
          Paid Amount: {item?.PaidAmount}
        </Typography>
        <Typography>Balance Amount: {item?.BalanceAmount}</Typography>
        <Typography>Payment Pattern : {item?.PaymentPattern}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px",flexWrap:"wrap" }}>
          <Typography>Payment Status :</Typography>
          <StatusStyledComponent
            value={item?.PaymentStatus}
            color={color}
            backgroundColor={backgroundColor}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Typography
            onClick={() => {
              navigate(`/Payments/${item?.bcn_no}`);
            }}
            color="primary"
            fontSize={"var(--font-size-extra-small)"}
            fontWeight={"bold"}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            View Booking Details{" "}
            <ArrowForwardIosRoundedIcon color="primary" fontSize="inherit" />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default BookingDetailsCard;
