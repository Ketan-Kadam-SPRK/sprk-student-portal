import { Typography, Box } from "@mui/material";
import React from "react";
import StatusStyledComponent from "../../Common/StatusStyledComponent/StatusStyledComponent";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import dateFormator from "../../../Utils/dateFormator";
import CircularProgressWithLabel from "../../Common/CircularProgressWithLable";
import { CapitalFirstLetterOnly } from "../../../Utils/CapitalFirstLetterOnly";
import { AmountFormat } from "../../../Utils/AmountFormat";

function BookingDetailsCard({ item, index }) {
  const navigate = useNavigate();

  // Function to get the color and background color based on the payment status
  const getStatusColor = (status) => {
    let color = "";
    let backgroundColor = "";
    switch (status) {
      case "PAID":
        color = "#1F5200";
        backgroundColor = "#CBFFAC";
        break;
      case "PENDING":
        color = "#755200";
        backgroundColor = "#FFF3A4";
        break;
      case "DUE":
        color = "#52007A";
        backgroundColor = "#E4AEFF";
        break;
      case "OVERDUE":
        color = "#9F0000";
        backgroundColor = "#FFB5B5";
        break;
      case "EXPIRED":
        color = "#3D3D3D";
        backgroundColor = "#D1D1D1";
        break;
      case "CANCELLED":
        color = "#A30000";
        backgroundColor = "#FFC0C0";
        break;
      default:
        color = "black";
        backgroundColor = "white";
        break;
    }
    return { color, backgroundColor };
  };

  const { color, backgroundColor } = getStatusColor(item?.payment_status);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: "200px",
        display: "flex",
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
          p: 2,
          background: "linear-gradient(270deg, #6560F0 0.13%, #0A2647 91.8%)",
          borderRadius: "10px",
          alignItems: "flex-start",
          height: "120px",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "var(--font-size-medium)",
            textTransform: "capitalize",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {item?.booking_uid || ""}
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              color: "white",
              fontSize: "var(--font-size-small)",
              textOverflow: "ellipsis",
              wordBreak: "normal",
              whiteSpace: "nowrap",
              width: "100%",
              overflow: "hidden",
              cursor: "pointer",
            }}
            title={item?.cg_names?.join(" | ") || ""}
          >
            {item?.cg_names?.join(" | ") || ""}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "white",
            fontSize: "var(--font-size-small)",
            textTransform: "capitalize",
            maxWidth: "100%",
          }}
        >
          Booking Date : {dateFormator(item?.booking_date)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            Total Installments : {item?.total_installments}
          </Typography>
          <Box>
            <CircularProgressWithLabel
              value={item?.paid_installments}
              totalValue={item?.total_installments}
              progress={`${item?.paid_installments}/${item?.total_installments}`}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#393939",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-small) !important",
              fontWeight: 600,
            }}
          >
            Paid Amount :
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            {AmountFormat(item?.paid_amt)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#393939",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-small) !important",
              fontWeight: 600,
            }}
          >
            Balance Amount :
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            {AmountFormat(item?.balance_amt)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#393939",
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-small) !important",
              fontWeight: 600,
            }}
          >
            Payment Pattern :
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            {CapitalFirstLetterOnly(item?.payment_type)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            color: "#393939",
            my: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "var(--font-size-small) !important",
              fontWeight: 600,
            }}
          >
            Payment Status :
          </Typography>
          <StatusStyledComponent
            value={item?.payment_status}
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
            pt: 1,
          }}
        >
          <Typography
            onClick={() => {
              navigate(`/Bookings/${item?.booking_uid}`);
            }}
            color="primary"
            fontSize={"var(--font-size-small)"}
            fontWeight={"bold"}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
            data-testid={`view-btn-${index + 1}`}
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
