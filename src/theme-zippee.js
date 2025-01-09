// File: src/theme-zippee.js
import { createTheme } from '@mui/material/styles';

const themeZippee = createTheme({
    palette: {
        primary: {
            main: '#4CAF50', // Verde principale
        },
        secondary: {
            main: '#8BC34A', // Verde secondario
        },
        background: {
            default: '#F5F5F5', // Grigio chiaro per lo sfondo
            paper: '#FFFFFF', // Bianco per le carte (Paper)
        },
    },
});

export default themeZippee;