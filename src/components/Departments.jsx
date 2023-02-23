import { Container, Typography,Grid } from '@mui/material'
import React, { useState , useEffect } from 'react'
import Department from './Department'
import Loading from './Loading';
import DepartmentSkelton from './skelton/DepartmentSkelton';

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [isFetch , setIsFetch] = useState(false);


    useEffect(()=>{
        async function getDepartments () {
            try{
                const response = await fetch(`${process.env.REACT_APP_API}api/user/department`)
                const data = await response.json()
                if(response.status!==200&&response.status!==201)
                {
                    throw new Error('failed occured')
                }
                setIsFetch(true);
                setDepartments(data.departments);
            }
            catch(err)
            {
                console.log(err);
            }
        };
        setTimeout(()=>{
            getDepartments();
        },500)
    },[]);
    return (
        <Container sx={{marginTop:"40px",marginBottom:"30px"}}>
            <Typography sx={{fontSize:{sm:"30px",xs:"26px"},fontWeight:"600",textAlign:"center",marginBottom:"40px"}}>Shop By Departments</Typography>
            {
                isFetch
                ?
                <Grid container spacing={5} justifyContent="center">
                    {
                        departments.map((item,index)=>
                        {
                            return(
                                <Grid key={index+'depvggc1'} md={3} xs={6} item>
                                    <Department item={item}/>
                                </Grid>
                                
                            )
                        })
                    }
                </Grid>
                :
                <Grid container spacing={5} justifyContent="center">
                    <Grid md={3} xs={6} item>
                        <DepartmentSkelton/>
                    </Grid>
                    <Grid md={3} xs={6} item>
                        <DepartmentSkelton/>
                    </Grid>
                    <Grid md={3} xs={6} item>
                        <DepartmentSkelton/>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}
