// File: src/components/ThemeMenu.js
import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material'; // Icona del tema

const themes = [
    {
        name: 'Zippee Light',
        key: 'zippee',
        primaryColor: '#4CAF50', // Colore primario del tema chiaro
    },
    {
        name: 'Dark Mode',
        key: 'dark',
        primaryColor: '#212121', // Colore primario del tema scuro
    },
];

function ThemeMenu({ onChangeTheme }) {
    const [anchorEl, setAnchorEl] = useState(null); // Stato per l'ancora del menu

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget); // Apri il menu
    };

    const handleCloseMenu = () => {
        setAnchorEl(null); // Chiudi il menu
    };

    const handleThemeChange = (themeKey) => {
        onChangeTheme(themeKey); // Cambia il tema
        handleCloseMenu(); // Chiudi il menu dopo la selezione
    };

    return (
        <Box>
            <Tooltip title="Change theme">
                <IconButton onClick={handleOpenMenu} color="inherit">
                    <PaletteIcon /> {/* Icona del tema */}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {themes.map((theme) => (
                    <MenuItem
                        key={theme.key}
                        onClick={() => handleThemeChange(theme.key)}
                    >
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                bgcolor: theme.primaryColor,
                                borderRadius: '50%',
                                mr: 2,
                            }}
                        />
                        <Typography variant="body1">{theme.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default ThemeMenu;