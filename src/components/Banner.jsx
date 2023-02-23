import { Box, Typography,styled } from '@mui/material'
import React from 'react'
import cover from '../images/banner.jpg'

const Wrapper = styled(Box)({
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    color:"white",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    padding:"6px"
})

const Span = styled("span")({color:"#ff5252"})

export default function Banner() {
    return (
        <Wrapper sx={{backgroundImage:`url(${cover})`,height:"30vh"}}>
            <Typography sx={{marginBottom:"8px",fontSize:"18px"}}>Repair Services</Typography>
            <Typography sx={{fontSize:{lg:"38px",md:"32px",xs:"26px"},fontWeight:"600"}}>Up to <Span>70% Off </Span>- All t-Shirts Accessiors</Typography>
        </Wrapper>
    )
}