// File: src/components/PartnerDashboard.js - v6
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    Box,
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Menu,
    MenuItem,
    Avatar
} from '@mui/material';
import { Assignment, Timeline, History, Person, Logout, Home, AccountCircle } from '@mui/icons-material';

const drawerWidth = 240;

function PartnerDashboard({ onChangeTheme }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null); // Stato per il menu a tendina

    // Gestione apertura/chiusura menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Cambia tema e chiude il menu
    const handleThemeChange = (themeKey) => {
        onChangeTheme(themeKey); // Passa la chiave del tema al componente genitore
        handleMenuClose(); // Chiude il menu
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/partner/login');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Partner Dashboard
                    </Typography>
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="account"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleThemeChange('zippee')}>Tema Chiaro</MenuItem>
                            <MenuItem onClick={() => handleThemeChange('dark')}>Tema Scuro</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button="true" onClick={() => navigate('/partner/dashboard')}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button="true" onClick={() => navigate('/partner/trip-entry')}>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary="Trip Entry Form" />
                        </ListItem>
                        <ListItem button="true" onClick={() => navigate('/partner/aggregated-data')}>
                            <ListItemIcon>
                                <Timeline />
                            </ListItemIcon>
                            <ListItemText primary="Aggregated Data" />
                        </ListItem>
                        <ListItem button="true" onClick={() => navigate('/partner/trip-history')}>
                            <ListItemIcon>
                                <History />
                            </ListItemIcon>
                            <ListItemText primary="Trip History" />
                        </ListItem>
                        <ListItem button="true" onClick={() => navigate('/partner/profile-management')}>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button="true" onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default PartnerDashboard;