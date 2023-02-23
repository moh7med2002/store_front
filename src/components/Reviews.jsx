import React from 'react'
import {Grid,Typography,Rating,styled,Button,Box} from '@mui/material'
import { useState } from 'react'
import {useSelector} from 'react-redux';
import Review from './Review';
import { useSnackbar } from 'notistack';


const TextArea = styled("textarea")({
    width:"100%",
    borderRadius:"2px",
    ":focus":{
        outline:"none"
    },
    padding:"8px 8px",
    resize:"none",
    border:"none",
    backgroundColor:"#f8f9fb"
})

export default function Reviews({product}) {
    const [reviews,setReviews] = useState(product.reviews)
    const {user,token} = useSelector((state)=>state.userLogin)
    const userReview = product?.reviews.find(rev=>rev.userId._id.toString()===user?._id.toString());
    const [isReview,setIsReview] = useState(userReview?true:false)
    const [rating,setRating] = useState(userReview?.rating||0)
    const [comment,setComment] = useState(userReview?.comment || null)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    async function createReview()
    {
        if(!comment){
            enqueueSnackbar("Plese enter a comment" , {variant:"error" , autoHideDuration:2000});
            return;
        }
        try{
            setReviews(back=>[...back,{rating,userId:{name:user.name},comment,date:new Date(Date.now())}])
            setIsReview(true)
            const response = await fetch(`${process.env.REACT_APP_API}api/user/product/review/${product._id}`,{
                method:"PUT",
                headers:{
                    'Content-Type':"application/json",
                    "Authorization":token
                },
                body:JSON.stringify({rating,comment,date:new Date(Date.now())})
            })
            if(response.status!==200&&response.status!==201)
            {
                throw new Error('failed occured')
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Grid container spacing={3} sx={{marginTop:"20px"}}>
            <Grid item xs={12} sm={7} md={6}>
                <Typography sx={{fontSize:"16px",textTransform:"uppercase",fontWeight:"400",marginBottom:"20px"}}>Reviews</Typography>
                    {
                        reviews.length>0?
                        <Box sx={{height:"300px",overflow:"auto"}}>
                        {reviews.map((review,index)=>
                        {
                            return <Review key={index+"vf"} review={review}/>
                        })}
                        </Box>
                        :
                        <Typography sx={{backgroundColor:"#c1f1fd",borderRadius:"4px",padding:"16px 10px"}}>No Reviews</Typography>
                    }
            </Grid>
            <Grid item xs={12} sm={7} md={6}>
                <Typography sx={{fontSize:"16px",textTransform:"uppercase",fontWeight:"400",marginBottom:"20px"}}>Write a customer review</Typography>
                <form>
                    <Typography sx={{fontSize:"15px",fontWeight:"500",marginBottom:"4px"}}>Rating</Typography>
                    <Rating value={rating} onChange={(event, newValue) => {setRating(newValue);}} readOnly={isReview}/>
                    <Typography sx={{fontSize:"15px",fontWeight:"500",marginBottom:"4px",marginTop:"12px"}}>Comment</Typography>
                    <TextArea disabled={isReview} rows={5} value={comment} onChange={(e)=>setComment(e.target.value)}></TextArea>
                    {!isReview&&user&&<Button variant="contained" fullWidth sx={{marginTop:"4px"}} onClick={createReview}>Save</Button>}
                    {!user&&
                    <Typography sx={{backgroundColor:"#FEC868",borderRadius:"4px",padding:"12px 10px",marginTop:"10px"}}>
                        Please login to write a review
                    </Typography>}
                </form>
            </Grid>
        </Grid>
    )
}