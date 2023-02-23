import React from 'react'
import {styled, Container, Table,TableBody,TableCell,TableHead,TableRow, Button,Box,Typography} from '@mui/material'
import Layout from '../components/Layout'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import CloseIcon from '@mui/icons-material/Close';

const Image = styled("img")({
    width:"55px",
    height:"65px"
})

export default function FavouriteProducts() {

    const [favourites,setFavourites] = useState(null)
    const [load,setLoad] = useState(false)
    const {user,token} = useSelector((state)=>state.userLogin)
    useEffect(()=>
    {
        async function getUserFavouritesProducts()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/user/${user._id}`,{
                    headers:{
                        "Authorization":token
                    }
                })
                const data = await response.json()
                setFavourites(data.user.favourites)
                setLoad(true)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getUserFavouritesProducts()
    },[])

    async function handleFavouriteChange(id)
    {
        try{
            filterProducts(id)
            const response = await fetch(`${process.env.REACT_APP_API}api/user/product/favirote/${id}`,{
                method:"PUT",
                headers:{
                    "Authorization":token
                }
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

    function filterProducts(id)
    {
        setFavourites(back=>back.filter(product=>product.productId._id.toString()!==id.toString()))
    }

    return (
        <Layout>
            <Container sx={{marginY:"40px",minHeight:"300px"}}>
                {
                load?
                <>
                    <Typography sx={{fontSize:"28px",fontWeight:"400",marginBottom:"15px"}}>Your Favourite</Typography>
                    <Box sx={{overflow:"auto"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Image</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell align="left">Price</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favourites.length>0?favourites.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">
                                        <Image src={`${process.env.REACT_APP_API}images/${row.productId.image}`}/>
                                    </TableCell>
                                    <TableCell align="left">{row.productId.title}</TableCell>
                                    <TableCell align="left">{row.productId.price}</TableCell>
                                    <TableCell align="left">
                                        <Button color="error" onClick={()=>handleFavouriteChange(row.productId._id)}><CloseIcon/></Button>
                                    </TableCell>
                                </TableRow>
                                ))
                                :
                                <TableRow><TableCell colSpan={4}>No Products In Your Favourite</TableCell></TableRow>}
                            </TableBody>
                        </Table>     
                    </Box>                   
                </>
                :
                <Loading/>
                }
            </Container>
        </Layout>
    )
}