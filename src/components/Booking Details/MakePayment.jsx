import React from "react";
import axios from "axios";

const MakePayment = () => {
  const handlePay = async () => {
    try {
      // Step 1: Create order from backend
      const res = await axios.post(
        "https://v0z3k36t-8080.inc1.devtunnels.ms/api/payments/pay/IST2509151052129d"
      );
      const order = res.data; // This is the JSON you pasted

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
            // This runs after successful payment
            console.log("Payment Success:", response);

            // Step 3: Send payment details to backend for verification
            axios
              .post(
                "https://v0z3k36t-8080.inc1.devtunnels.ms/api/payments/verify",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }
              )
              .then((verifyRes) => {
                alert("Payment Verified Successfully!");
                console.log("Verification:", verifyRes.data);
              })
              .catch((err) => {
                alert("Payment Verification Failed!");
                console.error(err);
              });
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handlePay}>Pay Now</button>;
};

export default MakePayment;
