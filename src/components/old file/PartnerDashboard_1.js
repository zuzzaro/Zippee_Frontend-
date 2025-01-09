// File: src/components/PartnerDashboard.js

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
} from '@mui/material';
import {  Assignment, Timeline, History, Person } from '@mui/icons-material'; // Icone Material-UI

const drawerWidth = 240;

function PartnerDashboard() {
    const navigate = useNavigate();

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
                    <Typography variant="h6" noWrap component="div">
                        Partner Dashboard
                    </Typography>
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
                        <ListItem button onClick={() => navigate('/partner/trip-entry')}>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary="Trip Entry Form" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('/partner/aggregated-data')}>
                            <ListItemIcon>
                                <Timeline />
                            </ListItemIcon>
                            <ListItemText primary="Aggregated Data" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('/partner/trip-history')}>
                            <ListItemIcon>
                                <History />
                            </ListItemIcon>
                            <ListItemText primary="Trip History" />
                        </ListItem>
                           <ListItem button onClick={() => navigate('/partner/profile-management')}>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary="Profile Management" />
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