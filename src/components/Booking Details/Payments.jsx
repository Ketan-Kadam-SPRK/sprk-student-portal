import { Box, Button, Typography } from "@mui/material";
import React from "react";
import BookingDetailsCard from "./child/BookingDetailsCard";

function Payments() {
    const courseData = [
        {
          bcn_no: "BCN10180540",
          courses: ["figma", "website development track"],
          booking_date: "01/12/2024",
          NumberOfInstallments: 12,
          numberOfInstallmentPaid: 3,
          PaidAmount: 50000,
          BalanceAmount: 5000,
          PaymentPattern: "installment",
          PaymentStatus: "Due",
        },
        {
          bcn_no: "BCN10180541",
          courses: ["graphic design", "UI/UX basics"],
          booking_date: "02/01/2024",
          NumberOfInstallments: 10,
          numberOfInstallmentPaid: 2,
          PaidAmount: 20000,
          BalanceAmount: 8000,
          PaymentPattern: "installment",
          PaymentStatus: "Pending",
        },
        {
          bcn_no: "BCN10180542",
          courses: ["python programming", "data analysis"],
          booking_date: "01/15/2024",
          NumberOfInstallments: 8,
          numberOfInstallmentPaid: 4,
          PaidAmount: 40000,
          BalanceAmount: 10000,
          PaymentPattern: "installment",
          PaymentStatus: "Paid",
        },
        {
          bcn_no: "BCN10180543",
          courses: ["mobile app development", "flutter basics"],
          booking_date: "01/20/2024",
          NumberOfInstallments: 6,
          numberOfInstallmentPaid: 3,
          PaidAmount: 30000,
          BalanceAmount: 15000,
          PaymentPattern: "installment",
          PaymentStatus: "Pending",
        },
        {
          bcn_no: "BCN10180544",
          courses: ["react", "next.js"],
          booking_date: "02/25/2024",
          NumberOfInstallments: 5,
          numberOfInstallmentPaid: 1,
          PaidAmount: 10000,
          BalanceAmount: 40000,
          PaymentPattern: "installment",
          PaymentStatus: "Pending",
        },
      ];
      
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        // minHeight: "100vh",
        overflow: "auto",
        flex: 1,
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ color: "#0A2647", fontWeight: 600 }}>
          Your Course Group Bookings
        </Typography>
        <Typography sx={{ color: "#4D535A" }}>
          Stay updated on your bookings and payment progress.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "white",
          p: 2,
          borderRadius: "10px",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2,flexWrap:"wrap" }}>
        {courseData?.map((item, index) => (
            <BookingDetailsCard
            key={index}
            item={item}
            />
        ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Payments;
