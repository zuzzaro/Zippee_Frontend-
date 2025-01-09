// zippee-frontend - File: src/components/PartnerDashboard.js - v5
import React from 'react';
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
    Button
} from '@mui/material';
import { Assignment, Timeline, History, Person, Logout, Home } from '@mui/icons-material';

const drawerWidth = 240;

function PartnerDashboard() {
    const navigate = useNavigate();

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
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
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