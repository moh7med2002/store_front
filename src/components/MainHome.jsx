import { Box ,Button,styled, Typography} from '@mui/material'
import React from 'react'
import slide1 from '../images/slider1.jpeg'
import slide2 from '../images/slider2.jpeg'
import slide3 from '../images/slider3.jpeg'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Wrapper = styled(Box)({
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
})

const BoxText = styled(Box)({
    backgroundColor:"#00000061",
    width:"fit-content",
    position:"absolute",
    bottom:"30%",
    left:"10%",
    padding:"10px",
    color:"white",
    zIndex:3
});

const OverLay = styled('div')({
    position:"absolute",
    left:"0",
    top:"0",
    width:"100%",
    height:"100%",
    backgroundColor:"#00000080",
    zIndex:2
})

export default function MainHome() {
    const slides = [
        {
            image:slide1,
            title:"Come and Get it!",
        },
        {
            image:slide2,
            title:"Fit Your Wardrobe",
        },
        {
            image:slide3,
            title:"Come and Get it!",
        }
    ]
    return (
        <Box>
            <Swiper navigation={true} modules={[Navigation]}  className="mySwiper" loop={true}>
                {
                    slides.map((item,index)=>
                    {
                        return(
                            <SwiperSlide key={index+'a1'}>
                                <Wrapper sx={{position:"relative",height:"520px",backgroundImage:`url(${item.image})`}}>
                                    <BoxText>
                                        <Typography sx={{fontBold:"300",fontSize:{md:"28px",sx:"28px",xs:"20px"},
                                        letterSpacing:"1px"}}>{item.title}</Typography>
                                        <Button>Discover More</Button>
                                    </BoxText>
                                    <OverLay/>
                                </Wrapper>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Box>
    )
}
