import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box  , Button, Container, Paper, Stack ,  Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';


const steps = [
  'Shipping',
  'Payment',
  'Status',
];


export default function SuccessOrder() {
  useEffect(()=>{
    window.scrollTo({
      top:0, behavior:"smooth"
    })
  });
  return (
    <Layout>
      <Container sx={{marginTop:"50px"  }}>
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Paper sx={{width:"fit-content" , marginX:"auto" , padding:"40px 20px" , marginTop:"50px"}}>
            <Box sx={{textAlign:"center"}}>
                <Typography variant='h5' sx={{fontWeight:"600"}}>Your order has been received</Typography>
                <Stack 
                justifyContent={"center"} alignItems="center"
                sx={{width:"60px" , height:"60px" , marginX:"auto" , marginTop:"20px",borderRadius:"50%", backgroundColor:green[500]}}>
                    <CheckIcon sx={{fontSize:"40px", color:"white"}}/>
                </Stack>
                <Typography variant='h6' marginY={"15px"} sx={{fontWeight:"400"}}>Thank you for your purchase!</Typography>
                <Link to={'/'}>
                <Button variant='contained'>Continue Shopping</Button>
                </Link>
            </Box>
        </Paper>
      </Container>
    </Layout>
  );
}