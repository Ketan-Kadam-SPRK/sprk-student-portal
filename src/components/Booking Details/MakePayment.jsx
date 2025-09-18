import React, { useState } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";

const MakePayment = ({ row, disabled, getBookingInstallmentDetails }) => {

  const [loading, setLoading] = useState(false);
  const headers = useAuthHeaders();
  const handlePay = async () => {
    setLoading(true);
    try {
      // Step 1: Create order from backend
      const res = await axios.post(
        `https://jnvjzs5t-8888.inc1.devtunnels.ms/api/student-portal/pay/${row?.installment_id}`,
        {},
        { headers }
      );
      const order = JSON.parse(res.data.data); // This is the JSON you pasted

      // Step 2: Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_test_RBUYUcRfQUh5Aw", // Replace with your Razorpay Key ID
          amount: order.amount, // Amount in paise
          currency: order.currency,
          name: "SPRK Technologies",
          description: "Course Payment",
          order_id: order.id, // <-- This is important
          handler: function (response) {
            console.log("Payment successful:", response);
            getBookingInstallmentDetails();
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        setLoading(false);
      };
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Button
      sx={{
        textWrap: "nowrap",
        minWidth: { xs: 90, sm: 100 },
        height: { xs: 32, sm: 32 },
      }}
      size="small"
      variant="contained"
      // color="success"
      onClick={handlePay}
      disabled={disabled || loading}
    >
      {loading ? <CircularProgress size={16} sx={{ color: "white" }} /> : "Pay"}
    </Button>
  );
};

export default MakePayment;
