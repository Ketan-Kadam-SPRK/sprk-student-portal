import React, { useRef, useState, forwardRef, useEffect } from "react";
import { Button, Typography, Box, Grid, CircularProgress } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { ToWords } from "to-words";
import "./receipt.css";
import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../../../Hooks/useAuthHeaders";

const text1 = {
  fontSize: "12px",
  fontWeight: "600",
  marginRight: "5px",
};
const text2 = {
  fontSize: "12px",
  marginRight: "5px",
};

const Receipt = forwardRef(({ handleClosePayment, getPayData }, ref) => {
  // Get receipt data from the Redux store

  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const receiptData = {
    receipt_id: 1791,
    receipt_code: "R2501218144D46",
    booked_code: "B2501KHAR5D5C18A",
    student_name: "Namdev Pise",
    student_address: "859, Solapur, Maharashtra, 851458, India",
    receipt_status: "ACTIVE",
    paid_amount: 8300,
    payment_mode: "CREDIT_CARD",
    transaction_id: null,
    cheque_number: null,
    authorization_code: "4444555648",
    paid_at: "2025-01-21T00:00:00Z",
  };
  
  console.log(receiptData);
  
  // Initialize loading state
  const [isLoading, setIsLoading] = useState(false);

  // Create a reference to the component for printing
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef, // Pass the ref directly to contentRef
    documentTitle:`payment_Receipt_${receiptData?.receipt_code || "N/A"}`
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault(); // Prevent the default browser print dialog
        handlePrint(); // Trigger the print function from useReactToPrint
        // handlePrintReceipt();
      }
    };

    // Add an event listener to the document to listen for Ctrl + P
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrint]);

  const toWords = new ToWords();

  const mode = receiptData?.payment_mode || null;

  const paidAmount = Math.abs(receiptData?.paid_amount || 0);

  // Format the paid amount with two decimal places and Indian numbering system
  const formattedPaidAmount = parseFloat(paidAmount).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  // Check if the paid amount has decimal values
  const hasDecimals = parseFloat(paidAmount) !== parseInt(paidAmount);
  // Convert the paid amount to words (Rupees and Paise)
  var paidAmountToWords = toWords.convert(paidAmount) + " Rupees";
  if (hasDecimals)
    paidAmountToWords =
      paidAmountToWords +
      " & " +
      toWords.convert(Number(String(paidAmount).split(".")[1])) +
      " Paise";

  //   const handlePrintReceipt = async () => {
  //     setIsLoading(true);
  //     try {
  //       const receiptId = receiptData?.receipt_id;
  //       await dispatch(printReceipt({ receiptId, headers }));
  //       getPayData();
  //     } finally {
  //       setTimeout(() => {
  //         handleCloseRecipt();
  //       }, 1000);
  //     }
  //   };

  return (
    <Box>
      <Box
        className="print-button"
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "flex-end",
          position: "sticky",
          top: "0px",
          right: "0px",
          backgroundColor: "#263238",
          width: "100%",
          zIndex: 101,
        }}
      >
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={() => {
            handlePrint();
          }}
          sx={{
            px: 3,
            color: "white",
            // backgroundColor:'#414D54'
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Print"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            handleClosePayment();
          }}
          sx={{
            px: 3,
            ml: 2,
            fontWeight: "600",
            backgroundColor: "white",
          }}
        >
          Cancel
        </Button>
      </Box>

      <Box sx={{ width: "900px", overflow: "auto" }}>
        <Box
          sx={{
            px: 4,
            backgroundColor: "white",
            height: "100%",
            overFlow: "scroll",
          }}
          ref={printRef}
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              py: 2,
            }}
          >
            <Box>
              {/* Display the company logo */}
              <Image
                style={{ width: "180px" }}
                publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1690809251/sprk-logoRR_isa0xp.svg"
                cloudName="dxlzzgbfw"
              />
            </Box>
            <Box sx={{ px: 2 }}>
              <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
                {/* Display the company's office address and contact information */}
                Office Address : SPRK Technologies, Office no: 102-105, 1st
                floor, Royal Palace, Sector-2, Plot no.11, Opp. Glomax Mall,
                Kharghar, Navi Mumbai, Maharashtra, India. Telephone -
                9082572832
              </Typography>
            </Box>
          </Box>

          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 2,
                borderBottom: "1px solid black",
                borderTop: "1px solid black",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "15%" }}> </Box>
              <Box>
                <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                  Receipt
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center ",
                }}
              >
                <Typography style={text1}>Receipt Print</Typography>
                <Typography style={text1}>
                  Date:
                  {(() => {
                    // Generate the current date in a specific format
                    const dateObj = new Date();
                    const day = dateObj.getDate().toString().padStart(2, "0");
                    const month = dateObj.toLocaleString("default", {
                      month: "short",
                    });
                    const year = dateObj.getFullYear();
                    return ` ${day}/${month}/${year}`;
                  })()}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ position: "relative" }}>
              {receiptData?.receipt_status === "CANCELLED" && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "40%",
                    right: "50%",
                    transform: "translate(50%, -50%)",
                  }}
                >
                  {/* Display a cancellation icon */}
                  <Image
                    publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1694152217/Group_770_hmm5te.svg"
                    cloudName="dxlzzgbfw"
                  />
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography style={text1}>Receipt No:</Typography>
                  <Typography> </Typography>

                  <Typography style={text2}>
                    {receiptData?.receipt_code}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography style={text1}>Currency: </Typography>
                  <Typography style={text2}>INR</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography style={text1}>Date: </Typography>
                  <Typography style={text2}>
                    {(() => {
                      // Generate the receipt date in a specific format
                      const dateObj = new Date(receiptData?.paid_at);
                      const day = dateObj.getDate().toString().padStart(2, "0");
                      const month = dateObj.toLocaleString("default", {
                        month: "short",
                      });
                      const year = dateObj.getFullYear();
                      return ` ${day}/${month}/${year}`;
                    })()}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography style={text1}>Name: </Typography>
                  <Typography style={text2}>
                    {receiptData?.student_name}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography style={text1}>Address: </Typography>
                  <Typography style={text2}>
                    {receiptData?.student_address}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mt: 1 }}>
                  <Typography style={text1}>Cash Amount: </Typography>
                  <Typography style={text2}>
                    {mode === "CASH" ? "Rs. " + formattedPaidAmount : "N/A"}
                  </Typography>
                </Box>
              </Box>
              <Grid container rowSpacing={1} sx={{ mt: "2px" }}>
                <Grid item xs={6} md={6}>
                  <Box sx={{ display: "flex" }}>
                    <Typography style={text1}>
                      Credit/Debit Card Amount:{" "}
                    </Typography>
                    <Typography style={text2}>
                      {mode === "DEBIT_CARD" || mode === "CREDIT_CARD"
                        ? "Rs." + formattedPaidAmount
                        : "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box sx={{ display: "flex" }}>
                    <Typography style={text1}>Authorization No:</Typography>
                    <Typography style={text2}>
                      {" "}
                      {receiptData?.authorization_code || "N/A"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} md={6} lg={6}>
                  <Box sx={{ display: "flex" }}>
                    <Typography style={text1}>Cheque/Draft Amount: </Typography>
                    <Typography style={text2}>
                      {mode === "CHEQUE" ? "Rs." + formattedPaidAmount : "N/A"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} md={6} lg={6}>
                  <Box sx={{ display: "flex" }}>
                    <Typography style={text1}>Cheque/Draft No: </Typography>
                    <Typography style={text2}>
                      {" "}
                      {receiptData?.cheque_number || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box sx={{ display: "flex" }}>
                    <Typography style={text1}>Online Payment: </Typography>
                    <Typography style={text2}>
                      {mode === "UPI" || mode === "NET_BANKING"
                        ? "Rs." + formattedPaidAmount
                        : "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box sx={{ display: "flex" }}>
                    <Typography style={text1}>
                      Online Payment Refer No:{" "}
                    </Typography>
                    <Typography style={text2}>
                      {" "}
                      {receiptData?.transaction_id || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", mt: 1 }}>
                <Typography style={text1}>Received Sum of INR </Typography>
                <Typography style={text2}>
                  {" "}
                  {paidAmountToWords || "N/A"}
                </Typography>
                <Typography style={text2}> Only.</Typography>
              </Box>
              <Box sx={{ display: "flex", mt: 1 }}>
                <Typography style={text1}>BCN : </Typography>
                <Typography style={text2}>
                  {" "}
                  {receiptData?.booked_code || " "}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                  mb: 12,
                }}
              >
                <Typography style={text1}>M/S. SPRK TECHNOLOGIES </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography style={text1}>AUTHORISED SIGNATORY </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItem: "center",
                  borderBottom: "1px solid black",
                  pb: 2,
                }}
              >
                <Box>
                  <Typography style={text2}>
                    {" "}
                    *CHEQUES ARE SUBJECT TO REALIZATION.
                  </Typography>

                  <Typography style={text2}>
                    {" "}
                    THIS RECEIPT MUST BE PRODUCED WHEN REQUESTED{" "}
                  </Typography>
                  <Typography style={text2}>
                    FEES ONCE PAID ARE NON-REFUNDABLE
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default Receipt;
