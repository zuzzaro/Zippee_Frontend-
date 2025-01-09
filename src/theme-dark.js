// File: src/theme-dark.js
import { createTheme } from '@mui/material/styles';

const themeDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Colore primario per il tema scuro
        },
        secondary: {
            main: '#f48fb1', // Colore secondario per il tema scuro
        },
        background: {
            default: '#121212', // Colore di sfondo predefinito per il tema scuro
            paper: '#1e1e1e', // Colore di sfondo per i componenti "paper"
        },
        text: {
            primary: '#ffffff', // Colore del testo primario
            secondary: '#b3b3b3', // Colore del testo secondario
        },
    },
});

export default themeDark;