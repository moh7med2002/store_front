import { Box,styled } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
const Image = styled('img')({
    borderRadius:"50%"
})

const LinkReact = styled(Link)({display:"block",width:"100%"})

export default function Department({item}) {
    return (
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Image sx={{width:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"},height:{xl:"250px",lg:"220px",md:"180px",sm:"250px",xs:"140px"}}} 
            src={`${process.env.REACT_APP_API}images/${item.image}`}
            alt={item.title}/>
            <LinkReact to={`/department/${item.title}/${item._id}`}>
                <Box sx={{backgroundColor:"#f8f5f8",textTransform:"uppercase",textAlign:"center",padding:"10px",marginTop:"8px",
                transition:".3s",":hover":{backgroundColor:"#ff5252",color:"white"}}}>{item.title}</Box>
            </LinkReact>
        </Box>
    )
}
