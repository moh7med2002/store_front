import React, { useState } from 'react'
import { Box, styled, Typography , TextField, Paper, Container , Button} from '@mui/material'
import { useForm, Controller } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {useNavigate} from 'react-router-dom'




const RegisterWrapper = styled(Container)({
    height:"100vh",
    paddingTop:"50px",
})


const Form = styled('form')({
    width:"500px",
    maxWidth:"100%",
    margin:"20px auto"
});


const ErrorText = styled(Typography)({
    color:"#d32f2f",
    marginTop:"8px"
})

export default function Login() {
    const { control, handleSubmit  , formState: { errors }} = useForm({
        defaultValues: {
        email:"",
        password:"",
        name:""
    }
      });
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const [isLoad , setisLoad] = useState(false);
      const navigate = useNavigate(); 


    const onSubmit = async(data) => {
      closeSnackbar();
      setisLoad(true);
      try{
          const response = await fetch(`${process.env.REACT_APP_API}api/user/auth/register`,{
              method:"POST",
              headers:{
                  'Content-Type':"application/json"
              },
              body:JSON.stringify({...data})
          })
          const resData = await response.json();
          setisLoad(false);
          if(response.status!==200&response.status!==201)
          {
              enqueueSnackbar(resData.message , {variant:"error" , autoHideDuration:2000});
              throw new Error('failed occured')
          }
          enqueueSnackbar(resData.message , {variant:"success" , autoHideDuration:2000});
          navigate('/login');
      }
      catch(err)
      {
          setisLoad(false);
          // enqueueSnackbar("Register failed , please try again" , {variant:"error" , autoHideDuration:2000});
          console.log(err)
      }
    };

  return (
    <RegisterWrapper>
        <>
        <Typography variant='h4' sx={{textAlign:"center"}}>
            Register
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Paper sx={{padding:"20px 15px"}}>
                  <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{required:true , minLength:3}}
                        render={({ field }) => <TextField variant="standard" label="Name" type={"text"} {...field} fullWidth/>}
                    />
                    <ErrorText>
                        {
                        errors.name?.type === "minLength" ?"Name Should be more than 3 character" 
                        :errors.name?.type === "required" && "Name is required"
                        }
                    </ErrorText>
                </Box>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{required:true , pattern:{value:/^(.+)@(gmail)(.com)$/}}}
                        render={({ field }) => <TextField variant="standard" label="Email" {...field} fullWidth />}
                    />
                    <ErrorText>
                        {
                        errors.email?.type === "pattern" ?"Enter A valid E-mail (example@gmail.com)" 
                        :errors.email?.type === "required" && "Email is required"
                        }
                    </ErrorText>
                </Box>
                <Box sx={{marginBottom:"12px"}}>
                    <Controller
                        name="password"
                        control={control}
                        rules={{required:true , minLength:3}}
                        render={({ field }) => <TextField variant="standard" label="Password" type={"password"} {...field} fullWidth/>}
                    />
                    <ErrorText>
                        {
                        errors.password?.type === "minLength" ?"Password Should be more than 3 character" 
                        :errors.password?.type === "required" && "Password is required"
                        }
                    </ErrorText>
                </Box>
                {
                  isLoad
                  ?
                  <Button variant="contained" type="submit" sx={{width:"200px" , opacity:"0.7" , marginTop:"20px"}} >Register...</Button>
                  :
                  <Button variant="contained" type="submit"  sx={{width:"200px", marginTop:"20px"}}>Register</Button>
                }
                <Typography sx={{marginTop:"20px"}}>Have an account ? <Link style={{color:"#d32f2f"}} to={'/login'}>Login</Link></Typography>
            </Paper>
        </Form>
        </>
    </RegisterWrapper>
    )
}