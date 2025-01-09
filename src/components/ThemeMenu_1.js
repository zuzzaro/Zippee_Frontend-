 File srccomponentsThemeMenu.js
import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, IconButton, Tooltip } from '@muimaterial';
import { Palette as PaletteIcon } from '@muiicons-material';  Icona del tema

const themes = [
    {
        name 'Eco Green',
        palette {
            primary { main '#4CAF50' },
            secondary { main '#8BC34A' },
            background { default '#F5F5F5', paper '#FFFFFF' },
        },
    },
    {
        name 'Ocean Blue',
        palette {
            primary { main '#2196F3' },
            secondary { main '#64B5F6' },
            background { default '#E3F2FD', paper '#FFFFFF' },
        },
    },
    {
        name 'Sunset Orange',
        palette {
            primary { main '#FF9800' },
            secondary { main '#FFB74D' },
            background { default '#FFF3E0', paper '#FFFFFF' },
        },
    },
];

function ThemeMenu({ onChangeTheme }) {
    const [anchorEl, setAnchorEl] = useState(null);  Stato per l'ancora del menu

    const handleOpenMenu = (event) = {
        setAnchorEl(event.currentTarget);  Apri il menu
    };

    const handleCloseMenu = () = {
        setAnchorEl(null);  Chiudi il menu
    };

    const handleThemeChange = (theme) = {
        onChangeTheme(theme);  Cambia il tema
        handleCloseMenu();  Chiudi il menu dopo la selezione
    };

    return (
        Box
            Tooltip title=Change theme
                IconButton onClick={handleOpenMenu} color=inherit
                    PaletteIcon  { Icona del tema }
                IconButton
            Tooltip
            Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            
                {themes.map((theme) = (
                    MenuItem
                        key={theme.name}
                        onClick={() = handleThemeChange(theme)}
                    
                        Box
                            sx={{
                                width 20,
                                height 20,
                                bgcolor theme.palette.primary.main,
                                borderRadius '50%',
                                mr 2,
                            }}
                        
                        Typography variant=body1{theme.name}Typography
                    MenuItem
                ))}
            Menu
        Box
    );
}

export default ThemeMenu;