import { Box,Button,styled, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Image = styled("img")({
    width:"100%",
    height:"220px",
})

export default function Product({item}) {
    return (
        <Box sx={{textAlign:"center"}}>
            <Image alt={item} 
            src={`${process.env.REACT_APP_API}images/${item.image}`}/>
            <Typography sx={{fontSize:"13px",fontWeight:"400",marginTop:"10px",height:"32px"}}>{item.title.length>40?`${item.title.slice(0,37)}...`:item.title}</Typography>
            <Typography sx={{fontSize:"15px",fontWeight:"600",marginTop:"12px"}}>${item.price}</Typography>
            <Link to={`/product/${item._id}`}>
                <Button fullWidth variant="outlined" sx={{marginTop:"10px"}}>View</Button>
            </Link>
        </Box>
    )
}
