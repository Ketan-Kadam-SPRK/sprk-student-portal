import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookingDetailsCard from "./child/BookingDetailsCard";
import { useDispatch } from "react-redux";
import { useAuthHeaders } from "../../Hooks/useAuthHeaders";
import { getBookingDetails } from "./action/Payment.action";
import ErrorHandling from "../Common/ErrorHandling";

function Payments() {

  const dispatch = useDispatch();
  const headers = useAuthHeaders();
  const [loading, setLoading] = useState(false);
  const [courseData,setCourseData]=useState([])
    const getBookingDetail = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getBookingDetails({ headers }));
        const data = res?.payload?.data?.data || [];
        console.log(data)
        setCourseData(data)
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getBookingDetail();
    }, []);
  
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
