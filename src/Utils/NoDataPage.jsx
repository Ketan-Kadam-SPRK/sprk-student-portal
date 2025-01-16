import { Box, Typography } from '@mui/material'
import { Image } from 'cloudinary-react'
import React from 'react'

function NoDataPage({
    errorImgPublicId,
    errorHeading,
    errorDescription
}) {
  return (
    <Box
    sx={{
        backgroundColor: "white",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        p:2
      }}
      >
    <Box
    sx={{
      backgroundColor: "#E6E5FF",
      width: "100%",
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      padding: 2,
    }}
  >
    <Box sx={{ mt: 2 }}>
      <Image
        publicId={errorImgPublicId}
        cloudName="dxlzzgbfw"
        style={{ width: "212px", height: "212px" }}
      />
    </Box>
    <Typography
      sx={{
        fontSize: "24px",
        color: "#3E2347",
        fontWeight: "bold",
      }}
    >
    {errorHeading} 
    </Typography>
    <Typography
      sx={{
        fontSize: "20px",
        color: "#775383",
        textAlign: "center",
      }}
    >
   {errorDescription}
    </Typography>
  </Box>
  </Box>
  )
}

export default NoDataPage