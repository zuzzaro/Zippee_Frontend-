// File: src/layouts/DashboardLayout.js - v5
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
import { Logout, Group, PersonAdd, TravelExplore, AccountCircle } from '@mui/icons-material'; // Aggiungi l'icona per Eco Trip

const drawerWidth = 240;

function DashboardLayout({ onChangeTheme }) {
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
        navigate('/login');
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
                        Zippee Dashboard
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
                            <MenuItem onClick={() => handleThemeChange('zippee')}>Zippee Theme</MenuItem>
                            <MenuItem onClick={() => handleThemeChange('dark')}>Dark Theme</MenuItem>
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
                        <ListItem button="true" onClick={() => navigate('/dashboard/add-partner')}>
                            <ListItemIcon>
                                <PersonAdd />
                            </ListItemIcon>
                            <ListItemText primary="Add Partner" />
                        </ListItem>
                        <ListItem button="true" onClick={() => navigate('/dashboard/partners')}>
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="Partner List" />
                        </ListItem>
                        <ListItem button="true" onClick={() => navigate('/dashboard/eco-trip')}> {/* Nuova voce */}
                            <ListItemIcon>
                                <TravelExplore /> {/* Icona per Eco Trip */}
                            </ListItemIcon>
                            <ListItemText primary="Eco Trip" />
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

export default DashboardLayout;