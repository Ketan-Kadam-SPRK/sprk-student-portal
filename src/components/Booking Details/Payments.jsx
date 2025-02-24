import { Box, Grid, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookingDetailsCard from "./child/BookingDetailsCard";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { getBookingDetails } from "./action/Payment.action";
import ErrorHandling from "../Common/ErrorHandling";
import { Image } from "cloudinary-react";

function Payments() {
  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [error500, setError500] = useState(false);

/**
 * Fetches booking details and updates state with the retrieved data.
 */

  const getBookingDetail = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getBookingDetails({ headers }));
      const data = res?.payload?.data?.data || [];
      const status = res?.payload.status;

      if (status === 500 || status === 503) {
        setError500(true);
      } else {
        setCourseData(data);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingDetail();
  }, []);

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
          <Typography variant="h4" sx={{ color: "#0A2647", fontWeight: 600 }}>
            Your Course Group Bookings {""}
          </Typography>
          <Image
            publicId="https://res.cloudinary.com/dxlzzgbfw/image/upload/v1739256894/payment-method-credit-card-svgrepo-com_2_1_bcecrt.svg"
            cloudName="dxlzzgbfw"
            style={{
              width: "auto",
              height: "40px",
              objectFit: "contain",
              marginLeft: "5px",
            }}
          />
        </Box>
        <Typography
          fontSize={"var(--font-size-medium)"}
          sx={{ color: "#4D535A" }}
        >
          Stay updated on your bookings and payment progress.
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          gap: "50px",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#6560F0",
            borderRadius: "10px 10px 0px 0px",
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
            Track Your Booking Details
          </Typography>
        </Box>
        <Box sx={{ p: "20px" }}>
          <Grid2 container spacing={2} sx={{ width: "100%", margin: 0 }}>
            {courseData?.map((item, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
                <BookingDetailsCard item={item} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
}

export default Payments;
