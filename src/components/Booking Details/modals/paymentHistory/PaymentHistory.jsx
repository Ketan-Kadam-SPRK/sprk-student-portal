import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import StatusStyledComponent from "../../../Common/StatusStyledComponent/StatusStyledComponent";
import { Close } from "@mui/icons-material";

const formateDateTime = (date) => {
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
function PaymentHistory({ history = [], handleClose = () => {} }) {
  const newHistory = [
    {
      created_at: "2025-10-06T06:58:11.388860Z",
      payment_method: null,
      transaction_id: null,
      status: "EXPIRED",
    },
    {
      created_at: "2025-10-06T07:02:45.808653Z",
      payment_method: "DEBIT_CARD",
      transaction_id: null,
      status: "FAILED",
    },
    {
      created_at: "2025-10-06T07:07:53.769021Z",
      payment_method: "UPI",
      transaction_id: "527912686867",
      status: "SUCCESS",
    },
  ];

  const getColorAndBackground = (installment_status) => {
    switch (installment_status) {
      case "EXPIRED":
        return { color: "white", backgroundColor: "grey" };
      case "CANCELLED":
        return { color: "white", backgroundColor: "grey" };
      case "SUCCESS":
        return { color: "#1F5200", backgroundColor: "#CBFFAC" };

      case "FAILED":
        return { color: "#9F0000", backgroundColor: "#FFB5B5" };

      default:
        return { color: "", backgroundColor: "" };
    }
  };

  const data = history.length > 0 ? history : newHistory;

  const headingStyle = {
    color: "white",
    backgroundColor: "var(--primary-color)",
    minWidth: "150px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        backgroundColor: "#f5f5f5",
        position: "relative",
      }}
    >
      <Typography variant="h6" textAlign={"center"}>
        Payment Attempt History
      </Typography>
      <IconButton
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
        onClick={() => {
          handleClose();
        }}
      >
        <Close />
      </IconButton>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400, // height of the scrollable area
          overflowY: "auto",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey", textAlign: "center" }}>
              <TableCell sx={{ ...headingStyle }}>Date</TableCell>
              <TableCell sx={{ ...headingStyle }}>Mode of Payment</TableCell>
              <TableCell sx={{ ...headingStyle }}>Transaction ID</TableCell>
              <TableCell sx={{ ...headingStyle, textAlign: "center" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  {formateDateTime(row.created_at) || "N/A"}
                </TableCell>
                <TableCell>
                  {row?.payment_method?.replace("_", " ") || "N/A"}
                </TableCell>
                <TableCell>{row?.transaction_id || "N/A"}</TableCell>
                <TableCell>
                  <StatusStyledComponent
                    value={row?.status || ""}
                    color={getColorAndBackground(row.status).color}
                    backgroundColor={
                      getColorAndBackground(row.status).backgroundColor
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PaymentHistory;
