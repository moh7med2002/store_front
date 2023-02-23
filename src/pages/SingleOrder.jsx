import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Container,Button, Grid, Paper } from '@mui/material'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import OrderDetails from '../components/OrderDetails'
import OrderProducts from '../components/OrderProducts'

export default function SingleOrder() {
    const navigate = useNavigate()
    const {orderId} = useParams()
    const [order,setOrder] = useState(null)
    const [load,setLoad] = useState(true)
    const {token} = useSelector((state)=>state.userLogin)

    useEffect(()=>
    {
        async function getOrder()
        {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/user/order/${orderId}`,{
                    headers:{
                        "Authorization":token,
                    }
                })
                const data = await response.json()
                setOrder(data.order)
                setLoad(false)
            }
            catch(err)
            {
                console.log(err)
            }
        }
        getOrder()
    },[orderId])

    return (
        <Layout>
            <Container sx={{marginTop:"40px",marginBottom:"40px"}}>
                <Button variant='contained' color="Black" onClick={()=>navigate('/my-orders')} sx={{fontSize:"12px"}}>Back to orders</Button>
                {
                    !load?
                    <Paper sx={{padding:"30px 20px",marginTop:"30px"}}>
                        <OrderDetails order={order}/>
                        <Grid container spacing={3} sx={{marginTop:"25px"}}>
                            <Grid item xs={12} lg={12}>
                                <OrderProducts products={order.products}/>
                            </Grid>
                        </Grid>
                    </Paper>
                    :
                    <Loading/>
                }
            </Container>
        </Layout>
    )
}
