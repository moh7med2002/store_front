import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useForm, Controller } from "react-hook-form";
import { Box  , styled ,  Typography , TextField, Paper, Button, Container} from '@mui/material';
import { useDispatch } from 'react-redux';
import {saveShipping} from '../redux/shipping'
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

export default function ShippingOrder() {
  const { control, handleSubmit  , formState: { errors }} = useForm({
    defaultValues: {
    address:"",
    city:"",
    country:"",
    phone:"",
    postal_code:""
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async(data) => {
    dispatch(saveShipping({shipping:data}));
    navigate('/order/payment')
  };

  useEffect(()=>{
    window.scrollTo({
      top:0, behavior:"smooth"
    })
  });

  return (
    <Layout>
      <Container sx={{marginTop:"50px"}}>
        <Stepper activeStep={0} alternativeLabel>
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
                        name="address"
                        control={control}
                        rules={{required:true}}
                        render={({ field }) => <TextField variant="standard" label="Address" {...field} fullWidth />}
                    />
                    <ErrorText>
                        {
                        errors.address?.type === "required" && "Address is required"
                        }
                    </ErrorText>
                </Box>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="city"
                        control={control}
                        rules={{required:true }}
                        render={({ field }) => <TextField variant="standard" label="City" type={"text"} {...field} fullWidth/>}
                    />
                    <ErrorText>
                        {
                        errors.city?.type === "required" && "City is required"
                        }
                    </ErrorText>
                </Box>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="country"
                        control={control}
                        rules={{required:true }}
                        render={({ field }) => <TextField variant="standard" label="Country" type={"text"} {...field} fullWidth/>}
                    />
                    <ErrorText>
                        {
                        errors.country?.type === "required" && "Country is required"
                        }
                    </ErrorText>
                </Box>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="phone"
                        control={control}
                        rules={{required:true }}
                        render={({ field }) => <TextField variant="standard" label="Phone" type={"text"} {...field} fullWidth/>}
                    />
                    <ErrorText>
                        {
                        errors.phone?.type === "required" && "Phone is required"
                        }
                    </ErrorText>
                </Box>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="postal_code"
                        control={control}
                        rules={{required:true }}
                        render={({ field }) => <TextField variant="standard" label="Postal Code" type={"text"} {...field} fullWidth/>}
                    />
                    <ErrorText>
                        {
                        errors.postal_code?.type === "required" && "Pstal Code is required"
                        }
                    </ErrorText>
                </Box>
                <Button variant="contained" type="submit"  sx={{width:"200px", marginTop:"20px"}}>Shipping</Button>
            </Paper>
        </Form>
      </Container>
    </Layout>
  );
}