import { Box  , Skeleton} from '@mui/material'
import React from 'react'

export default function ProductSkelton() {
  return (
    <Box sx={{textAlign:"center"}}>
        <Skeleton  variant="rectangular" sx={{width:"100%"  , height:"220px"}}/>
        <Skeleton variant="text" sx={{ fontSize: '13px' , marginTop:"10px"}}/>
        <Skeleton variant="text" sx={{ fontSize: '15px' , marginTop:"12px", width:"100px"}}/>
    </Box>
  )
}
