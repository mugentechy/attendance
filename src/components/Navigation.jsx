import * as React from 'react';
import { Link } from 'react-router-dom';
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
import ListItemIcon from '@mui/material/ListItemIcon';
import {Menu, MenuItem } from '@mui/material';


const drawerWidth = 240;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
 const [showRegisterOptions, setShowRegisterOptions] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

     const handleRegisterClick = () => {
     setMobileOpen((prevState) => !prevState);
    setShowRegisterOptions(!showRegisterOptions);
  };


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography  component={Link}
            to="/"  variant="h6" sx={{ my: 2 }}>
        Schoolia
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/about" sx={{ textAlign: 'center' }}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contact" sx={{ textAlign: 'center' }}>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>


       <ListItem disablePadding>
          <ListItemButton onClick={handleRegisterClick}>
            <ListItemIcon>
          
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItemButton>
        </ListItem>


           {showRegisterOptions && (

                 
           
           <>
                <ListItem disablePadding component="a" href="/register">
                     <ListItemIcon>
         
            </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
                <ListItem disablePadding component="a" href="/login">
                     <ListItemIcon>
 
            </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>

             
          </>

          )}





        </List>



    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
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
 <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src="/icon.svg" // Replace with your actual logo path
            alt="Schoolia Logo"
            style={{ height: 40, marginRight: 8 }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              textDecoration: "none",
            
              
            }}
          >
            Schoolia
          </Typography>
        </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button component={Link} to="/" sx={{ color: '#fff' }}>Login</Button>
            <Button component={Link} to="/register" sx={{ color: '#fff' }}>Register</Button>
  
    
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
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
      </nav>
 
    </Box>
  );
}
