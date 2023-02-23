import { Toolbar , styled, Grid, Typography} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Stack } from '@mui/system';

const FooterBox = styled('footer')({
    paddingTop:"60px",
    paddingBottom:"40px",
    backgroundColor:"#24292d",
    color:"white"
});

const LinkReact = styled(Link)({
    display:"block",
    margin:"10px 0",
})

export default function Footer() {
  return (
    <FooterBox>
        <Toolbar>
            <Grid container spacing={2}>
                <Grid item md={3} sm={6} xs={12}>
                    <Typography variant='h4' sx={{}}>Store</Typography>
                    <Typography sx={{marginTop:"10px"}}>We help you find everything you need easily</Typography>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <Typography variant='h5'>Quick Links</Typography>
                    <LinkReact to="/">Home</LinkReact>
                    <LinkReact to="/">Shop</LinkReact>
                    <LinkReact to="/">Cart</LinkReact>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <Typography variant='h5'>Social Media</Typography>
                    <Stack direction={"row"} sx={{margin:"10px 0"}} alignItems="center" spacing={1}>
                        <FacebookRoundedIcon sx={{fontSize:"22px"}}/>
                        <Typography>Facebook.com</Typography>
                    </Stack>
                    <Stack direction={"row"} sx={{margin:"10px 0"}} alignItems="center" spacing={1}>
                        <TwitterIcon sx={{fontSize:"22px"}}/>
                        <Typography>Twitter.com</Typography>
                    </Stack>
                    <Stack direction={"row"} sx={{margin:"10px 0"}} alignItems="center" spacing={1}>
                        <InstagramIcon sx={{fontSize:"22px"}}/>
                        <Typography>Instagram.com</Typography>
                    </Stack>
                    <Stack direction={"row"} sx={{margin:"10px 0"}} alignItems="center" spacing={1}>
                        <LinkedInIcon sx={{fontSize:"22px"}}/>
                        <Typography>LinkedIn.com</Typography>
                    </Stack>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <Typography variant='h5'>Contact Us</Typography>
                    <Stack direction={"row"} sx={{margin:"10px 0"}} alignItems="center" spacing={1}>
                        <CallIcon sx={{fontSize:"22px"}}/>
                        <Typography>123456789</Typography>
                    </Stack>
                    <Stack direction={"row"} sx={{margin:"10px 0"}} alignItems="center" spacing={1}>
                        <LocationOnIcon sx={{fontSize:"22px"}}/>
                        <Typography>XYZ, abc</Typography>
                    </Stack>
                    <Stack direction={"row"} sx={{margin:"10px 0"}} alignItems="center" spacing={1}>
                        <MailIcon sx={{fontSize:"22px"}}/>
                        <Typography>xyz@gmail.com</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Toolbar>
    </FooterBox>
  )
}
