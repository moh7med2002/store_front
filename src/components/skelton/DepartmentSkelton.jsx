import React from 'react'
import {Skeleton , Box} from '@mui/material';


export default function DepartmentSkelton() {
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Skeleton variant='circular'
        sx={{width:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"},height:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"}}}
        />
        <Skeleton variant="rectangular" sx={{marginTop:"8px"}} width={210} height={60} />
    </Box>
  )
}
