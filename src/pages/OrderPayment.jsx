import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useForm, Controller } from "react-hook-form";
import { Box  , styled ,  Typography , TextField, Paper, Button, Container} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {saveCard , clearShipping} from '../redux/shipping'
import { useNavigate } from 'react-router-dom';


const steps = [
  'Shipping',
  'Payment',
  'Status',
];


const Form = styled('form')({
  width:"500px",
  maxWidth:"100%",
  margin:"80px auto"
})

const ErrorText = styled(Typography)({
  color:"#d32f2f",
  marginTop:"8px"
})

export default function PaymentOrder() {
  const { control, handleSubmit  , formState: { errors }} = useForm({
    defaultValues: {
    card_number:"",
    card_expiry:"",
    card_cvc:"",
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {shipping} = useSelector(s=> s.shipping);
  const {token} = useSelector((state)=>state.userLogin)
  const [isLoad , setIsLoad] = useState(false); 

  const onSubmit = async(data) => {
    dispatch(saveCard({card:data}));
    setIsLoad(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_API}api/user/order/create`, {
          method:"PUT",
          headers:{
              "Content-Type":"application/json",
              "Authorization" : token
          },
          body:JSON.stringify({...shipping})
      })
      const data = await response.json();
      if(response.status!==200&&response.status!==201)
      {
          setIsLoad(false);
          throw new Error('failed occured')
      }
      dispatch(clearShipping());
      setIsLoad(false);
      navigate('/order/success');
  }
  catch(err)
  {
    setIsLoad(false);
      console.log(err);
  }
    
  };
  
  useEffect(()=>{
    window.scrollTo({
      top:0, behavior:"smooth"
    })
  });

  return (
    <Layout>
      <Container sx={{marginTop:"50px"}}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Paper sx={{padding:"20px 15px"}}>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="card_number"
                        control={control}
                        rules={{required:true}}
                        render={({ field }) => <TextField variant="standard" label="Card Number" {...field} fullWidth />}
                    />
                    <ErrorText>
                        {
                        errors.card_number?.type === "required" && "Card Number is required"
                        }
                    </ErrorText>
                </Box>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="card_expiry"
                        control={control}
                        rules={{required:true }}
                        render={({ field }) => <TextField variant="standard" label="Card Expiry" type={"date"} {...field} fullWidth/>}
                    />
                    <ErrorText>
                        {
                        errors.card_expiry?.type === "required" && "Card Expiry is required"
                        }
                    </ErrorText>
                </Box>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="card_cvc"
                        control={control}
                        rules={{required:true }}
                        render={({ field }) => <TextField variant="standard" label="Card CVC" type={"text"} {...field} fullWidth/>}
                    />
                    <ErrorText>
                        {
                        errors.card_cvc?.type === "required" && "Card CVC is required"
                        }
                    </ErrorText>
                </Box>
                {
                  isLoad
                  ?
                  <Button variant="contained"  sx={{width:"200px", marginTop:"20px" , opacity:"0.7"}}>Pay...</Button>
                  :
                  <Button variant="contained" type="submit"  sx={{width:"200px", marginTop:"20px"}}>Pay</Button>
                }
            </Paper>
        </Form>
      </Container>
    </Layout>
  );
}