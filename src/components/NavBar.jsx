import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography, Badge } from '@mui/material';
import { Menu as MenuIcon, Mail as MailIcon, Notifications as NotificationsIcon, AccountCircle } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import Nav from '../components/Nav';
import { Toaster } from 'react-hot-toast';

const drawerWidth = 240;

function NavBar({ window, user }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  const menuId = 'primary-search-account-menu';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginRight: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
          <div>
            <Toolbar>
              <Typography variant="h6" noWrap component="div" style={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon sx={{ fontSize: 24, marginRight: 0.5 }} />
                <span>{user?.name || 'Schoolia'}</span>
              </Typography>
            </Toolbar>
            <Divider />
            <Nav />
            <Divider />
          </div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <div>
            <Toolbar>
              <Typography variant="h6" noWrap component="div" style={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon sx={{ fontSize: 24, marginRight: 0.5 }} />
                <span>{user?.name || 'Attendance'}</span>
              </Typography>
            </Toolbar>
            <Divider />
            <Nav />
            <Divider />
          </div>
        </Drawer>
      </Box>
      <Toaster />
    </Box>
  );
}

NavBar.propTypes = {
  window: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default NavBar;
