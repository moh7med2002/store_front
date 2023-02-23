import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Product from './Product';
import ProductSkelton from './skelton/ProductSkelton';

export default function NewArrival() {
    const [products, setProducts] = useState([]);
    const [isFetch , setIsFetch] = useState(false);

    useEffect(()=>{
        async function getDepartments () {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/user/last_products`)
                const data = await response.json()
                if(response.status!==200&&response.status!==201)
                {
                    throw new Error('failed occured')
                }
                setIsFetch(true);
                setProducts(data.products)
            }
            catch(err)
            {
                console.log(err);
            }
        };
        setTimeout(()=>{
            getDepartments();
        },500)
    },[]);
    return (
        <Container sx={{marginTop:"60px",marginBottom:"60px"}}>
            <Typography sx={{fontSize:{sm:"30px",xs:"26px"},fontWeight:"600",textAlign:"center",marginBottom:"20px"}}>New Arrival</Typography>
                <Swiper pagination={{clickable:true}} modules={[Pagination]} 
                className="arrivalSwiper"
                slidesPerView={2}
                spaceBetween={20}
                breakpoints={{
                        640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                        },
                        768: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                        },
                        1024: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                        },
                    }}>
                    {
                        isFetch
                        ?
                        products.map((item,index)=>
                        {
                            return(
                                <SwiperSlide key={index+'a2'}>
                                    <Product item={item}/>
                                </SwiperSlide>
                            )
                        })
                        :
                        <>
                        <SwiperSlide>
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductSkelton/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductSkelton/>
                        </SwiperSlide>
                        </>
                    }
                </Swiper>
        </Container>
    )
}
