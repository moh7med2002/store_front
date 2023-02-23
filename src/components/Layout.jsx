import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector  , useDispatch} from 'react-redux';
import { logoutUser } from '../redux/user';
import Footer from './Footer';


const drawerWidth = 240;
const navItems = [
    {title:'Home',url:"/"},{title:"favirote" , url:"/favirotes"},{title:"cart" , url:"/cart"} ,{title:'Orders',url:"/my-orders"}
];

function Layout(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {user} = useSelector((state)=>state.userLogin);
    const navItems = [
        {title:'Home',url:"/"}, user&&{title:"favirote" , url:"/favirotes"}, user&&{title:"cart" , url:"/cart"} ,user&&{title:'Orders',url:"/my-orders"}
    ];
    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
            Store
        </Typography>
        <Divider />
        <List>
            {navItems.map((item) => (
            <Link to={item.url}>
                <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item.title} />
                    </ListItemButton>
                </ListItem>
            </Link>
            ))}
            {
                user
                ?
                <ListItem  disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }} onClick={()=>dispatch(logoutUser())}>
                        <ListItemText primary={"logout"} />
                    </ListItemButton>
                </ListItem>
            :
            <>
            <Link to={'/login'}>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"login"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Link to={"/regsiter"}>
                <ListItem  disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"regsiter"} />
                    </ListItemButton>
                </ListItem>
            </Link>
            </>
            }
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{backgroundColor:"white",color:"black"}}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                Store
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                <Link to={item.url}>
                    <Button key={item} sx={{ color: 'black' }}>
                        {item.title}
                    </Button>
                </Link>
                ))}
                {
                    user
                    ?
                    <Button sx={{ color: 'black' }} onClick={()=>dispatch(logoutUser())}>
                        {"logout"}
                    </Button>
                    :
                    <>
                    <Link to={"/login"}>
                        <Button  sx={{ color: 'black' }}>
                            {"login"}
                        </Button>
                    </Link>
                    <Link to={"/register"}>
                        <Button  sx={{ color: 'black' }}>
                            {"register"}
                        </Button>
                    </Link>
                    </>
                }
            </Box>
            </Toolbar>
        </AppBar>
        <Box component="nav">
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
        </Box>
        <Box component="main">
            <Toolbar />
            <Box sx={{minHeight:"55vh"}}>
            {props.children}
            </Box>
            <Footer/>
        </Box>
        </Box>
    );
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Layout;