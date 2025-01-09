// File: src/components/Header.js - v1
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Header({ onChangeTheme }) {
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

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Zippee
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
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;