import React, { useState } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { useDispatch } from "react-redux";
import {
  cancelOnlinePayment,
  CreateOrderFromBackend,
} from "./action/Payment.action";

const MakePayment = ({ row, disabled, getBookingInstallmentDetails }) => {
  const [loading, setLoading] = useState(false);
  const headers = useAuthHeaders();
  const dispatch = useDispatch();

  // 🔹 Function to call dismiss API
  const handleDismiss = async (installmentId, orderId) => {
    try {
      await dispatch(cancelOnlinePayment({ headers, installmentId, orderId }));
      // console.log("Dismiss API called successfully");
    } catch (error) {
      console.error("Dismiss API failed:", error);
    } finally {
      getBookingInstallmentDetails(); // ✅ Refresh after dismiss
    }
  };

  const handlePay = async () => {
    setLoading(true);
    try {
      // Step 1: Create order from backend
      const res = await dispatch(
        CreateOrderFromBackend({ headers, id: row?.installment_id })
      );

      const order = JSON.parse(res?.payload?.data);

      // Step 2: Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: "rzp_test_RBUYUcRfQUh5Aw",
          amount: order.amount,
          currency: order.currency,
          name: "SPRK Technologies",
          description: "Course Payment",
          order_id: order.id,
          handler: function (response) {
            getBookingInstallmentDetails();
          },
          theme: {
            color: "#3399cc",
          },
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: false,
            paylater: false,
            emi: false,
          },
          upi: {
            flow: "intent", // disables QR
          },
          modal: {
            ondismiss: function () {
              handleDismiss(row?.installment_id, order?.id); // ✅ Call dismiss API
            },
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
      onClick={handlePay}
      disabled={disabled || loading}
    >
      {loading ? <CircularProgress size={16} sx={{ color: "white" }} /> : "Pay"}
    </Button>
  );
};

export default MakePayment;
