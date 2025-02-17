import { Box, Typography } from '@mui/material'
import React from 'react'

function NoDataAvailableUI() {
  return (
    <Box sx={{minHeight:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box>
            <Typography sx={{fontSize:'20px',fontWeight:600,color:'gray'}}>No Data Available</Typography>
        </Box>
    </Box>
  )
}

export default NoDataAvailableUI