import React from 'react'
import {Box,Typography,Rating} from '@mui/material'
import moment from 'moment'

export default function Review({review}) {
    return (
        <Box sx={{backgroundColor:"#f8f9fb",borderRadius:"4px",padding:"16px 10px"}}>
            <Typography sx={{fontWeight:"500",fontSize:"15px",marginBottom:"6px"}}>{review.userId.name}</Typography>
            <Rating name="read-only" value={review.rating} readOnly size="small"/>
            <Typography sx={{fontSize:"13px",marginTop:"4px",marginBottom:"6px"}}>{moment(review.date).format("MMM Do YY")}</Typography>
            <Box sx={{backgroundColor:'#c1f1fd',padding:"8px 12px",borderRadius:"4px",fontSize:"13px",color:"black"}}>
                {review.comment}
            </Box>
        </Box>
    )
}