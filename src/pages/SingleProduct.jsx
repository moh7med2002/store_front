import {Typography,Container,Grid,styled, Box,Rating, TextField, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import React, { useEffect , useState } from 'react'
import Layout from '../components/Layout'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loading from '../components/Loading'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Reviews from '../components/Reviews';


const Image = styled('img')({
    width:"100%",
    height:"600px"
})

export default function SingleProduct() {
    const [isFetch , setIsFetch] = useState();
    const [product , setProduct]= useState({});
    const {productId} = useParams();
    const [isFavirote , setIsFavirote] = useState(false);
    const {user , token} = useSelector((state)=>state.userLogin)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [review , setReview] = useState(0);
    const [order , setOrder] = useState({
        qty:1,
        color:"",
        size:""
    });

    const handleChangeInput = (e) => {
        const {name , value} =  e.target;
        setOrder(pre=>{
            return {...pre , [name]:value}
        });
    };

    useEffect(()=>{
        async function getProduct () {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/user/products/${productId}`)
                const data = await response.json()
                if(response.status!==200&&response.status!==201)
                {
                    throw new Error('failed occured')
                }
                setIsFetch(true);
                setProduct(data.product);
                if(user){
                    if(data.product.favourites.find(p => p.userId === user._id)){
                        setIsFavirote(true)
                    }
                }
                setOrder({qty:0 , color:data.product.colors[0] , size:data.product.sizes[0]})
                setReview(data.product?.reviews?.reduce((acc,value)=>{
                    return acc+ +value.rating
                },0) / data.product.reviews.length);
            }
            catch(err)
            {
                console.log(err);
            }
        };
        setTimeout(()=>{
            getProduct();
        },200)
    },[productId , user]);


    async function addToFaviroteHandler (){
        if(!user){
            enqueueSnackbar("Plese login first" , {variant:"error" , autoHideDuration:2000});
            return;
        }
        try{
            setIsFavirote(prev => !prev);
            const response = await fetch(`${process.env.REACT_APP_API}api/user/product/favirote/${productId}`, {
                method:"PUT",
                headers:{
                    "Authorization" : token
                },
            })
            const data = await response.json();
            if(response.status!==200&&response.status!==201)
            {
                throw new Error('failed occured')
            }
            setIsFetch(true);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    async function addToCartHandler (){
        if(!user){
            enqueueSnackbar("Plese login first" , {variant:"error" , autoHideDuration:2000});
            return;
        }
        try{
            const response = await fetch(`${process.env.REACT_APP_API}api/user/product/cart/${productId}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : token
                },
                body:JSON.stringify({...order})
            })
            const data = await response.json();
            if(response.status!==200&&response.status!==201)
            {
                throw new Error('failed occured')
            }
            enqueueSnackbar(data.mesaage , {variant:"success" , autoHideDuration:2000});
        }
        catch(err)
        {
            console.log(err);
        }
    }


    return (
        <Layout>
            <Container sx={{marginTop:"30px",marginBottom:"30px"}}>
                {
                isFetch
                ?
                <>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={5} md={6}>
                        <Image
                        src={`${process.env.REACT_APP_API}images/${product.image}`}/>
                    </Grid>
                    <Grid item xs={12} lg={7} md={6}>
                        <Typography sx={{fontSize:"24px",fontWeight:"600",marginBottom:"10px"}}>{product.title}</Typography>
                        <Box sx={{display:"flex",alignItems:"center",columnGap:"6px"}}>
                            <Rating name="half-rating-read" defaultValue={review}
                            precision={0.5} readOnly sx={{fontSize:"20px"}}/>
                            <Typography sx={{color:"#747579",fontSize:"14px"}}>{product.reviews.length} reviews</Typography>
                        </Box>
                        <Typography color="error" sx={{fontSize:"20px",margin:"10px 0px"}}>{product.price}$</Typography>
                        <Typography sx={{fontSize:"16px",margin:"10px 0px 6px",fontWeight:"400"}}>Colors</Typography>
                        <Box sx={{ width: 300,maxWidth:"100%",marginBottom:"25px"}}>
                            <FormControl fullWidth>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={order.color}
                                onChange={(e)=>handleChangeInput(e)}
                                name="color"
                                >
                                {product.colors.map((item,index)=>
                                {
                                    return <MenuItem key={index+'p3'} value={item}>{item}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                        </Box>
                        <Typography sx={{fontSize:"16px",margin:"10px 0px 6px",fontWeight:"400"}}>Size</Typography>
                        <Box sx={{ width: 300,maxWidth:"100%",marginBottom:"25px"}}>
                            <FormControl fullWidth>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={order.size}
                                onChange={(e)=>handleChangeInput(e)}
                                name="size"
                                >
                                {product.sizes.map((item,index)=>
                                {
                                    return <MenuItem key={index+'p3nedbe'} value={item}>{item}</MenuItem>
                                })}
                                </Select>
                            </FormControl>
                        </Box>
                        <Typography sx={{fontSize:"16px",margin:"10px 0px 6px",fontWeight:"400"}}>Quantity</Typography>
                        <TextField type="number" sx={{width:"100px"}} inputProps={{min:1}} name="qty" value={order.qty} onChange={e=>handleChangeInput(e)}/>
                        <Box sx={{display:"flex",columnGap:"10px",marginTop:"30px",alignItems:"center"}}>
                            <Button variant="contained" sx={{borderRadius:"50px",width:"300px",height:"40px",maxWidth:"100%"}}
                            onClick={addToCartHandler}>Add to Cart</Button>
                            <Button color="error" variant="outlined" onClick={addToFaviroteHandler}
                            sx={{borderRadius:"50%",width:"50px",height:"50px",minWidth:"0"}}>
                                {isFavirote ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Reviews product={product}/>
                </>
                :
                <Loading/>
                } 
            </Container>
        </Layout>
    )
}
