import React, { useState } from 'react'
import {FormControl,Select, Grid, Typography,MenuItem,InputLabel, Button, Box} from '@mui/material'
import {useParams} from 'react-router-dom'
import Layout from '../components/Layout'
import { Container } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react'
import Loading from '../components/Loading'
import Product from '../components/Product'

export default function ShopDepartment() {
    const {id,title} = useParams()
    const [conditoions,setConditoions] = useState({color:"all",size:"all",category:"all"})
    function handleChange(e)
    {
        const {name,value} = e.target
        setConditoions(back=>
            {
                return {...back,[name]:value}
            })
    }

    const [products,setProducts] = useState([]);
    const [subProducts , setSubProducts] = useState([]);
    const [categories , setCategories] = useState([]);
    const [load,setLoad] = useState(true)
    useEffect(()=>
    {
        async function getProducts()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/product/department/${id}/products`)
                const data = await response.json()
                setProducts(data.allProducts)
                setSubProducts(data.allProducts);
                setCategories(data.categories);
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getProducts()
    },[id]);

    const handleSearch = () => {
        setLoad(true);
        setTimeout(()=>{
            setSubProducts(products.filter(p=>
                (p.colors.find(c=>c===conditoions.color)||conditoions.color==="all") &&
                (p.sizes.find(s=>s===conditoions.size)||conditoions.size==="all") &&
                (p.categoryId._id===conditoions.category||conditoions.category==="all")
            ));
            setLoad(false);
        },500)
    }

    return (
        <Layout>
            <Container sx={{marginY:"30px"}}>
                <Typography sx={{fontSize:"28px",fontWeight:"600",marginBottom:"24px"}}>{title}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={conditoions.category}
                                label="Category"
                                onChange={handleChange}
                                name="category"
                            >
                                <MenuItem value={"all"}>All</MenuItem>
                                {
                                    categories.map(cate=>{
                                        return <MenuItem value={cate?._id}>{cate?.title}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={conditoions.size}
                                label="Size"
                                onChange={handleChange}
                                name="size"
                            >
                                <MenuItem value={"all"}>All</MenuItem>
                                <MenuItem value={"xl"}>XL</MenuItem>
                                <MenuItem value={"l"}>L</MenuItem>
                                <MenuItem value={"m"}>M</MenuItem>
                                <MenuItem value={"s"}>S</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={conditoions.color}
                                label="Color"
                                onChange={handleChange}
                                name="color"
                            >
                                <MenuItem value={"all"}>All</MenuItem>
                                <MenuItem value={"red"}>Red</MenuItem>
                                <MenuItem value={"blue"}>Blue</MenuItem>
                                <MenuItem value={"green"}>Green</MenuItem>
                                <MenuItem value={"yellow"}>Yellow</MenuItem>
                                <MenuItem value={"black"}>Black</MenuItem>
                                <MenuItem value={"white"}>White</MenuItem>
                                <MenuItem value={"brown"}>Brown</MenuItem>
                                <MenuItem value={"gray"}>Gray</MenuItem>
                                <MenuItem value={"pink"}>Pink</MenuItem>
                                <MenuItem value={"orange"}>Orange</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Button onClick={handleSearch} variant="contained" fullWidth sx={{height:"100%"}}><SearchIcon/></Button>
                    </Grid>
                </Grid>
                {
                    !load?
                    <>
                    {
                    subProducts?.length>0
                    ?
                    <Grid container spacing={3} sx={{marginTop:"10px"}}>
                        {
                            subProducts.map((item,index)=>
                            {
                                return(
                                    <Grid item xs={6} sm={3} lg={2} key={index+"kq1"}>
                                        <Product item={item}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    :
                    <Typography>No Porducts Available</Typography>
                    }
                    </>
                    :
                    <Box sx={{marginTop:"30px"}}>
                        <Loading/>
                    </Box>
                }
            </Container>
        </Layout>
    )
}