import React from 'react'
import Layout from '../components/Layout'
import {Container, Table,TableBody,TableCell,TableHead,TableRow, Button,Box, Typography} from '@mui/material'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import { useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loading from '../components/Loading'
import {useNavigate} from 'react-router-dom'
import moment from 'moment';

export default function MyOrders() {
    const navigate = useNavigate()
    const [orders,setOrders] = useState([])
    const [load,setLoad] = useState(true)
    const {user,token} = useSelector((state)=>state.userLogin)

    useEffect(()=>
    {
        async function getOrders()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/user/my_orders/all`,{
                    headers:{
                        "Authorization":token
                    }
                })
                const data = await response.json()
                console.log(data);
                setOrders(data.orders)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getOrders()
    },[])

    return (
        <Layout>
            <Container sx={{marginTop:"30px",minHeight:"50vh"}}>
                {
                !load?
                <>
                <Typography sx={{fontSize:"28px",fontWeight:"400",marginBottom:"15px"}}>Orders</Typography>
                <Box sx={{overflow:"auto"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Order Id</TableCell>
                                    <TableCell align="left">Number Of Items</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.length>0?orders.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{row._id}</TableCell>
                                    <TableCell align="left">{row.products.length}</TableCell>
                                    <TableCell align="left">${row.totalPrice}</TableCell>
                                    <TableCell align="left">{moment(row.createdAt).format("MMM Do yyyy")}</TableCell>
                                    <TableCell align="left" sx={{color:row.isDelivey?"#0cbc87":"#d6293e"}}>{row.isDelivey?"Delivered":"Not Delivered"}</TableCell>
                                    <TableCell align="left">
                                        <Button color="warning" variant="contained" sx={{minWidth:"10px"}} onClick={()=>navigate(`${row._id}`)}><VisibilityIcon/></Button>
                                    </TableCell>
                                </TableRow>
                                ))
                                :
                                <TableRow><TableCell colSpan={6}>You do not have any order</TableCell></TableRow>}
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