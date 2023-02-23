import React from 'react'
import {Container,Grid,styled,Box,Typography} from '@mui/material'
import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpg'
import image3 from '../images/image3.jpg'

const BoxWrapper = styled(Box)({
    height:"300px",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    position:"relative",
})

export default function Sales() {
    const sales = [
        {
            image:image1,
            title:"SEASONAL SALE",
            content:"Spring/Summer 2022"
        },
        {
            image:image2,
            title:"SEASONAL SALE",
            content:"Spring/Summer 2022"
        },
        {
            image:image3,
            title:"SEASONAL SALE",
            content:"Spring/Summer 2022"
        }
    ]
    return (
        <Container sx={{marginTop:"10px",marginBottom:"50px"}}>
            <Grid container spacing={2}>
                {
                    sales.map((item,index)=>
                    {
                        return(
                            <Grid item key={index+'jk1'} xs={12} sm={6} md={4} sx={{margin:"auto"}}>
                                <BoxWrapper className='overlay' sx={{backgroundImage:`url(${item.image})`}}>
                                    <Box sx={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",paddingX:"18px",position:"relative",zIndex:"20"}}>
                                        <Typography sx={{color:"white",fontSize:"24px",fontWeight:"600"}}>{item.title}</Typography>
                                        <Typography color={"primary"}>{item.content}</Typography>
                                    </Box>
                                </BoxWrapper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}